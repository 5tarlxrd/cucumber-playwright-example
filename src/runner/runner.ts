import fs from 'fs';
import path from 'path';
import cp from 'child_process';
import { BeforeAll, Before, AfterAll, After, formatterHelpers, Status, ITestCaseHookParameter, setDefaultTimeout } from '@cucumber/cucumber';
import { Browser } from '@playwright/test';
import ConfigService from '../services/configService';
import BrowserService from '../services/browserService';

const env = process.env.ENV || 'local'
const browserstack = process.env.BROWSERSTACK === 'true' ? true : false; 
const browserName = process.env.BROWSER || 'chromium'
const config = new ConfigService(env);
const browserService = new BrowserService();
let browser: Browser


setDefaultTimeout(config.timeout * 1000);

// Create a global browser for the test session.
BeforeAll(async function () {
  console.log(`Test runs on the ${env} environment`);
  if (browserstack) {
    const playwrightVersion = cp.execSync('npx playwright --version').toString().trim().split(' ')[1];
    const defaultBsCaps = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), './browserstack-caps.json')).toString());
    const bsCaps = Object.assign(
      {
        'browserstack.username': process.env.BROWSERSTACK_USERNAME,
        'browserstack.accessKey': process.env.BROWSERSTACK_ACCESS_KEY,
        'client.playwrightVersion': playwrightVersion,
        name: 'E2E Tests',
        build: `${browserName} : ${process.env.BUILD_NUMBER || 'local'} : ${ new Date().toLocaleString() }`,
      },
      defaultBsCaps[browserName]
      );
    browser = await browserService.connectToBsBrowser(browserName, bsCaps);
  } else {
    browser = await browserService.getBrowser(browserName);
  }
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
    recordVideo: config.record_video && !browserstack ? { dir: './test-results/videos' } : undefined,
  });
  this.page = await this.context?.newPage();
});

// Cleanup after each scenario
After(async function ({ result, pickle, gherkinDocument }: ITestCaseHookParameter) {
  this.sharedDataTable = undefined;
  const { line } = formatterHelpers.PickleParser.getPickleLocation({ gherkinDocument, pickle });
  const videoFilePath = `./test-results/videos/${pickle.name.replaceAll(' ', '_')}_(line_${line}).webm`;
  const videoPath = await this.page?.video()?.path();
  if (result?.status === Status.FAILED) {
    const image = await this.page?.screenshot({ path: `./test-results/screenshots/${pickle.name.replaceAll(' ', '_')}_(line_${line}).png`, fullPage: true });
    await this.attach(image, 'image/png');
  }
  await this.page?.close();
  await this.context?.close();
  if (config.record_video && !browserstack) {
    if (result?.status === Status.FAILED) {
      fs.renameSync(videoPath, videoFilePath);
      await this.attach(fs.readFileSync(videoFilePath), 'video/webm');
    } else {
      fs.unlinkSync(videoPath);
    }
  }
});