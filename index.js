import puppeteer from 'puppeteer';
import { createClient } from '@supabase/supabase-js';
import WebSocket from 'ws';
import 'dotenv/config';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Ошибка: Переменные SUPABASE_URL и SUPABASE_SERVICE_ROLE_KEY не найдены.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  realtime: { transport: WebSocket }
});

async function scrapeAndSync() {
  let browser;
  try {
    console.log('Запуск Puppeteer...');
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    console.log('Загрузка https://app.aerutaja.ee/tulemused ...');
    await page.goto('https://app.aerutaja.ee/tulemused', {
      waitUntil: 'networkidle2',
      timeout: 60000
    });

    // Ожидание появления карточек
    await page.waitForSelector('.competition-item', { timeout: 15000 });

    console.log('Сбор данных...');

    const competitions = await page.evaluate(() => {
      const items = [];
      const monthSections = document.querySelectorAll('.month-section');

      monthSections.forEach(section => {
        const monthHeader = section.querySelector('.month-header')?.innerText?.trim() || '';
        const cards = section.querySelectorAll('.competition-item');

        cards.forEach(card => {
          const title = card.querySelector('.competition-name')?.innerText?.trim() || '';
          const day = card.querySelector('.date-day')?.innerText?.trim() || '';
          const fullDate = monthHeader ? `${day} ${monthHeader}` : day;

          // Извлечение локации и дистанций
          const metaText = card.querySelector('.competition-meta')?.innerText?.trim() || '';
          const metaItems = Array.from(card.querySelectorAll('.meta-item')).map(el => el.innerText.trim());

          const location = metaItems[0] || 'Эстония';

          // Фильтрация только значения метров/километров для поля distance
          const distanceMatch = metaText.match(/\d+\s*(?:m|km)/gi);
          const distance = distanceMatch ? Array.from(new Set(distanceMatch)).join(', ') : 'Не указано';

          if (title) {
            items.push({
              title,
              date: fullDate,
              location,
              distance,
              created_at: new Date().toISOString()
            });
          }
        });
      });

      return items;
    });

    await browser.close();

    console.log(`Успешно парсено соревнований: ${competitions.length}`);

    if (competitions.length === 0) {
      console.log('Данные не найдены.');
      return;
    }

    console.log('Пример парсинга записи:');
    console.log(competitions[0]);

    console.log('Очистка таблицы Supabase...');
    const { error: deleteError } = await supabase.from('competitions').delete().neq('id', 0);
    if (deleteError) throw deleteError;

    console.log('Запись данных в Supabase...');
    const { error: insertError } = await supabase.from('competitions').insert(competitions);
    if (insertError) throw insertError;

    console.log('Готово! База данных успешно обновлена.');
  } catch (err) {
    if (browser) await browser.close();
    console.error('Ошибка:', err.message);
    process.exit(1);
  }
}

scrapeAndSync();
