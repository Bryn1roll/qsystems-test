import { expect } from '@playwright/test';

export class exchangePage {
  constructor(page) {
    this.page = page;
    this.amountFrom = page.getByTestId('input-amount-number-from');
    this.amountTo = page.getByTestId('input-amount-number-to');
    this.fee = page.locator('a.sc-dyuvay.kJKcVD');
    this.rate = page.locator('a.sc-dyuvay.bKumkQ').nth(0);
  }

  async getPageData(amount = '1000.00') { /// реворк 
    await this.amountFrom.fill('600'); // ввод первого значения для активации поля получателя
    await this.amountFrom.fill(amount);
    await this.page.waitForTimeout(1000);
    await this.amountFrom.press('Enter');
    // await this.page.waitForTimeout(1000);
    // await this.amountTo.press('Enter');

    const toSendValue = parseFloat((await this.amountFrom.inputValue()).replace(/[, ]/g, ''));
    const feeText = await this.fee.textContent();
    const feeValue = parseFloat(feeText?.replace(/[^\d.]/g, '') || '0');
    const rateText = await this.rate.textContent();
    const rateValue = parseFloat(rateText?.split('=')[1].replace(/[, ]/g, '') || '0');
    const recepientValue = parseFloat((await this.amountTo.inputValue()).replace(/[, ]/g, ''));

    // вывод значений в консоль
    console.log(`To send: ${toSendValue}, Fee: ${feeValue}, Convertationrate: ${rateValue}, Recepient get: ${recepientValue}`);

    return { toSendValue, feeValue, rateValue, recepientValue };
  }

   async checkConversion({ toSendValue, feeValue, rateValue, recepientValue }) {
    const amountToConvert = toSendValue - feeValue;
    let expectedRecepient;

    if (amountToConvert < recepientValue) {
      expectedRecepient = amountToConvert * rateValue;
    } else {
      expectedRecepient = amountToConvert / rateValue;
    }

    console.log(`Verification: Expected ${expectedRecepient}, received ${recepientValue}`);
    await expect(recepientValue).toBeCloseTo(expectedRecepient, 1);
  }
}
