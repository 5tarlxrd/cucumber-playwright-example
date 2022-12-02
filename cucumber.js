require('dotenv').config({ path:'.env' });

module.exports = {
  default: {
    paths: ['./features/'],
    parallel: parseInt(process.env.PARALLEL_SESSIONS),
    format: [
      'progress-bar',
      'json:test-results/cucumber-report.json',
      'html:test-results/cucumber-report.html',
      'junit:test-results/cucumber-report.xml',
      'rerun:@rerun.txt'
    ],
    formatOptions: { snippetInterface: 'async-await' },
    requireModule: ['ts-node/register'],
    require: [
      '**/steps/*.ts',
      './src/runner/runner.ts'
    ],
    retry: parseInt(process.env.RETRIES),
    publishQuiet: true,
    publish: false
  }
}