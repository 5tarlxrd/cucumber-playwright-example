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
TODO

## Run Tests Locally
You can simply run tests locally by the following command:
```sh
npm run test
```

### Reports
After running with tests reports will be generated in the `test-results` directory:
-   `cucumber-report.xml`: JUnit report.
-   `cucumber-report.html`: HTML report.
-   `cucumber-report.json`: Cucumber JSON report.

## CI
A `cucumber_tests` job is executed in CircleCI.
Test reports are stored as artifacts for every execution of the `cucumber_tests` job.