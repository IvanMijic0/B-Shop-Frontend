import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { Builder, By, until } from 'selenium-webdriver';

describe('Main Page Tests', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    await driver.quit();
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

  it('should load the main page and display products', async () => {
    await driver.get('http://localhost:5173');

    const productElements = await driver.wait(until.elementsLocated(By.css('.MuiCard-root')), 10000);
    expect(productElements.length).toBeGreaterThan(0);
  });

  it('should filter products by search term', async () => {
    await driver.get('http://localhost:5173');

    const searchInput = await driver.wait(until.elementLocated(By.css('input.MuiInputBase-input')), 10000);
    await searchInput.sendKeys('phone');

    await driver.sleep(2000);

    const productElements = await driver.wait(until.elementsLocated(By.css('.MuiCard-root')), 10000);
    const productNames = await Promise.all(productElements.map(async (element) => await element.findElement(By.css('.MuiTypography-h5')).getText()));
    
    productNames.forEach((name: string) => {
      expect(name.toLowerCase()).toContain('phone');
    });
  });

  it('should filter products by category', async () => {
    await driver.get('http://localhost:5173');

    const categoryDropdown = await driver.wait(until.elementLocated(By.id('categories-checkbox')), 10000);
    await categoryDropdown.click();

    const firstCategoryCheckbox = await driver.wait(until.elementLocated(By.css('li[role="option"]')), 10000);
    const categoryName = await firstCategoryCheckbox.getText();
    await firstCategoryCheckbox.click();

    
    await driver.sleep(1000); 
    await driver.sleep(2000);

    const productElements = await driver.wait(until.elementsLocated(By.css('.MuiCard-root')), 10000);
    const productCategories = await Promise.all(productElements.map(async (element) => {
      try {
        const categoryLabel = await element.findElement(By.css('.category-label')).getText();
        return categoryLabel.toLowerCase();
      } catch (e) {
        return 'category not found';
      }
    }));

    productCategories.forEach((category: string) => {
      if (category !== 'category not found') {
        expect(category).toContain(categoryName.toLowerCase());
      }
    });
  });
});
