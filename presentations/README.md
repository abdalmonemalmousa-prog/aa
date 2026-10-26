# Rashid Alkaitoob Advocates — Asset Protection & Wills presentations

Five decks, each delivered in Arabic (`_AR`) and English (`_EN`), 16:9, black and gold identity.

| # | File | Audience | Slides |
|---|------|----------|--------|
| 1 | `01_Internal_Strategy_Staff_Management` | Internal: management and staff | 25 |
| 2 | `02_Brokerage_Owners_Executive_Brief` | Owners of real estate brokerages (short, comprehensive) | 11 |
| 3 | `03_Brokerage_Partner_Program_Detailed` | Brokerage partner teams (detailed guide, scripts, FAQ, SLA) | 28 |
| 4 | `04_Client_Consultation_Walkthrough` | Client referred by a broker, ends with the needs assessment | 16 |
| 5 | `05_Seminar_Webinar_Protect_Foreign_Investors` | Seminars and webinars | 18 |

Source: the "Wills — preliminary comprehensive strategy" PDF, rk-advocates.com, and the Roles & KPIs deck in this repo.

## Regenerating
```
cd presentations/generator && npm install pptxgenjs sharp react react-dom react-icons
NODE_PATH=$PWD/node_modules OUT=../ node build.js
```
Edit text in `deck1.js` … `deck5.js` (every string is an `{ar, en}` pair); layouts and theme live in `lib.js`.
