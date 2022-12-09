# cucumber-playwright-example
 Cucumber + Playwright example
This framework was developed with NodeJS, Typescript, Cucumber and Playwright.
## Quick Start
1. NodeJS is required for this project, you can find installation instructions [here](https://nodejs.org/en/).
2. Clone this repository:
```sh
git clone TODO
```
3. Go to the repository directory in the Terminal/Command line and run the following command to install dependencies:
```sh
npm i
```
## Configuration
To simplify running tests on different environments, you can create a config file in `.json` format and put it in the `config` folder. There are a few parameters that can be configured:
| Parameter | Type      | Description |
| --------- | --------- | ----------- |
| `baseUrl` | `string` | It's a base URL of the application under test.            |
| `retry` | `number` | This parameter refers to Cucumber [retry](https://github.com/cucumber/cucumber-js/blob/main/docs/retry.md) configuration. Also, it can be configured using the environment variable - `RETRIES`. |
| `parallel` | `number` | This parameter refers to Cucumber [parallel](https://github.com/cucumber/cucumber-js/blob/main/docs/parallel.md) configuration. Also, it can be configured using the environment variable - `PARALLEL_SESSIONS`. |
| `record_video` | `boolean` | This parameter enables saving video if the test fails. |
| `headless` | `boolean` | Whether to run the browser in headless mode. Also, it can be configured using the environment variable - `HEADLESS`.|
| `timeout` | `number` | This parameter refers to Cucumber [setDefaultTimeout](https://github.com/cucumber/cucumber-js/blob/main/docs/support_files/timeouts.md) option. |

## Run Tests
You can specify on what environment run tests and in which browser via CLI options `--env` and `--browser-name`. The `--env` option should correspond file name in the `config` folder (e.g., filename - `local.json`, CLI option `--env=local`). Available browsers: `chromium`, `chrome`, `firefox`, `webkit`, `msedge`. Please note that if you want to run tests in `chrome` or `msedge`, you must install these browsers before running tests.
You can run all tests with default configuration (environment - `local` and browser - `chrome`) by the following command:
```sh
npm run test
```
To run all tests in the specific environment and browser, provide `--env` and `--browser-name` CLI options like in this command:
```sh
npm run test --env=staging --browser-name=firefox
```
You can run tests with specific tags by the following command:
```sh
npm run test:tags @smoke --env=staging --browser-name=firefox
```
More about Cucumber tags you can find [here](https://cucumber.io/docs/cucumber/api/?lang=javascript#tags)
Also, there is possible to rerun only failed tests after a test run by the following command:
```sh
npm run test:failed --env=staging --browser-name=firefox
```

### Reports
After running with tests reports will be generated in the `test-results` directory:
-   `cucumber-report.xml`: JUnit report.
-   `cucumber-report.html`: HTML report.
-   `cucumber-report.json`: Cucumber JSON report.

## Running tests on remote browsers (Selenium Standalone or Selenium Grid Hub)
Playwright can [connect](https://playwright.dev/docs/selenium-grid) to Selenium Grid Hub that runs Selenium 4 to launch Google Chrome (`chrome`) or Microsoft Edge (`msedge`) browser, instead of the running browser on the local machine.
To run tests on a remote browser provide an environment variable `SELENIUM_REMOTE_URL`, like this:
```sh
SELENIUM_REMOTE_URL=http://<selenium-hub-ip>:4444/wd/hub npm run test --env=staging --browser-name=firefox
```
Please note that if you run tests on remote browsers (Selenium Grid Hub/Selenium Standalone Server), the value for the `PARALLEL_SESSIONS` should be equal to available browser nodes.

## CI
A `cucumber_tests` job is executed in CircleCI.
Test reports are stored as artifacts for every execution of the `cucumber_tests` job.