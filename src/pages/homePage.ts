import BasePage from './basePage';
import { Locator, Page } from '@playwright/test';


export class HomePage extends BasePage {
  readonly btnContactUs: Locator

  constructor(page: Page) {
    super(page);
    this.btnContactUs = page.locator('.text_box').locator('a', { hasText: 'Contact Us' });
  }
}