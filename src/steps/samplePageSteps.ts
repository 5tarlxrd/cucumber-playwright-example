import assert from 'assert';
import { Given, Then, When } from "@cucumber/cucumber";
import { SamplePage } from '../pages/samplePage';

Given('fill the form on the Sample page with {string}, {string}, {string}, {string}',
  async function (name, email, website, comment) {
    const samplePage = new SamplePage(this.page);
    await samplePage.inputName.fill(name);
    await samplePage.inputEmail.fill(email);
    await samplePage.inputWebsite.fill(website);
    await samplePage.inputComment.fill(comment);
  });

Given('select Experience \\(In Years) in the form on the Sample page {string}', async function (experience) {
  const samplePage = new SamplePage(this.page);
  await samplePage.dropdownExperience.selectOption(experience);
});

Given('select Expertise in the form on the Sample page:', async function (table) {
  this.sharedDataTable = table;
  const samplePage = new SamplePage(this.page);
  const data = table.hashes();
  const expertiseToCheck = [];
  const expertiseToUncheck = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i]['Selected'] === 'true') {
      expertiseToCheck.push(data[i]['Expertise']);
    }
    if (data[i]['Selected'] === 'false') {
      expertiseToUncheck.push(data[i]['Expertise']);
    }
  }
  await samplePage.selectUnselectExpertise(expertiseToCheck, true);
  await samplePage.selectUnselectExpertise(expertiseToUncheck, false);
});

Given('select Education in the form on the Sample page {string}', async function (education) {
  const samplePage = new SamplePage(this.page);
  await samplePage.selectEducation(education);
});

When('click on the Submit button on the the Sample page', async function () {
  const samplePage = new SamplePage(this.page);
  await samplePage.btnSubmit.scrollIntoViewIfNeeded();
  await samplePage.btnSubmit.click();
});

Then('verify data in submitted form on the Sample page {string}, {string}, {string}, {string}, {string}, {string}',
  async function (name, email, website, comment, experience, education) {
    const samplePage = new SamplePage(this.page);
    await this.page.waitForLoadState();
    const expertiseRaw = this.sharedDataTable.hashes();
    const expertiseSelected = [];
    for (let i = 0; i < expertiseRaw.length; i++) {
      if (expertiseRaw[i]['Selected'] === 'true') {
        expertiseSelected.push(expertiseRaw[i]['Expertise']);
      }
    }
    const actualName = (await samplePage.textName.textContent())?.split(':')[1].trim();
    const actualEmail = (await samplePage.textEmail.textContent())?.split(':')[1].trim();
    const actualWebsite = (await samplePage.textWebsite.textContent())?.split(':').slice(1).join(':').trim();
    const actualComment = (await samplePage.textComment.textContent())?.split(':')[1].trim();
    const actualExperience = (await samplePage.textExperience.textContent())?.split(':')[1].trim();
    const actualEducation = (await samplePage.textEducation.textContent())?.split(':')[1].trim();
    const actualExpertise = (await samplePage.textExpertise.textContent())?.split('::')[1].trim();
    assert.deepEqual(actualName, name, "Name isn't correct in submitted form");
    assert.deepEqual(actualEmail, email, "Email isn't correct in submitted form");
    assert.deepEqual(actualWebsite, website, "Website isn't correct in submitted form");
    assert.deepEqual(actualComment, comment, "Comment isn't correct in submitted form");
    assert.deepEqual(actualExperience, experience, "Experience isn't correct in submitted form");
    assert.deepEqual(actualEducation, education, "Education isn't correct in submitted form");
    assert.deepEqual(actualExpertise, expertiseSelected.join(', '), "Expertise isn't correct in submitted form");
  }
);

Then('verify form not submitted on the Sample page', async function () {
  const samplePage = new SamplePage(this.page);
  await samplePage.btnSubmit.scrollIntoViewIfNeeded();
  assert.deepEqual(await samplePage.btnSubmit.isVisible(), true, "Form was submitted with invalid data");
});