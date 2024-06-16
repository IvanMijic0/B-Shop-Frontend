import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { Builder, By, until } from 'selenium-webdriver';

describe('Product Page Tests', () => {
  let driver: any;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  it('should load the product page and display product details', async () => {
    await driver.get('http://localhost:5173/product/1');

    const productName = await driver.wait(until.elementLocated(By.css('h1')), 10000).getText();
    expect(productName).to.equal('Expected Product Name');

    const productPrice = await driver.findElement(By.css('.price')).getText();
    expect(productPrice).to.equal('$599.99');
  });
});
