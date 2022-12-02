import BasePage from './basePage';
import { Locator, Page } from '@playwright/test';

export class SearchResultPage extends BasePage {
  readonly textSearchResultTitles: Locator

  constructor(page: Page) {
    super(page);
    this.textSearchResultTitles = page.locator('.search_res');
  }

  async getFirstSearchResultTitle(): Promise<string | null> {
    const title = this.textSearchResultTitles.locator('li > .post_item h3').nth(0);
    if (await title.isVisible()) {
      return (await title.textContent())!.split('(')[0].trim();
    }
    return await this.textSearchResultTitles.locator('p').textContent();
  }
}