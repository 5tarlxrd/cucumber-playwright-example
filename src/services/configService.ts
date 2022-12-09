import * as fs from 'fs';
import * as path from 'path';

export default class ConfigService {
  private configFile;
  readonly baseUrl: string;
  readonly retries: number;
  readonly paralles_sessions: number;
  readonly record_video: boolean;
  readonly headless: boolean;
  readonly timeout: number;

  constructor(environment: string) {
    this.configFile = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), `./config/${environment}.json`)).toString());
    this.baseUrl = this.configFile.baseUrl;
    this.retries = this.configFile.retry;
    this.paralles_sessions = this.configFile.parallel;
    this.record_video = this.configFile.record_video;
    this.headless = this.configFile.headless
    this.timeout = this.configFile.timeout
  }
}