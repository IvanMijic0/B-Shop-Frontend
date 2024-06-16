import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { Builder, By, until } from 'selenium-webdriver';

describe('Login Page Tests', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  it('should display an error with invalid credentials', async () => {
    await driver.get('http://localhost:5173/login');

    await driver.wait(until.elementLocated(By.id('email')), 20000);
    await driver.findElement(By.id('email')).sendKeys('user@gmail.com');
    await driver.findElement(By.id('password')).sendKeys('wrongPassword');
    await driver.findElement(By.css('button[type="submit"]')).click();

    const errorElement = await driver.wait(until.elementLocated(By.css('[role="alert"]')), 20000);
    const errorMessage = await errorElement.getText();
    expect(errorMessage).toMatch(/Request failed with status code 422|Invalid credentials/);
  });

  it('should successfully login with valid credentials', async () => {
    await driver.get('http://localhost:5173/login');

    await driver.wait(until.elementLocated(By.id('email')), 20000);
    await driver.findElement(By.id('email')).sendKeys('user@gmail.com');
    await driver.findElement(By.id('password')).sendKeys('userPassword!23');
    await driver.findElement(By.css('button[type="submit"]')).click();

    await driver.wait(until.urlIs('http://localhost:5173/profile'), 20000);
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).toBe('http://localhost:5173/profile');
  });
});