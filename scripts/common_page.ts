import { test, expect, Page} from '@playwright/test';

export class CommonPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickMenuByLabel(label: string) {
        // let xpath = `//a[normalize-space(text())='${label}']`;
        // Đối với menu, hoặc khi mình muốn test ấn vào một khu vực nào đó, thì nên chỉ định thêm rõ area của nó
        let xpath = `//div[contains(concat(' ',normalize-space(@class),' '),' admin-nav ')]//a[normalize-space(text())='${label}']`;
        await this.page.locator(xpath).click();
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

  async selectRadioButtonByLable(label: string, option: string) {
    let xpath = `(//label[normalize-space()="${label}"]/following::label[.//span[normalize-space(text())="${option}"] and .//input[@type = "radio"]])[1]`;
    await this.page.locator(xpath).click();
  }

  async clickButtonByLable(label: string) {
    // Khi muốn bắt text của một properties có nhiều thẻ con
    // 
    let xpath = `//button[normalize-space(.) = "${label}"]`;
    await this.page.locator(xpath).click();
  }
  
  // Pop up message theo kinh nghiệm sẽ đưa vào page common:
  async verifyPopUpMessage(message: string) {
    let xpath = `//div[@role="alert" and normalize-space(text())="${message}"]`;
    await expect(this.page.locator(xpath)).toBeVisible();
  }
}
