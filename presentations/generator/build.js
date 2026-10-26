const path = require("path"); const fs = require("fs");
const { buildDeck } = require("./lib");
const decks = ["./deck1", "./deck2", "./deck3", "./deck4", "./deck5"].map((p) => require(p));
const OUT = process.env.OUT || path.join(__dirname, "out");
fs.mkdirSync(OUT, { recursive: true });
(async () => {
  const only = process.argv[2];
  for (const d of decks) {
    if (only && !d.file.startsWith(only)) continue;
    for (const lang of ["ar", "en"]) {
      const f = path.join(OUT, `${d.file}_${lang.toUpperCase()}.pptx`);
      await buildDeck({ lang, fileName: f, title: d.title, slides: d.slides });
      console.log("built", f, d.slides.length, "slides");
    }
  }
})().catch((e) => { console.error(e); process.exit(1); });
