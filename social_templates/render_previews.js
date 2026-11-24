const { chromium } = require('playwright');
const fs = require('fs');
const OUT = '__dirname';
(async () => {
  const browser = await chromium.launch();
  const manifest = JSON.parse(fs.readFileSync(OUT + '/manifest.json'));
  for (const t of manifest) {
    const page = await browser.newPage({ viewport: { width: t.w, height: t.h }, deviceScaleFactor: 1 });
    await page.goto('file://' + OUT + '/' + t.name + '.html', { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(200);
    await page.screenshot({ path: OUT + '/preview/' + t.name + '.png', type: 'png' });
    await page.close();
    console.log('shot', t.name, t.w + 'x' + t.h);
  }
  await browser.close();
})();
