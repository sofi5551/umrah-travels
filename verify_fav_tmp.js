const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const outDir = "C:/Users/SUFIAN~1/AppData/Local/Temp/claude/d--sufian-vip-umrah-taxi/2358cc0e-2935-4b87-aa09-0942028e0072/scratchpad/verify2";

  // splash screen — screenshot fast before it fades
  await page.goto('http://localhost:3000/', { waitUntil: 'commit' });
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${outDir}/splash.png` });

  await page.waitForTimeout(2000);
  await page.screenshot({ path: `${outDir}/home.png` });

  await browser.close();
  console.log('done');
})();
