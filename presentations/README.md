# Rashid Alkaitoob Advocates — Asset Protection & Wills presentations

Five decks, each delivered in Arabic (`_AR`) and English (`_EN`), 16:9, black and gold identity, plus a statistics deck (`06`) in Arabic, English and Russian with its own luxury palette (midnight navy, ivory, copper) that is independent of the website colours.

| # | File | Audience | Slides |
|---|------|----------|--------|
| 1 | `01_Internal_Strategy_Staff_Management` | Internal: management and staff | 25 |
| 2 | `02_Brokerage_Owners_Executive_Brief` | Owners of real estate brokerages (short, comprehensive) | 11 |
| 3 | `03_Brokerage_Partner_Program_Detailed` | Brokerage partner teams (detailed guide, scripts, FAQ, SLA) | 28 |
| 4 | `04_Client_Consultation_Walkthrough` | Client referred by a broker, ends with the needs assessment | 16 |
| 5 | `05_Seminar_Webinar_Protect_Foreign_Investors` | Seminars and webinars | 18 |
| 6 | `06_UAE_Wills_Inheritance_Statistics` (`_AR`, `_EN`, `_RU`) | Large and international companies: documented UAE statistics 2000–2026 on wills, estate settlement and the impact on businesses, with a sources slide and an explicit data-limits slide | 26 |

Source: the "Wills — preliminary comprehensive strategy" PDF, rk-advocates.com, and the Roles & KPIs deck in this repo.

## Regenerating
```
cd presentations/generator && npm install pptxgenjs sharp react react-dom react-icons
NODE_PATH=$PWD/node_modules OUT=../ node build.js
```
Edit text in `deck1.js` … `deck5.js` (every string is an `{ar, en}` pair); layouts and theme live in `lib.js`.

The statistics deck uses `lib2.js` (Midnight Copper theme, Russian support, native charts, hero / figures / sources layouts) and `deck6.js` (every string is an `{ar, en, ru}` triple):
```
NODE_PATH=$PWD/node_modules OUT=../ node build6.js
```
Figures marked with an asterisk are derived from officially announced growth rates; the sources slide lists every reference. No official count of people who died without a will exists for the UAE, and the Dubai Courts non-Muslim wills register is unpublished, so the deck says so instead of inventing a number.
