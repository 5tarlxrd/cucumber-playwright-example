import ConfigService from './configService';
import { chromium, webkit, firefox, Browser, LaunchOptions } from '@playwright/test';

export default class BrowserService {
  private env = process.env.ENV || 'local'
  private config = new ConfigService(this.env);

  public async getBrowser(browser: string): Promise<Browser> {
    const browserOptions: LaunchOptions = {
      headless: process.env.HEADLESS === 'true' || this.config.headless
    };
    if (browser === 'chrome') {
      const options: LaunchOptions = Object.assign({
        channel: browser
      }, browserOptions)
      return await chromium.launch(options);
    }
    if (browser === 'msedge') {
      const options: LaunchOptions = Object.assign({
        channel: browser
      }, browserOptions)
      return await chromium.launch(options);
    }
    return await { chromium, webkit, firefox }[browser]!.launch(browserOptions);
  }
}
