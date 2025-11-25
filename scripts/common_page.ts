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
}
