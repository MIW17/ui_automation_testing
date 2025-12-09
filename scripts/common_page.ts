import { test, expect, Page} from '@playwright/test';

export class CommonPage {
  page: Page;
  searchComponentLocator?: string;
  // ta muốn viết hàm search trong page cha (page common)
  // thì khai báo biến searchComponentLocator trong này (id trong element)
  // rồi vào từng page con mình khai báo, ví dụ ở page Products thì có id là keyword thì mình khai báo:
  // this.searchComponentLocator = '#keyword'; (tức là id á)
  // Thì khi page con extends từ page cha → hàm trong page cha sẽ apply id value từ page con 

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
    // thỉnh thoảng nó sẽ bị nhanh quá chưa kịp input nên mình click vào đi rồi hãy input
    let locator = this.page.locator(xpath);
    // hơn nữa, chúng ta nên làm thêm động tác clear (để clear default value)
    await locator.clear();
    await locator.click();
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

  async searchInComponentByValue(input: string) {
    let locator = this.page.locator(this.searchComponentLocator ?? ''); // nếu không có ?? '' thì nó báo lỗi Argument of type 'string | undefined' is not assignable to parameter of type 'string'. Type 'undefined' is not assignable to type 'string'
    await locator.click();
    await locator.clear();
    await locator.fill(input);
    await this.page.keyboard.press("Enter");
  }

  async getInputValueByLabel(label: string) {
    let xpath = `(//label[normalize-space(text())="${label}"]/following::input)[1]`;
    let locator = this.page.locator(xpath);
    let value = await locator.getAttribute("value"); // nhìn locator để biết cần lấy attribute value
    return value // get giá trị thì nhớ return
  }

  getIdFromUrl() {
    let url = this.page.url();
    let id = url.split("/").pop() ?? ''; // pop lấy ra phần tử cuối
    return id;
  }
  
  async getCookieHeader() {
            // Để được author thực hiện request delete thì cần get cookies từ context
        let cookies = await this.page.context().cookies(); // có hai cái là asid và sid. Nó trả về dạng này:
            //   [
            //    { name: "asid", value: "...", domain: "localhost", ... },
            //    { name: "sid", value: "...", domain: "localhost", ... },
            //    { name: "other_cookie", value: "...", domain: "localhost", ... }
            //  ]
        let asid = cookies.find(v => v.name == "asid"); // tìm kiếm trong mảng cookies và gán cho biến asid toàn bộ đối tượng cookie có tên là "asid".
        let sid = cookies.find(v => v.name == "sid");
        let cookieHeader = `sid=${sid?.value}; asid=${asid?.value}`;
        return cookieHeader;
  }
}