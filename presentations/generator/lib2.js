// Shared deck builder for Rashid Alkaitoob Advocates — bilingual (AR/EN) luxury style
const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const Icons = require("react-icons/fa6");
const { applyTheme } = require("/root/.claude/skills/synced/61e41b57-2e10-4e8a-97a9-7872f1c0b7f3_8538b56f-b4ec-4940-83c9-9cb59ad3e511/pptx/scripts/apply_theme.js");

const DEFAULT_THEME = {
  name: "Midnight Copper",
  headFontFace: "Cambria",
  bodyFontFace: "Calibri",
  colors: {
    dk1: "0E2238", lt1: "FFFFFF", dk2: "1F3A52", lt2: "F4F1EB",
    accent1: "B5723B", accent2: "D9B38C", accent3: "6E7B88",
    accent4: "8C5527", accent5: "E6E1D8", accent6: "5B7A8C",
    hlink: "B5723B", folHlink: "8C5527",
  },
};
let THEME = DEFAULT_THEME; let HEX = THEME.colors;
const W = 10, H = 5.625;

// ---------- icons ----------
const iconCache = {};
async function iconPng(name, color) {
  const key = name + color;
  if (iconCache[key]) return iconCache[key];
  const Cmp = Icons[name];
  if (!Cmp) throw new Error("No icon " + name);
  const svg = ReactDOMServer.renderToStaticMarkup(React.createElement(Cmp, { color: "#" + color, size: 256 }));
  const buf = await sharp(Buffer.from(svg)).resize(256, 256, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  iconCache[key] = "image/png;base64," + buf.toString("base64");
  return iconCache[key];
}

// ---------- language helpers ----------
function mk(lang) {
  const rtl = lang === "ar";
  const t = (o) => (typeof o === "string" ? o : (o[lang] ?? o.en));
  const al = rtl ? "right" : "left";       // text alignment
  const alOpp = rtl ? "left" : "right";
  // mirror an x coordinate for a box of width w
  const mx = (x, w) => (rtl ? W - x - w : x);
  const txt = (extra = {}) => ({ isTextBox: true, align: al, rtlMode: rtl, lang: rtl ? "ar-AE" : (lang === "ru" ? "ru-RU" : "en-US"), margin: 0, ...extra });
  return { rtl, t, al, alOpp, mx, txt, lang };
}

// ---------- deck ----------
async function buildDeck({ lang, fileName, title, subtitle, slides, theme, author = "Rashid Alkaitoob Advocates & Legal Consultants" }) {
  THEME = theme || DEFAULT_THEME; HEX = THEME.colors;
  const L = mk(lang);
  const { t, al, alOpp, mx, txt, rtl } = L;
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
  pres.author = author; pres.company = "Rashid Alkaitoob Advocates &amp; Legal Consultants";
  pres.title = t(title); pres.lang = rtl ? "ar-AE" : (lang === "ru" ? "ru-RU" : "en-US"); pres.rtlMode = rtl;
  const C = pres.SchemeColor;

  const footerText = rtl ? "راشد الكيتوب للمحاماة والاستشارات القانونية" : (lang === "ru" ? "Rashid Alkaitoob Advocates & Legal Consultants · Дубай" : "Rashid Alkaitoob Advocates & Legal Consultants");
  const LOGO_LIGHT = path.join(__dirname, "logo_light.png"), LOGO_DARK = path.join(__dirname, "logo_dark.png");
  const LOGO_AR = 568 / 93; // official logo aspect ratio
  const logo = (dark, x, y, h) => ({ image: { path: dark ? LOGO_DARK : LOGO_LIGHT, x, y, w: h * LOGO_AR, h } });
  const mono = (dark) => [ logo(dark, mx(0.4, 0.3 * LOGO_AR), 5.12, 0.3) ];
  pres.defineSlideMaster({
    title: "DARK", background: { color: HEX.dk1 },
    objects: mono(true),
    slideNumber: { x: mx(9.0, 0.6), y: 5.06, w: 0.6, h: 0.42, fontSize: 9, color: HEX.accent2, align: alOpp, valign: "middle" },
  });
  pres.defineSlideMaster({
    title: "LIGHT", background: { color: HEX.lt1 },
    objects: [
      ...mono(false),
      { placeholder: { options: { name: "title", type: "title", x: 0.5, y: 0.46, w: 9.0, h: 0.8, fontSize: 26, bold: true, color: HEX.dk1, align: al, valign: "top", margin: 0, rtlMode: rtl }, text: "" } },
    ],
    slideNumber: { x: mx(9.0, 0.6), y: 5.06, w: 0.6, h: 0.42, fontSize: 9, color: HEX.accent3, align: alOpp, valign: "middle" },
  });
  pres.defineSlideMaster({ title: "PLAIN_DARK", background: { color: HEX.dk1 }, objects: [] });

  // ----- helpers bound to this pres -----
  const titleOn = (s, text) => { const str = t(text); const lim = lang === "ru" ? 36 : (rtl ? 46 : 46); const fs = str.length > lim ? 21 : 26; s.addText(str, txt({ x: mx(0.5, 9), y: 0.44, w: 9, h: 0.82, fontFace: "Cambria", fontSize: fs, bold: true, color: C.text1, valign: "top" })); };
  const kicker = (s, text, opts = {}) => s.addText(t(text).toUpperCase ? t(text) : t(text), {
    ...txt({ x: mx(0.5, 9), y: 0.16, w: 9, h: 0.26, fontSize: 10, color: C.accent1, charSpacing: rtl ? 0 : 3, bold: true }), ...opts,
  });
  const notes = (s, n) => { if (n) s.addNotes(t(n)); };

  const addIcon = async (s, name, x, y, size, color = HEX.accent1, circle = null) => {
    if (circle) {
      s.addShape(pres.ShapeType.ellipse, { x: x - (circle.d - size) / 2, y: y - (circle.d - size) / 2, w: circle.d, h: circle.d, fill: { color: circle.fill }, line: circle.line ? { color: circle.line, width: 0.75 } : { color: circle.fill, width: 0 } });
    }
    s.addImage({ data: await iconPng(name, color), x, y, w: size, h: size, objectName: "icon " + name });
  };

  // ======== slide type renderers ========
  const R = {};

  // Cover: dark, big title, gold monogram
  R.cover = async (s, d) => {
    s.addShape(pres.ShapeType.rect, { x: 0.5, y: 0.5, w: 9, h: 4.625, line: { color: HEX.accent1, width: 0.75 }, fill: { type: "none" } });
    s.addImage({ path: LOGO_DARK, x: mx(0.95, 0.72 * LOGO_AR), y: 0.95, w: 0.72 * LOGO_AR, h: 0.72 });
    s.addText(t(d.title), txt({ x: mx(0.95, 8.1), y: 2.15, w: 8.1, h: 1.5, fontFace: "Cambria", fontSize: d.titleSize || 34, bold: true, color: C.background1, valign: "middle" }));
    if (d.subtitle) s.addText(t(d.subtitle), txt({ x: mx(0.95, 8.1), y: 3.7, w: 8.1, h: 0.6, fontSize: 15, color: C.accent2, valign: "top" }));
    if (d.meta) s.addText(t(d.meta), txt({ x: mx(0.95, 8.1), y: 4.4, w: 8.1, h: 0.4, fontSize: 10, color: C.accent3, valign: "middle" }));
    notes(s, d.notes);
  };

  // Section divider: dark, number + title
  R.section = async (s, d) => {
    s.addText(d.num || "", { x: mx(0.5, 2.0), y: 1.6, w: 2.0, h: 1.6, fontFace: "Cambria", fontSize: 72, color: C.accent1, align: al, valign: "middle", margin: 0, isTextBox: true });
    const st = t(d.title); const sfs = st.length > 40 ? 24 : 30;
    s.addText(st, txt({ x: mx(0.5, 8.5), y: 3.0, w: 8.5, h: 0.95, fontFace: "Cambria", fontSize: sfs, bold: true, color: C.background1, valign: "bottom" }));
    if (d.subtitle) s.addText(t(d.subtitle), txt({ x: mx(0.5, 8.5), y: 4.02, w: 8.5, h: 0.55, fontSize: 14, color: C.accent2, valign: "top" }));
    notes(s, d.notes);
  };

  // Icon rows: title + list of {icon, head, body}; optional side statement
  R.rows = async (s, d) => {
    titleOn(s, d.title); if (d.kicker) kicker(s, d.kicker);
    const items = d.items; const n = items.length;
    const top = 1.3, avail = 3.6, rowH = Math.min(0.95, avail / n);
    const hasSide = !!d.side; const listW = hasSide ? 5.6 : 9.0;
    for (let i = 0; i < n; i++) {
      const it = items[i]; const y = top + i * rowH;
      const ix = mx(0.5, 0.5);
      await addIcon(s, it.icon, ix + 0.1, y + 0.1, 0.3, HEX.accent1, { d: 0.5, fill: HEX.lt2 });
      const tx = mx(1.2, listW - 0.7);
      s.addText([
        { text: t(it.head), options: { bold: true, fontSize: 13, color: C.text1, breakLine: true } },
        { text: t(it.body), options: { fontSize: (lang === "ru" && n >= 5 && hasSide) ? 9.5 : 11, color: C.accent3 } },
      ], txt({ x: tx, y: y - 0.02, w: listW - 0.7, h: rowH - 0.08, valign: "top", paraSpaceAfter: 2 }));
    }
    if (hasSide) {
      const sx = mx(6.5, 3.0);
      s.addShape(pres.ShapeType.rect, { x: sx, y: 1.3, w: 3.0, h: 3.55, fill: { color: HEX.dk1 }, line: { color: HEX.dk1, width: 0 } });
      s.addShape(pres.ShapeType.rect, { x: sx + 0.12, y: 1.42, w: 2.76, h: 3.31, fill: { type: "none" }, line: { color: HEX.accent1, width: 0.75 } });
      s.addText(t(d.side.head), txt({ x: sx + 0.35, y: 1.65, w: 2.3, h: 0.8, fontFace: "Cambria", fontSize: 16, bold: true, color: C.accent1, valign: "top" }));
      s.addText(t(d.side.body), txt({ x: sx + 0.35, y: 2.5, w: 2.3, h: 2.1, fontSize: 11.5, color: C.background2, valign: "top" }));
    }
    notes(s, d.notes);
  };

  // Cards grid: title + items {icon, head, body}, 2-4 columns, 1-2 rows
  R.cards = async (s, d) => {
    titleOn(s, d.title); if (d.kicker) kicker(s, d.kicker);
    const items = d.items; const n = items.length;
    const cols = d.cols || (n <= 3 ? n : n === 4 ? 4 : 3);
    const rows = Math.ceil(n / cols);
    const gap = 0.25, top = 1.3, availH = 3.55;
    const cw = (9.0 - gap * (cols - 1)) / cols, ch = (availH - gap * (rows - 1)) / rows;
    for (let i = 0; i < n; i++) {
      const it = items[i]; const c = i % cols, r = Math.floor(i / cols);
      const x0 = 0.5 + c * (cw + gap), y = top + r * (ch + gap);
      const x = mx(x0, cw);
      s.addShape(pres.ShapeType.rect, { x, y, w: cw, h: ch, fill: { color: HEX.lt2 }, line: { color: HEX.lt2, width: 0 } });
      const pad = 0.22;
      let ty = y + pad;
      if (it.icon) { await addIcon(s, it.icon, rtl ? x + cw - pad - 0.34 : x + pad, y + pad, 0.34, HEX.accent1); ty += 0.48; }
      if (it.num) { s.addText(String(it.num), txt({ x: x + pad, y: y + pad - 0.05, w: cw - 2 * pad, h: 0.5, fontFace: "Cambria", fontSize: 26, bold: true, color: C.accent1 })); ty += 0.5; }
      s.addText([
        { text: t(it.head), options: { bold: true, fontSize: rows > 1 ? 12.5 : 14, color: C.text1, breakLine: true } },
        { text: t(it.body), options: { fontSize: rows > 1 ? 10.5 : 11.5, color: C.accent3 } },
      ], txt({ x: x + pad, y: ty, w: cw - 2 * pad, h: y + ch - ty - pad + 0.05, valign: "top", paraSpaceAfter: 3 }));
    }
    notes(s, d.notes);
  };

  // Big stats: dark slide with 3-4 numbers
  R.stats = async (s, d) => {
    if (d.title) s.addText(t(d.title), txt({ x: mx(0.5, 9), y: 0.45, w: 9, h: 0.7, fontFace: "Cambria", fontSize: 26, bold: true, color: C.background1, valign: "middle" }));
    const n = d.items.length; const gap = 0.25; const cw = (9 - gap * (n - 1)) / n;
    for (let i = 0; i < n; i++) {
      const it = d.items[i]; const x = mx(0.5 + i * (cw + gap), cw);
      s.addShape(pres.ShapeType.rect, { x, y: 1.5, w: cw, h: 3.2, fill: { type: "none" }, line: { color: HEX.accent1, width: 0.75 } });
      s.addText(t(it.value), { x: x + 0.2, y: 1.75, w: cw - 0.4, h: 1.2, fontFace: "Cambria", fontSize: it.small ? 30 : 44, bold: true, color: C.accent1, align: al, valign: "middle", margin: 0, isTextBox: true, rtlMode: rtl });
      s.addText([
        { text: t(it.label), options: { bold: true, fontSize: 13, color: C.background1, breakLine: true } },
        { text: t(it.body || ""), options: { fontSize: 10.5, color: C.accent2 } },
      ], txt({ x: x + 0.2, y: 3.0, w: cw - 0.4, h: 1.55, valign: "top", paraSpaceAfter: 3 }));
    }
    if (d.foot) s.addText(t(d.foot), txt({ x: mx(0.5, 9), y: 4.75, w: 9, h: 0.3, fontSize: 9, color: C.accent3, italic: true }));
    notes(s, d.notes);
  };

  // Process steps: numbered horizontal flow
  R.steps = async (s, d) => {
    titleOn(s, d.title); if (d.kicker) kicker(s, d.kicker);
    const n = d.items.length; const gap = 0.18; const cw = (9 - gap * (n - 1)) / n;
    const y0 = 1.45;
    // connecting line
    s.addShape(pres.ShapeType.line, { x: 0.5 + 0.3, y: y0 + 0.3, w: 9 - 0.6, h: 0, line: { color: HEX.accent2, width: 0.75 } });
    for (let i = 0; i < n; i++) {
      const it = d.items[i]; const x = mx(0.5 + i * (cw + gap), cw);
      const cx = rtl ? x + cw - 0.6 : x;
      s.addShape(pres.ShapeType.ellipse, { x: cx, y: y0, w: 0.6, h: 0.6, fill: { color: HEX.dk1 }, line: { color: HEX.accent1, width: 1 } });
      s.addText(String(i + 1), { x: cx, y: y0, w: 0.6, h: 0.6, fontFace: "Cambria", fontSize: 16, bold: true, color: C.accent1, align: "center", valign: "middle", margin: 0, isTextBox: true });
      s.addText(t(it.head), txt({ x, y: y0 + 0.8, w: cw, h: 0.6, bold: true, fontSize: 13, color: C.text1, valign: "top" }));
      s.addText(t(it.body), txt({ x, y: y0 + 1.4, w: cw, h: 2.0, fontSize: 10.5, color: C.accent3, valign: "top" }));
      if (it.tag) s.addText(t(it.tag), txt({ x, y: 4.45, w: cw, h: 0.3, fontSize: 9.5, color: C.accent1, bold: true }));
    }
    notes(s, d.notes);
  };

  // Two column: statement left (dark panel) + bullets right, or image-less split
  R.split = async (s, d) => {
    titleOn(s, d.title); if (d.kicker) kicker(s, d.kicker);
    const px = mx(0.5, 3.6);
    s.addShape(pres.ShapeType.rect, { x: px, y: 1.3, w: 3.6, h: 3.55, fill: { color: HEX.dk1 }, line: { color: HEX.dk1, width: 0 } });
    if (d.icon) await addIcon(s, d.icon, rtl ? px + 3.6 - 0.35 - 0.5 : px + 0.35, 1.65, 0.5, HEX.accent1);
    const ph = t(d.panel.head); const pfs = ph.length > 40 ? 15 : 18; const plines = Math.ceil(ph.length / (pfs > 15 ? 17 : 21)); const phh = Math.max(0.6, plines * (pfs > 15 ? 0.33 : 0.28) + 0.12);
    s.addText(ph, txt({ x: px + 0.35, y: 2.3, w: 2.9, h: phh, fontFace: "Cambria", fontSize: pfs, bold: true, color: C.accent1, valign: "top" }));
    s.addText(t(d.panel.body), txt({ x: px + 0.35, y: 2.3 + phh + 0.05, w: 2.9, h: 4.75 - (2.3 + phh + 0.05), fontSize: 11, color: C.background2, valign: "top" }));
    const bx = mx(4.4, 5.1);
    const runs = [];
    d.bullets.forEach((b, i) => {
      const last = i === d.bullets.length - 1;
      if (typeof b === "object" && b.head) {
        runs.push({ text: t(b.head), options: { bold: true, fontSize: 13, color: C.text1, bullet: { indent: 14 }, breakLine: true, paraSpaceBefore: i ? 6 : 0 } });
        runs.push({ text: t(b.body), options: { fontSize: 11, color: C.accent3, breakLine: !last, indentLevel: 0, paraSpaceAfter: 2 } });
      } else {
        runs.push({ text: t(b), options: { fontSize: 12.5, color: C.text1, bullet: { indent: 14 }, breakLine: !last, paraSpaceAfter: 8 } });
      }
    });
    s.addText(runs, txt({ x: bx, y: 1.3, w: 5.1, h: 3.55, valign: "top" }));
    notes(s, d.notes);
  };

  // Table
  R.table = async (s, d) => {
    titleOn(s, d.title); if (d.kicker) kicker(s, d.kicker);
    const head = d.head.map((h) => ({ text: t(h), options: { bold: true, color: HEX.accent2, fill: { color: HEX.dk1 }, fontSize: 11, align: al, valign: "middle" } }));
    const body = d.rows.map((r, ri) => r.map((c, ci) => ({ text: t(c), options: { fontSize: 10.5, color: ci === 0 ? HEX.dk1 : HEX.dk2, bold: ci === 0, fill: { color: ri % 2 ? HEX.lt1 : HEX.lt2 }, align: al, valign: "middle" } })));
    let rows = [head, ...body];
    if (rtl) rows = rows.map((r) => [...r].reverse());
    let colW = d.colW || Array(d.head.length).fill(9 / d.head.length);
    if (rtl) colW = [...colW].reverse();
    s.addTable(rows, { x: 0.5, y: 1.3, w: 9, colW, border: { type: "solid", color: HEX.accent5, pt: 0.5 }, margin: [0.05, 0.1, 0.05, 0.1], rowH: d.rowH || 0.42, fontFace: "+mn-lt", rtlMode: rtl, autoPage: false });
    if (d.foot) s.addText(t(d.foot), txt({ x: mx(0.5, 9), y: 4.65, w: 9, h: 0.35, fontSize: 9.5, color: C.accent3, italic: true }));
    notes(s, d.notes);
  };

  // Quote / statement: dark
  R.quote = async (s, d) => {
    s.addShape(pres.ShapeType.rect, { x: 0.5, y: 0.5, w: 9, h: 4.4, line: { color: HEX.accent1, width: 0.75 }, fill: { type: "none" } });
    s.addText("“", { x: mx(0.9, 1), y: 0.7, w: 1, h: 1.1, fontFace: "Cambria", fontSize: 72, color: C.accent1, align: al, valign: "top", margin: 0, isTextBox: true });
    s.addText(t(d.text), txt({ x: mx(1.0, 8), y: 1.6, w: 8, h: 2.2, fontFace: "Cambria", fontSize: d.size || 22, color: C.background1, valign: "middle", italic: true }));
    if (d.who) s.addText(t(d.who), txt({ x: mx(1.0, 8), y: 3.9, w: 8, h: 0.5, fontSize: 12, color: C.accent2 }));
    notes(s, d.notes);
  };

  // Agenda: numbered list dark panel + items
  R.agenda = async (s, d) => {
    titleOn(s, d.title); if (d.kicker) kicker(s, d.kicker);
    const n = d.items.length; const cols = n > 5 ? 2 : 1; const per = Math.ceil(n / cols);
    const colW = cols === 2 ? 4.4 : 9; const rowH = Math.min(0.68, 3.5 / per);
    for (let i = 0; i < n; i++) {
      const c = Math.floor(i / per), r = i % per;
      const x0 = 0.5 + c * (colW + 0.2); const y = 1.35 + r * rowH;
      const nx = mx(x0, 0.5);
      s.addText(String(i + 1).padStart(2, "0"), { x: nx, y, w: 0.5, h: rowH - 0.1, fontFace: "Cambria", fontSize: 18, bold: true, color: C.accent1, align: al, valign: "middle", margin: 0, isTextBox: true });
      s.addText(t(d.items[i]), txt({ x: mx(x0 + 0.6, colW - 0.6), y, w: colW - 0.6, h: rowH - 0.1, fontSize: 13.5, color: C.text1, valign: "middle" }));
      s.addShape(pres.ShapeType.line, { x: x0, y: y + rowH - 0.06, w: colW, h: 0, line: { color: HEX.accent5, width: 0.5 } });
    }
    notes(s, d.notes);
  };

  // Comparison: 2-3 columns with header + bullet lists
  R.compare = async (s, d) => {
    titleOn(s, d.title); if (d.kicker) kicker(s, d.kicker);
    const n = d.cols.length; const gap = 0.25; const cw = (9 - gap * (n - 1)) / n;
    for (let i = 0; i < n; i++) {
      const c = d.cols[i]; const x = mx(0.5 + i * (cw + gap), cw);
      const hi = !!c.highlight;
      s.addShape(pres.ShapeType.rect, { x, y: 1.3, w: cw, h: 0.6, fill: { color: hi ? HEX.accent1 : HEX.dk1 }, line: { color: hi ? HEX.accent1 : HEX.dk1, width: 0 } });
      s.addText(t(c.head), txt({ x: x + 0.15, y: 1.3, w: cw - 0.3, h: 0.6, fontSize: 13, bold: true, color: hi ? C.text1 : C.accent2, valign: "middle" }));
      s.addShape(pres.ShapeType.rect, { x, y: 1.9, w: cw, h: 2.95, fill: { color: HEX.lt2 }, line: { color: HEX.lt2, width: 0 } });
      const runs = c.items.map((b, j) => ({ text: t(b), options: { fontSize: 11, color: C.text2, bullet: { indent: 12 }, breakLine: j < c.items.length - 1, paraSpaceAfter: 5 } }));
      s.addText(runs, txt({ x: x + 0.15, y: 2.05, w: cw - 0.3, h: 2.7, valign: "top" }));
    }
    notes(s, d.notes);
  };

  // Closing / contact: dark
  R.contact = async (s, d) => {
    s.addShape(pres.ShapeType.rect, { x: 0.5, y: 0.5, w: 9, h: 4.625, line: { color: HEX.accent1, width: 0.75 }, fill: { type: "none" } });
    s.addText(t(d.title), txt({ x: mx(0.95, 8.1), y: 0.85, w: 8.1, h: 0.9, fontFace: "Cambria", fontSize: 28, bold: true, color: C.background1, valign: "middle" }));
    if (d.subtitle) s.addText(t(d.subtitle), txt({ x: mx(0.95, 8.1), y: 1.7, w: 8.1, h: 0.5, fontSize: 13, color: C.accent2 }));
    const lines = [
      ["FaLocationDot", { ar: "شارع الشيخ زايد، برج سعيد 2، مكتب 501، دبي، الإمارات العربية المتحدة", en: "Sheikh Zayed Road, Saeed Tower 2, Office 501, Dubai, UAE", ru: "Шейх Зайед Роуд, Saeed Tower 2, офис 501, Дубай, ОАЭ" }],
      ["FaPhone", { ar: "+971 4 359 5552  |  جوال وواتساب: +971 52 107 4972", en: "+971 4 359 5552  |  Mobile & WhatsApp: +971 52 107 4972", ru: "+971 4 359 5552  |  Моб. и WhatsApp: +971 52 107 4972" }],
      ["FaEnvelope", { ar: "ward.shueibi@rk-advocates.com  |  rk-advocates.com", en: "ward.shueibi@rk-advocates.com  |  rk-advocates.com" }],
      ["FaClock", { ar: "الاثنين – الجمعة، 8:30 – 17:30  |  العربية · English · 中文 · Русский", en: "Monday – Friday, 8:30 – 17:30  |  Arabic · English · Chinese · Russian", ru: "Пн – Пт, 8:30 – 17:30  |  Арабский · Английский · Китайский · Русский" }],
    ];
    for (let i = 0; i < lines.length; i++) {
      const y = 2.45 + i * 0.55;
      await addIcon(s, lines[i][0], mx(0.95, 0.3), y + 0.05, 0.3, HEX.accent1);
      s.addText(t(lines[i][1]), txt({ x: mx(1.45, 7.6), y, w: 7.6, h: 0.4, fontSize: 12, color: C.background2, valign: "middle" }));
    }
    notes(s, d.notes);
  };

  // Timeline (vertical phases) : items {when, head, body}
  R.timeline = async (s, d) => {
    titleOn(s, d.title); if (d.kicker) kicker(s, d.kicker);
    const n = d.items.length; const gap = 0.2; const cw = (9 - gap * (n - 1)) / n;
    for (let i = 0; i < n; i++) {
      const it = d.items[i]; const x = mx(0.5 + i * (cw + gap), cw);
      s.addShape(pres.ShapeType.rect, { x, y: 1.3, w: cw, h: 0.55, fill: { color: HEX.dk1 }, line: { color: HEX.dk1, width: 0 } });
      s.addText(t(it.when), txt({ x: x + 0.15, y: 1.3, w: cw - 0.3, h: 0.55, fontSize: 12, bold: true, color: C.accent1, valign: "middle" }));
      s.addShape(pres.ShapeType.rect, { x, y: 1.85, w: cw, h: 3.0, fill: { color: HEX.lt2 }, line: { color: HEX.lt2, width: 0 } });
      s.addText(t(it.head), txt({ x: x + 0.15, y: 2.0, w: cw - 0.3, h: 0.5, fontSize: 13, bold: true, color: C.text1, valign: "top" }));
      const runs = it.body.map((b, j) => ({ text: t(b), options: { fontSize: 10.5, color: C.accent3, bullet: { indent: 12 }, breakLine: j < it.body.length - 1, paraSpaceAfter: 4 } }));
      s.addText(runs, txt({ x: x + 0.15, y: 2.5, w: cw - 0.3, h: 2.25, valign: "top" }));
    }
    notes(s, d.notes);
  };

  // Decision / needs assessment: question list -> outcome mapping
  R.decision = async (s, d) => {
    titleOn(s, d.title); if (d.kicker) kicker(s, d.kicker);
    const n = d.items.length; const rowH = Math.min(0.62, 3.0 / n);
    const qw = 4.9, aw = 3.85;
    s.addText(t(d.qHead), txt({ x: mx(0.5, qw), y: 1.25, w: qw, h: 0.3, fontSize: 10, bold: true, color: C.accent1 }));
    s.addText(t(d.aHead), txt({ x: mx(5.65, aw), y: 1.25, w: aw, h: 0.3, fontSize: 10, bold: true, color: C.accent1 }));
    for (let i = 0; i < n; i++) {
      const it = d.items[i]; const y = 1.6 + i * rowH;
      s.addShape(pres.ShapeType.rect, { x: 0.5, y, w: 9, h: rowH - 0.08, fill: { color: i % 2 ? HEX.lt1 : HEX.lt2 }, line: { color: HEX.lt2, width: 0 } });
      await addIcon(s, "FaCircleQuestion", mx(0.62, 0.26), y + (rowH - 0.08) / 2 - 0.13, 0.26, HEX.accent1);
      s.addText(t(it.q), txt({ x: mx(1.0, qw - 0.5), y, w: qw - 0.5, h: rowH - 0.08, fontSize: 11.5, color: C.text1, valign: "middle" }));
      s.addText(t(it.a), txt({ x: mx(5.65, aw), y, w: aw, h: rowH - 0.08, fontSize: 11, bold: true, color: C.accent4, valign: "middle" }));
    }
    if (d.foot) s.addText(t(d.foot), txt({ x: mx(0.5, 9), y: 4.72, w: 9, h: 0.3, fontSize: 9.5, color: C.accent3, italic: true }));
    notes(s, d.notes);
  };

  // ----- chart helpers -----
  const chartFrame = (fontColor) => ({
    catAxisLabelColor: fontColor, valAxisLabelColor: fontColor, catAxisLabelFontFace: "+mn-lt", valAxisLabelFontFace: "+mn-lt",
    catAxisLabelFontSize: 10, valAxisLabelFontSize: 9, dataLabelFontFace: "+mn-lt", dataLabelFontSize: 10, dataLabelColor: fontColor,
    valGridLine: { color: HEX.accent5, size: 0.5 }, catGridLine: { style: "none" }, showLegend: false, legendFontFace: "+mn-lt",
    titleFontFace: "+mj-lt", titleColor: fontColor, titleFontSize: 12, legendColor: fontColor, legendFontSize: 10,
  });
  const addChartBox = (s, d, box) => {
    const kind = d.chart.kind || "bar";
    const type = kind === "line" ? pres.ChartType.line : kind === "doughnut" ? pres.ChartType.doughnut : pres.ChartType.bar;
    const series = d.chart.series.map((sr) => ({ name: t(sr.name), labels: sr.labels.map((l) => t(l)), values: sr.values }));
    const multi = series.length > 1;
    const opts = {
      ...box, ...chartFrame(HEX.dk1),
      chartColors: d.chart.colors || (multi ? [HEX.dk1, HEX.accent1, HEX.accent6] : [HEX.accent1]),
      showValue: d.chart.showValue !== false, dataLabelPosition: kind === "doughnut" ? "ctr" : (d.chart.stacked ? "ctr" : "outEnd"),
      dataLabelFormatCode: d.chart.format || "#,##0", valAxisLabelFormatCode: d.chart.format || "#,##0",
      showTitle: !!d.chart.title, title: d.chart.title ? t(d.chart.title) : undefined,
      showLegend: multi || kind === "doughnut", legendPos: "b", barDir: d.chart.horizontal ? "bar" : "col", barGapWidthPct: 60,
      barGrouping: d.chart.stacked ? "stacked" : "clustered", lineDataSymbol: "circle", lineDataSymbolSize: 7, lineSize: 2.5,
      valAxisMinVal: d.chart.min, valAxisMaxVal: d.chart.max, holeSize: 60, showPercent: kind === "doughnut" && d.chart.percent !== false,
      showLabel: kind === "doughnut", dataLabelFontBold: true, valAxisHidden: !!d.chart.hideVal, rtlMode: rtl,
    };
    if (kind === "doughnut") { opts.chartColors = d.chart.colors || [HEX.accent1, HEX.dk1, HEX.accent6, HEX.accent2, HEX.accent3]; opts.showValue = false; }
    s.addChart(type, series, opts);
  };

  // Chart + commentary panel (chart left 60%, text right)
  R.chart = async (s, d) => {
    titleOn(s, d.title); if (d.kicker) kicker(s, d.kicker);
    const hasSide = !!d.side;
    const cw = hasSide ? 5.7 : 9.0;
    addChartBox(s, d, { x: mx(0.5, cw), y: 1.3, w: cw, h: hasSide ? 3.3 : 3.35 });
    if (hasSide) {
      const sx = mx(6.45, 3.05);
      s.addShape(pres.ShapeType.rect, { x: sx, y: 1.3, w: 3.05, h: 3.3, fill: { color: HEX.lt2 }, line: { color: HEX.lt2, width: 0 } });
      if (d.side.value) s.addText(t(d.side.value), txt({ x: sx + 0.25, y: 1.45, w: 2.55, h: 0.8, fontFace: "Cambria", fontSize: 32, bold: true, color: C.accent1, valign: "middle" }));
      const hy = d.side.value ? 2.25 : 1.5; const hl = Math.max(2, Math.ceil(t(d.side.head).length / 26)); const hh = 0.24 * hl + 0.08;
      s.addText(t(d.side.head), txt({ x: sx + 0.25, y: hy, w: 2.55, h: hh, fontSize: 12.5, bold: true, color: C.text1, valign: "top" }));
      s.addText(t(d.side.body), txt({ x: sx + 0.25, y: hy + hh + 0.05, w: 2.55, h: 4.55 - (hy + hh + 0.05), fontSize: 10, color: C.accent3, valign: "top" }));
    }
    if (d.source) s.addText(t(d.source), txt({ x: mx(0.5, 9), y: 4.58, w: 9, h: 0.42, fontSize: 8, color: C.accent3, italic: true, valign: "middle" }));
    notes(s, d.notes);
  };

  // Hero number slide (dark): one big figure + statement + source
  R.hero = async (s, d) => {
    s.addText(t(d.value), txt({ x: mx(0.6, 8.8), y: 0.7, w: 8.8, h: 1.9, fontFace: "Cambria", fontSize: d.size || 88, bold: true, color: C.accent1, valign: "middle" }));
    s.addText(t(d.head), txt({ x: mx(0.6, 8.8), y: 2.65, w: 8.8, h: 0.8, fontFace: "Cambria", fontSize: 24, bold: true, color: C.background1, valign: "top" }));
    s.addText(t(d.body), txt({ x: mx(0.6, 7.5), y: 3.45, w: 7.5, h: 1.1, fontSize: 13, color: C.accent2, valign: "top" }));
    if (d.source) s.addText(t(d.source), txt({ x: mx(0.6, 8.8), y: 4.62, w: 8.8, h: 0.35, fontSize: 9, color: C.accent3, italic: true }));
    notes(s, d.notes);
  };

  // Sources list (light): numbered small text in two columns
  R.sources = async (s, d) => {
    titleOn(s, d.title); if (d.kicker) kicker(s, d.kicker);
    const n = d.items.length; const per = Math.ceil(n / 2); const colW = 4.4;
    for (let i = 0; i < n; i++) {
      const c = Math.floor(i / per), r = i % per; const x0 = 0.5 + c * (colW + 0.2); const rowH = Math.min(0.5, 3.5 / per); const y = 1.3 + r * rowH;
      s.addText(String(i + 1), { x: mx(x0, 0.35), y, w: 0.35, h: rowH - 0.05, fontFace: "Cambria", fontSize: 11, bold: true, color: C.accent1, align: al, valign: "top", margin: 0, isTextBox: true });
      s.addText(t(d.items[i]), txt({ x: mx(x0 + 0.4, colW - 0.4), y, w: colW - 0.4, h: rowH - 0.05, fontSize: 8.5, color: C.text2, valign: "top" }));
    }
    if (d.foot) s.addText(t(d.foot), txt({ x: mx(0.5, 9), y: 4.72, w: 9, h: 0.3, fontSize: 9, color: C.accent3, italic: true }));
    notes(s, d.notes);
  };

  // Stat strip on light background: 3-4 figures in ivory cards with source line
  R.figures = async (s, d) => {
    titleOn(s, d.title); if (d.kicker) kicker(s, d.kicker);
    const n = d.items.length; const gap = 0.22; const cw = (9 - gap * (n - 1)) / n;
    for (let i = 0; i < n; i++) {
      const it = d.items[i]; const x = mx(0.5 + i * (cw + gap), cw);
      s.addShape(pres.ShapeType.rect, { x, y: 1.3, w: cw, h: 3.2, fill: { color: HEX.lt2 }, line: { color: HEX.lt2, width: 0 } });
      s.addText(t(it.value), txt({ x: x + 0.2, y: 1.45, w: cw - 0.4, h: 1.0, fontFace: "Cambria", fontSize: it.small ? 24 : 36, bold: true, color: C.accent1, valign: "middle" }));
      s.addText([
        { text: t(it.label), options: { bold: true, fontSize: 12.5, color: C.text1, breakLine: true } },
        { text: t(it.body || ""), options: { fontSize: 10, color: C.accent3 } },
      ], txt({ x: x + 0.2, y: 2.5, w: cw - 0.4, h: 1.9, valign: "top", paraSpaceAfter: 3 }));
    }
    if (d.source) s.addText(t(d.source), txt({ x: mx(0.5, 9), y: 4.58, w: 9, h: 0.42, fontSize: 8, color: C.accent3, italic: true, valign: "middle" }));
    notes(s, d.notes);
  };

  // ======== build ========
  const darkTypes = new Set(["cover", "section", "stats", "quote", "contact", "hero"]);
  let curSection = null;
  for (const d of slides) {
    if (d.sectionStart) { curSection = t(d.sectionStart); pres.addSection({ title: curSection }); }
    const master = darkTypes.has(d.type) ? "DARK" : "LIGHT";
    const s = pres.addSlide({ masterName: master, sectionTitle: curSection || undefined });
    if (!R[d.type]) throw new Error("unknown slide type " + d.type);
    await R[d.type](s, d);
  }
  await pres.writeFile({ fileName });
  await applyTheme(fileName, THEME);
  // ensure complex-script font for Arabic text is Arial in the theme
  const AdmZip = null;
  return fileName;
}

module.exports = { buildDeck, DEFAULT_THEME };
