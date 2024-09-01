import { By, until, WebDriver } from "selenium-webdriver";
import { DriverUtil } from "../utils/DriverUtil";

export class DashboardPage {
  private driver: WebDriver;
  private driverUtil: DriverUtil;

  constructor(driver: WebDriver, driverUtil: DriverUtil) {
    this.driver = driver;
    this.driverUtil = driverUtil;
  }

  async checkDashboardTextExist(): Promise<boolean> {
    const dashboardTextElement = By.xpath("//h6[text()='Dashboard']");

    try {
      await this.driver.wait(until.elementLocated(dashboardTextElement), 5000);

      return true;
    } catch (e) {
      await this.driverUtil.errorHandling(
        this.checkDashboardTextExist.name,
        e as Error
      );
      throw e;
    }
  }

  async clickUserDropdown() {
    const userDropdownLocator = By.className("oxd-userdropdown");

    try {
      const userDropdown = await this.driver.wait(
        until.elementLocated(userDropdownLocator),
        5000
      );

      await userDropdown.click();
    } catch (e) {
      await this.driverUtil.errorHandling(
        this.clickUserDropdown.name,
        e as Error
      );
      throw e;
    }
  }

  async clickLogout() {
    const logoutElementLocator = By.xpath("//li/a[text()='Logout']");

    try {
      const logoutElement = await this.driver.wait(
        until.elementLocated(logoutElementLocator),
        5000
      );

      await logoutElement.click();
    } catch (e) {
      await this.driverUtil.errorHandling(this.clickLogout.name, e as Error);
      throw e;
    }
  }
}
