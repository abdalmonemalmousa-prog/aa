// Renders every template in manifest.json to preview/<name>.png at native size.
// Usage: node render_previews.js   (requires the `playwright` package and a Chromium build)
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const OUT = __dirname;
(async () => {
  const browser = await chromium.launch();
  const manifest = JSON.parse(fs.readFileSync(path.join(OUT, 'manifest.json')));
  fs.mkdirSync(path.join(OUT, 'preview'), { recursive: true });
  for (const t of manifest) {
    const page = await browser.newPage({ viewport: { width: t.w, height: t.h }, deviceScaleFactor: 1 });
    await page.goto('file://' + path.join(OUT, t.name + '.html'), { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(200);
    await page.screenshot({ path: path.join(OUT, 'preview', t.name + '.png'), type: 'png' });
    await page.close();
    console.log('rendered', t.name, t.w + 'x' + t.h);
  }
  await browser.close();
})();
