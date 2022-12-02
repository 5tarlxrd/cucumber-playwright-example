import BasePage from './basePage';
import { Locator, Page } from '@playwright/test';

export class SamplePage extends BasePage {
  readonly inputName: Locator;
  readonly inputEmail: Locator;
  readonly inputWebsite: Locator;
  readonly dropdownExperience: Locator;
  readonly checkboxesExpertise: Locator;
  readonly radioEducation: Locator;
  readonly inputComment: Locator;
  readonly btnSubmit: Locator;
  readonly textName: Locator;
  readonly textEmail: Locator;
  readonly textWebsite: Locator;
  readonly textExperience: Locator;
  readonly textExpertise: Locator;
  readonly textEducation: Locator;
  readonly textComment: Locator;

  constructor(page: Page) {
    super(page);
    this.inputName = this.page.locator('[id^=contact-form] input.name');
    this.inputEmail = this.page.locator('[id^=contact-form] input.email');
    this.inputWebsite = this.page.locator('[id^=contact-form] input[id$=website]');
    this.inputComment = this.page.locator('[id^=contact-form] textarea[name$=comment]');
    this.dropdownExperience = this.page.locator('[id^=contact-form] [id$=experienceinyears]');
    this.checkboxesExpertise = this.page.locator('[id^=contact-form] .checkbox-multiple > input[name$="expertise[]"]');
    this.radioEducation = this.page.locator('[id^=contact-form] .grunion-field-radio-wrap input[name$=education]');
    this.btnSubmit = this.page.locator('[id^=contact-form] .contact-submit button');
    this.textName = this.page.locator('.contact-form-submission > p:nth-of-type(1)');
    this.textEmail = this.page.locator('.contact-form-submission > p:nth-of-type(2)');
    this.textWebsite = this.page.locator('.contact-form-submission > p:nth-of-type(3)');
    this.textExperience = this.page.locator('.contact-form-submission > p:nth-of-type(4)');
    this.textExpertise = this.page.locator('.contact-form-submission > p:nth-of-type(5)');
    this.textEducation = this.page.locator('.contact-form-submission > p:nth-of-type(6)');
    this.textComment = this.page.locator('.contact-form-submission > p:nth-of-type(7)');
  }

  async selectUnselectExpertise(expertise: string[] | string, selected: boolean) {
    const values = Array.isArray(expertise) ? expertise : [expertise];
    const checkboxes = await this.checkboxesExpertise.elementHandles();
    for (let i = 0; i < checkboxes.length; i++) {
      if (values.includes(await checkboxes[i].inputValue())) {
        await this.selectUnselectCheckbox(await checkboxes[i], selected)
      }
    }
  }

  async selectEducation(education: string) {
    const radioBtns = await this.radioEducation.elementHandles();
    for (let i = 0; i < radioBtns.length; i++) {
      if (education === await radioBtns[i].inputValue()) {
        await radioBtns[i].check();
      }
    }
  }
} 