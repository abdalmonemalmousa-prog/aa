const path = require("path"); const fs = require("fs");
const { buildDeck } = require("./lib2");
const d = require("./deck6");
const OUT = process.env.OUT || path.join(__dirname, "out6");
fs.mkdirSync(OUT, { recursive: true });
(async () => {
  for (const lang of ["ar", "en", "ru"]) {
    const f = path.join(OUT, `${d.file}_${lang.toUpperCase()}.pptx`);
    await buildDeck({ lang, fileName: f, title: d.title, slides: d.slides });
    console.log("built", f, d.slides.length);
  }
})().catch((e) => { console.error(e); process.exit(1); });
