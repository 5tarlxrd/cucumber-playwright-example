import { ElementHandle, Locator, Page } from '@playwright/test';

export default class BasePage {
  readonly page: Page;
  readonly inputTopNavSearch: Locator;
  readonly btnTopNavSearch: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inputTopNavSearch = page.locator('.header_search .search input');
    this.btnTopNavSearch = page.locator('.header_search .button_search');
  }

  async clickOnNavButtons(buttonName: string) {
    const navBtn = this.page.locator('#menu').locator('a', { hasText: buttonName });
    await navBtn.click();
    await this.page.waitForLoadState();
  }

  async selectUnselectCheckbox(checkbox: ElementHandle, selected: boolean) {
    if (await checkbox.isChecked() && selected === false) {
      await checkbox.uncheck()
    }
    if (!await checkbox.isChecked() && selected) {
      await checkbox.check();
    }
  }
}