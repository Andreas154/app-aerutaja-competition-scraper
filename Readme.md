![Netframe](http://netframe.ee/netframe.png)

# 🚣 Aerutaja.ee Competition Scraper

Automated scraper that extracts rowing competition data from app.aerutaja.ee and syncs it to a Supabase database. Runs automatically every 30 minutes via GitHub Actions.

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
