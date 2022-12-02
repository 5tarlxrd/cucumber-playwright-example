import assert from 'assert';
import { Given, Then } from "@cucumber/cucumber";
import { HomePage } from "../pages/homePage";
import { SearchResultPage } from '../pages/searchResultPage';

Given('Home page is opened', async function () {
  const baseUrl = process.env.BASE_URL;
  await this.page.goto(baseUrl);
  await this.page.waitForLoadState('networkidle', { timeout: 10000 });
});

Given('{string} page is opened', async function (path) {
  const homePage = new HomePage(this.page);
  await homePage.open(path);
  await this.page.waitForLoadState();
});

Given('click on {string} button in top navigation bar', async function (buttonName) {
  const homePage = new HomePage(this.page);
  await homePage.clickOnNavButtons(buttonName);
});

Given('perform search with {string} serch string in top navigation bar', async function (searchString) {
  const homePage = new HomePage(this.page);
  await homePage.inputTopNavSearch.fill(searchString);
  await homePage.btnTopNavSearch.click();
  await this.page.waitForLoadState('networkidle', { timeout: 10000 });
  
});

Then('page has title {string}', async function (title) {
  const pageTitle = await this.page.title();
  assert.deepEqual(pageTitle, title, "Page title isn't correct");
});

Then('Search Result page contains serched post \\(or placeholder) with text {string}', async function (text) {
  const serachResultPage = new SearchResultPage(this.page);
  const serachResult = await serachResultPage.getFirstSearchResultTitle();
  assert.deepEqual(serachResult, text, "Search result isn't correct");
});