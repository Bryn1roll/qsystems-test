// данные автотесты иммитируют поведение пользователя на сайте paysend.com
// вводят сумму для отправки, получают сумму получателя, комиссию и курс конвертации
// также я добавил проверку корректности конвертации с учетом комиссии, т.к считаю это критически важным
// для подобных сайтов. Автотесты настроены на запуск в Chromium, 
// при необходимости можно раскомментировать другие браузеры в playwright.config.js и запустить в них.
// Но делать этого я не советую, т.к у сайта присутствует защита cloudflare


import { test, expect } from '@playwright/test';

// функция для вывода значений 
async function pagedata(page) {
  await page.getByTestId('input-amount-number-from').fill('600.00');
  await page.getByTestId('input-amount-number-from').fill('1000.00');
  await page.waitForTimeout(1000);
  


  await page.getByTestId('input-amount-number-from').press('Enter');
  await page.waitForTimeout(1000);
  await page.getByTestId('input-amount-number-to').press('Enter');

  
  const tosend = await page.getByTestId('input-amount-number-from');
  console.log('To send:', await tosend.inputValue());
  const feelocator = await page.locator('a.sc-dyuvay.kJKcVD');
  console.log(' ',await feelocator.textContent());
  const convertratelocator = await page.locator('a.sc-dyuvay.bKumkQ').nth(0);
  console.log(' ', await convertratelocator.textContent());
  const recepientget = await page.getByTestId('input-amount-number-to');
  console.log('Recepient get:', await recepientget.inputValue());

  // значение отправителя
  const toSendValue = parseFloat((await tosend.inputValue()).replace(/[, ]/g, ''));
 // значение комиссии
  const feeValue = parseFloat((await feelocator.textContent()).replace(/[^\d.]/g, ''));
 // расчет курса конвертации 
  const rateText = await convertratelocator.textContent();
  const rateValue = parseFloat(rateText.split('=')[1].replace(/[, ]/g, ''));
// значение получателя  
  const recepientValue = parseFloat((await recepientget.inputValue()).replace(/[, ]/g, ''));
  
  return { toSendValue, feeValue, rateValue, recepientValue };
}


async function convertationcheck({ toSendValue, feeValue, rateValue, recepientValue }) {
  const amountToConvert = toSendValue - feeValue;
  let expectedRecepient;
  // Определяем направление курса:
  if (amountToConvert < recepientValue) {
    expectedRecepient = amountToConvert * rateValue;
  } else {
    expectedRecepient = amountToConvert / rateValue;
  }
  
  expect(recepientValue).toBeCloseTo(expectedRecepient, 1);
}






test('euro-to-gbk convert', async ({ page }) => {
  await page.goto('https://paysend.com/en-en/send-money/from-ireland-to-united-kingdom');
  const data = await pagedata(page);
  await convertationcheck(data);

});

test('gbk-to-euro convert', async ({ page }) => {
  await page.goto('https://paysend.com/en-en/send-money/from-united-kingdom-to-belgium');
  const data = await pagedata(page);
  await convertationcheck(data);

});

test('eur-to-chf', async ({ page }) => {
  await page.goto('https://paysend.com/en-en/send-money/from-austria-to-switzerland');
  const data = await pagedata(page);
  await convertationcheck(data);

});

test('aud-to-cad', async ({ page }) => {
  await page.goto('https://paysend.com/en-en/send-money/from-australia-to-canada');
  const data = await pagedata(page);
  await convertationcheck(data);

});

test('aud-to cny', async ({ page }) => {
  await page.goto('https://paysend.com/en-en/send-money/from-australia-to-china?fromCurrId=36&toCurrId=156&isFrom=true');
  const data = await pagedata(page);
  await convertationcheck(data);

});

/// Больше проверок с различными валютами можно добавить по аналогии. 