import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.resolve(__dirname, 'gen-og-image.html');
const outPath = path.resolve(__dirname, '../public/og-image.png');

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1200, height: 630 });
await page.goto(`file://${htmlPath}`);
await page.waitForTimeout(1000);
await page.screenshot({ path: outPath, type: 'png' });
await browser.close();
console.log(`✅ og-image.png written to public/og-image.png`);
