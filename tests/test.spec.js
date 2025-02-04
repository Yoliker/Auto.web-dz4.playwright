import { test, expect } from '@playwright/test';
const { chromium } = require('playwright');
const { email, password, wrongEmail, wrongPassword } = require('../user');

test('Successful authorization', async ({ page }) => {
    test.setTimeout(50_000);
    await page.goto('https://netology.ru/');
    await page.getByRole('link', { name: 'Войти' }).click();
    await page.screenshot({ path: 'screenSucc1.png' });

    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.screenshot({ path: 'screenSucc2.png' });

    await page.getByRole('textbox', { name: 'Email' }).fill(email);
    await page.getByRole('textbox', { name: 'Пароль' }).click();
    await page.screenshot({ path: 'screenSucc3.png' });

    await page.getByRole('textbox', { name: 'Пароль' }).fill(password);
    await page.getByTestId('login-submit-btn').click();
    await page.screenshot({ path: 'screenSucc4end.png' });
    
    await expect(page.locator('[data-testid="profile-programs-content"]')).toContainText('Моё обучение');
});

test('Unseccessful authorization', async ({ page }) => {
    test.setTimeout(80_000);
  await page.goto('https://netology.ru/');
  await page.getByRole('link', { name: 'Войти' }).click();
  await page.screenshot({ path: 'screenUnsucc1.png' });

  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.screenshot({ path: 'screenUnsucc2.png' });

  await page.getByRole('textbox', { name: 'Email' }).fill(wrongEmail);
  await page.getByRole('textbox', { name: 'Пароль' }).click();
  await page.screenshot({ path: 'screenUnsucc3.png' });

  await page.getByRole('textbox', { name: 'Пароль' }).fill(wrongPassword);
  await page.getByTestId('login-submit-btn').click();
  await page.screenshot({ path: 'screenUnsucc4end.png' });
  
  await expect(page.locator('[data-testid="login-error-hint"]')).toContainText(
    'Вы ввели неправильно логин или пароль.'
    );
}); 