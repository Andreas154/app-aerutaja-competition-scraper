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

### ⚡ Quick Start: Local Standalone Runner

For real-time 3-minute polling without waiting for GitHub Actions platform schedule delays, use the pre-packaged standalone release (zero `npm install` required):

1. Download **[`release.zip`](https://github.com/Andreas154/app-aerutaja-competition-scraper/releases/latest)** from the Releases section.
2. Extract the archive and add your Supabase credentials to `.env`:
   ```env
   SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```
3. Launch the continuous runner loop:
   ```bash
   npm start
   ```

---

### 🔓 Public API Access (Read-Only)

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
