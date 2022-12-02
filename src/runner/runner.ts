import { BeforeAll, Before, AfterAll, After, formatterHelpers, Status, ITestCaseHookParameter, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, webkit, firefox, Browser } from '@playwright/test';
import fs from 'fs';
const browserName = process.env.BROWSER || 'chromium';
const browserChanel = process.env.BROWSER_CHANEL || 'chrome';
const timeout = process.env.TEST_TIMEOUT || '15';

let browser: Browser

setDefaultTimeout(parseInt(timeout) * 1000);

// Create a global browser for the test session.
BeforeAll(async function () {
  browser = await { chromium, webkit, firefox }[browserName]!.launch({
    channel: browserChanel,
    headless: process.env.HEADLESS === 'true' ? true : false
  });
});

AfterAll(async function () {
  await browser.close();
});

// Create a fresh browser context for each test.
Before(async function () {
  this.context = await browser.newContext({
    ignoreHTTPSErrors: true,
    acceptDownloads: true,
    recordVideo: process.env.RECORD_VIDEO === "true" ? { dir: './test-results/videos' } : undefined,
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
  if (process.env.RECORD_VIDEO === 'true') {
    if (result?.status === Status.FAILED) {
      fs.renameSync(videoPath, `./test-results/videos/${pickle.name.replaceAll(' ', '_')}_(line_${line}).webm`);
      await this.attach(fs.readFileSync(`./test-results/videos/${pickle.name.replaceAll(' ', '_')}_(line_${line}).webm`), 'video/webm');
    } else {
      fs.unlinkSync(videoPath);
    }
  }
});