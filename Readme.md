<div align="center">
  <a href="https://netframe.ee">
    <img src="https://netframe.ee/netframe.png" alt="Netframe Banner" width="100%" />
  </a>

  <p align="center">
    <strong>Automated competition data scraper for app.aerutaja.ee synced to Supabase.</strong>
  </p>

  <p align="center">
    <a href="https://app.aerutaja.ee"><img src="https://img.shields.io/badge/Source-app.aerutaja.ee-0284c7?style=flat-square" alt="Source" /></a>
    <a href="https://github.com/Andreas154/app-aerutaja-competition-scraper/releases/latest"><img src="https://img.shields.io/badge/Release-v1.0.0-3b82f6?style=flat-square" alt="Release" /></a>
    <a href="https://supabase.com"><img src="https://img.shields.io/badge/Database-Supabase-3ecf8e?style=flat-square&logo=supabase&logoColor=white" alt="Supabase" /></a>
    <img src="https://img.shields.io/badge/Node.js-ESM-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/Puppeteer-v25-00d8a2?style=flat-square&logo=puppeteer&logoColor=white" alt="Puppeteer" />
    <a href="./LICENSE"><img src="https://img.shields.io/badge/License-MIT-gray?style=flat-square" alt="License" /></a>
  </p>
</div>

---

### What is this?

Automated crawler and parser that extracts live canoeing and rowing competition schedules, dates, and locations from **[app.aerutaja.ee](https://app.aerutaja.ee)** and syncs them continuously into a public Supabase database.

- **Real-time syncing** — Extracts title, dates, venues, and race distances with change detection.
- **Dual execution** — Supports GitHub Actions automation as well as high-frequency local runner loops.
- **Open data access** — Clean public Supabase endpoints queryable via REST or official SDKs.

---

### Local Runner Setup

> [!WARNING]
> **Execution Latency Advisory:** GitHub Actions scheduled workflows (`cron`) are subject to shared queue delays and frequently run only every 2 to 4 hours instead of every 30 minutes. If you require real-time synchronization, use this pre-packaged local runner.

**Prerequisite:** Make sure **[Node.js](https://nodejs.org)** (version 18 or higher) is installed on your computer.

All dependencies (`node_modules`) are already bundled inside the release archive, so no installation command is needed.

#### Windows Setup

1. **Download:** Get [`release.zip`](https://github.com/Andreas154/app-aerutaja-competition-scraper/releases/latest) from the Releases section.
2. **Extract:** Right-click `release.zip` and select **Extract All...** to unpack the files into a folder.
3. **Configure:** Open the extracted folder, find `.env`, right-click it, and open with **Notepad**. Enter your Supabase credentials:
   ```env
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```
4. **Run:** In the folder address bar at the top of File Explorer, type `cmd` and press Enter. In the command prompt that opens, type:
   ```cmd
   npm start
   ```

#### macOS Setup

1. **Download:** Get [`release.zip`](https://github.com/Andreas154/app-aerutaja-competition-scraper/releases/latest) from the Releases section.
2. **Extract:** Double-click `release.zip` in Finder to unpack it.
3. **Configure:** Open the extracted folder. If `.env` is hidden, press `Cmd + Shift + .` (period) to reveal hidden files. Open `.env` with TextEdit (or your preferred editor) and enter your credentials:
   ```env
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```
4. **Run:** Open **Terminal**, type `cd ` (with a space), drag the folder into Terminal, press Enter, and run:
   ```bash
   npm start
   ```

#### Linux Setup

1. **Download and Extract:**
   ```bash
   wget https://github.com/Andreas154/app-aerutaja-competition-scraper/releases/latest/download/release.zip
   unzip release.zip -d aerutaja-scraper
   cd aerutaja-scraper
   ```
2. **Configure:** Open `.env` in your editor of choice:
   ```bash
   nano .env
   ```
   Add your credentials and save:
   ```env
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```
3. **Run:** Start the scraper daemon:
   ```bash
   npm start
   ```

---

### Customizing Sync Frequency (Timing)

By default, the local runner scrapes and syncs every 3 minutes (180,000 milliseconds). To adjust how often it checks for updates:

1. Open `index.js` in a text editor (Notepad, VS Code, TextEdit, or nano).
2. Scroll to the bottom and locate the `startLoop` function:
   ```javascript
   // Change the timing value inside setTimeout (in milliseconds):
   await new Promise(resolve => setTimeout(resolve, 180000));
   ```
3. Change the number `180000` to your preferred interval:
   - `60000` — Sync every 1 minute
   - `180000` — Sync every 3 minutes (default)
   - `300000` — Sync every 5 minutes
   - `600000` — Sync every 10 minutes
4. Save the file and restart the runner (`Ctrl + C` to stop, then `npm start`).

---

### Public API Access (Read-Only)

Query competition records directly without backend credentials:

- **Endpoint:** `https://udyekbfbyvbqvqjfqrbw.supabase.co`
- **Table:** `competitions`
- **Publishable Key:** `sb_publishable_AIIGLxDzqVOjOXQCWQc69w_53-dTHIw`

```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://udyekbfbyvbqvqjfqrbw.supabase.co',
  'sb_publishable_AIIGLxDzqVOjOXQCWQc69w_53-dTHIw'
)

const { data } = await supabase.from('competitions').select('*')
console.log(data)
```

```bash
curl 'https://udyekbfbyvbqvqjfqrbw.supabase.co/rest/v1/competitions?select=*' \
  -H "apikey: sb_publishable_AIIGLxDzqVOjOXQCWQc69w_53-dTHIw" \
  -H "Authorization: Bearer sb_publishable_AIIGLxDzqVOjOXQCWQc69w_53-dTHIw"
```

<details>
<summary><strong>Data schema preview</strong></summary>

```json
{
  "title": "44. Emajõe maraton",
  "date": "12 September 2026",
  "location": "Emajõgi: Jõesuu/Reku/Kärevere",
  "distance": "17000m, 37000m, 56000m",
  "created_at": "2026-08-30T15:30:45.042Z"
}
```

</details>

---

<div align="center">
  <sub>Powered by <a href="https://netframe.ee">Netframe</a> · Licensed under MIT</sub>
</div>
