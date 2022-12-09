import { BeforeAll, Before, AfterAll, After, formatterHelpers, Status, ITestCaseHookParameter, setDefaultTimeout } from '@cucumber/cucumber';
import { Browser } from '@playwright/test';
import ConfigService from '../services/configService';
import BrowserService from '../services/browserService';
import fs from 'fs';

const env = process.env.ENV || 'local'
const browserName = process.env.BROWSER || 'chromium'
const config = new ConfigService(env);
const browserService = new BrowserService();
let browser: Browser

setDefaultTimeout(config.timeout * 1000);

// Create a global browser for the test session.
BeforeAll(async function () {
  console.log(`Test runs on the ${env} environment`)
  browser = await browserService.getBrowser(browserName);
});

AfterAll(async function () {
  await browser.close();
});

// Create a fresh browser context for each test.
Before(async function () {
  this.config = config;
  this.context = await browser.newContext({
    ignoreHTTPSErrors: true,
    acceptDownloads: true,
    baseURL: config.baseUrl,
    recordVideo: config.record_video ? { dir: './test-results/videos' } : undefined,
  });
  this.page = await this.context?.newPage();
});

// Cleanup after each scenario
After(async function ({ result, pickle, gherkinDocument }: ITestCaseHookParameter) {
  this.sharedDataTable = undefined;
  const { line } = formatterHelpers.PickleParser.getPickleLocation({ gherkinDocument, pickle })
  const videoPath = await this.page?.video()?.path();
  if (result?.status === Status.FAILED) {
    const image = await this.page?.screenshot({ path: `./test-results/screenshots/${pickle.name.replaceAll(' ', '_')}_(line_${line}).png`, fullPage: true });
    await this.attach(image, 'image/png');
  }
  await this.page?.close();
  await this.context?.close();
  if (config.record_video) {
    if (result?.status === Status.FAILED) {
      fs.renameSync(videoPath, `./test-results/videos/${pickle.name.replaceAll(' ', '_')}_(line_${line}).webm`);
      await this.attach(fs.readFileSync(`./test-results/videos/${pickle.name.replaceAll(' ', '_')}_(line_${line}).webm`), 'video/webm');
    } else {
      fs.unlinkSync(videoPath);
    }
  }
});