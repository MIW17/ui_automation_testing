import { test, expect, Page} from '@playwright/test';

export class CommonPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async inputTextByLabel(label: string, value: string) {
    let xpath = `(//label[normalize-space(text())="${label}"]/following::input)[1]`;
    await this.page.locator(xpath).fill(value);
  }

  async inputTextAreaByLabel(label: string, value: string) {
    let xpath = `(//label[normalize-space(text())="${label}"]/following::textarea)[1]`;
    await this.page.locator(xpath).fill(value);
  }

  async selectDropdownByLable(label: string, option: string) {
    let xpath1 = `(//label[normalize-space(text()) = "${label}"]/following::select)[1]`;
    let xpath2 = `(//h3[normalize-space(text()) = "${label}"]/following::select)[1]`
    let xpath3 = `(//td[normalize-space(text()) = "${label}"]/following::select)[1]`
    await this.page.locator(`${xpath1} | ${xpath2} | ${xpath3}`).selectOption(option);
  }
}
