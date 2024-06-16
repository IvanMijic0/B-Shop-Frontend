import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { Builder, By, until, Key } from 'selenium-webdriver';

describe('Product Page Tests', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  it('should login', async () => {
    await driver.get('http://localhost:5173/login');
    await driver.wait(until.elementLocated(By.id('email')), 20000);
    await driver.findElement(By.id('email')).sendKeys('user@gmail.com');
    await driver.findElement(By.id('password')).sendKeys('userPassword!23');
    await driver.findElement(By.css('button[type="submit"]')).click();
    await driver.wait(until.urlIs('http://localhost:5173/profile'), 20000);
  });

  it('should navigate to main page and search for a product', async () => {
    await driver.get('http://localhost:5173');
    const searchInput = await driver.wait(until.elementLocated(By.css('input.MuiInputBase-input')), 10000);
    await searchInput.sendKeys('Smartphone', Key.RETURN);
    await driver.sleep(2000);
  });

  it('should select a product and verify product details', async () => {
    const productElement = await driver.wait(until.elementLocated(By.css('.MuiCard-root')), 10000);
    await driver.wait(until.elementIsVisible(productElement), 10000);
    await driver.wait(until.elementIsEnabled(productElement), 10000);
    await productElement.click();

    const productName = await driver.wait(until.elementLocated(By.css('h1')), 10000).getText();
    expect(productName).toEqual('Smartphone');
    const productPriceElement = await driver.wait(until.elementLocated(By.css('.price p')), 10000);
    const productPriceText = await productPriceElement.getText();
    const productPrice = productPriceText.replace('$', '').trim();
    expect(productPrice).toEqual('599.99');
  });

  it('should proceed to checkout', async () => {
    const buyNowButton = await driver.wait(until.elementLocated(By.css('button.buy-now')), 10000);
    await driver.wait(until.elementIsVisible(buyNowButton), 10000);
    await driver.wait(until.elementIsEnabled(buyNowButton), 10000);
    await buyNowButton.click();

    await driver.wait(until.urlIs('http://localhost:5173/checkout'), 20000);
    const checkoutTitle = await driver.findElement(By.css('h6.css-nnuesi-MuiTypography-root')).getText();
    expect(checkoutTitle).toEqual('Checkout');
  });
});
