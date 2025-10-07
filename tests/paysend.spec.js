// данные автотесты иммитируют поведение пользователя на сайте paysend.com
// вводят сумму для отправки, получают сумму получателя, комиссию и курс конвертации
// также я добавил проверку корректности конвертации с учетом комиссии, т.к считаю это критически важным
// для подобных сайтов. Автотесты настроены на запуск в Chromium, 
// при необходимости можно раскомментировать другие браузеры в playwright.config.js и запустить в них.
// Но делать этого я не советую, т.к у сайта присутствует защита cloudflare

import { test, expect } from '@playwright/test';
import { exchangePage } from '../pageobject/exchangepage';
require('dotenv').config(); // для загрузки переменных окружения из .env файла


test('euro-to-gbp', async ({ page }) => {
  const exchange = new exchangePage(page);
  await page.goto(`${process.env.LANDING_URL}/from-ireland-to-united-kingdom`);
  const data = await exchange.getPageData('1000.00');
  await exchange.checkConversion(data);


});

test('gbp-to-euro', async ({ page }) => {
  const exchange = new exchangePage(page);
  await page.goto(`${process.env.LANDING_URL}/from-united-kingdom-to-belgium`);
  const data = await exchange.getPageData('1000.00');
  await exchange.checkConversion(data);

});

test('eur-to-chf', async ({ page }) => {
  const exchange = new exchangePage(page);
  await page.goto(`${process.env.LANDING_URL}/from-austria-to-switzerland`);
  const data = await exchange.getPageData('1000.00');
  await exchange.checkConversion(data);

});

test('aud-to-cad', async ({ page }) => {
  const exchange = new exchangePage(page);
  await page.goto(`${process.env.LANDING_URL}/from-australia-to-canada`);
  const data = await exchange.getPageData('1000.00');
  await exchange.checkConversion(data);

});

test('aud-to-cny', async ({ page }) => {
  const exchange = new exchangePage(page);
  await page.goto(`${process.env.LANDING_URL}/from-australia-to-china`);
  const data = await exchange.getPageData('1000.00');
  await exchange.checkConversion(data);

});

test.afterEach(async ({ page }) => {
  await page.close();
});


