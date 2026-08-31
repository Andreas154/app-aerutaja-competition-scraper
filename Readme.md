![Netframe](http://netframe.ee/netframe.png)

# 🚣 Aerutaja.ee Competition Scraper

Automated scraper that extracts rowing competition data from app.aerutaja.ee and syncs it to a Supabase database. 

> 💡 **Recommendation:** For real-time updates, it is highly recommended to run the local release script on your machine. While a GitHub Actions workflow is included to run every 30 minutes, GitHub Actions cron schedules are subject to platform delays and often run only every 2–4 hours.

---

## 🚀 Quick Start (Local Release Runner)

The standalone local release comes pre-packaged with all `node_modules` included and is optimized for local execution with a built-in 3-minute scraping loop.

1. Download the latest `release.zip` from the [Releases](https://github.com/Andreas154/app-aerutaja-competition-scraper/releases) section.
2. Extract the archive.
3. Modify the `.env` file in the extracted root directory:
   ```env
   SUPABASE_URL=your_database_url
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

## 🔓 Public API Access (Read-Only)

* **URL:** `https://udyekbfbyvbqvqjfqrbw.supabase.co`
* **Publishable key:** `sb_publishable_AIIGLxDzqVOjOXQCWQc69w_53-dTHIw`
* **Table:** `competitions`

### JavaScript / Node.js

```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://udyekbfbyvbqvqjfqrbw.supabase.co',
  'sb_publishable_AIIGLxDzqVOjOXQCWQc69w_53-dTHIw'
)

const { data, error } = await supabase.from('competitions').select('*')
console.log(data)
```
cURL
```
curl 'https://udyekbfbyvbqvqjfqrbw.supabase.co/rest/v1/competitions?select=' \
  -H "apikey: sb_publishable_AIIGLxDzqVOjOXQCWQc69w_53-dTHIw4" \
  -H "Authorization: Bearer sb_publishable_AIIGLxDzqVOjOXQCWQc69w_53-dTHIw"
```
  🛠️ Data Structure
  ```
{
  "title": "44. Emajõe maraton",
  "date": "12 September 2026",
  "location": "Emajõgi: Jõesuu/Reku/Kärevere",
  "distance": "17000m, 37000m, 56000m",
  "created_at": "2026-08-30T15:30:45.042Z"
}
```
💻 Local Setup:

Check the release page

📄 License:
This project is licensed under the MIT License - see the LICENSE file for details.
