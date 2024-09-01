import { By, until, WebDriver } from "selenium-webdriver";
import { DriverUtil } from "../utils/DriverUtil";

export class LoginPage {
  private driver: WebDriver;
  private driverUtil: DriverUtil;

  constructor(driver: WebDriver, driverUtil: DriverUtil) {
    this.driver = driver;
    this.driverUtil = driverUtil;
  }

  async checkLoginTextExist(): Promise<Boolean> {
    const loginTextElement = By.xpath("//h5[text()='Login']");

    try {
      await this.driver.wait(until.elementLocated(loginTextElement), 5000);

      return true;
    } catch (e) {
      await this.driverUtil.errorHandling(
        this.checkLoginTextExist.name,
        e as Error
      );
      throw e;
    }
  }

  async setUsername(username: string) {
    const usernameInputLocator = By.css("input[name='username']");

    try {
      const usernameInput = await this.driver.wait(
        until.elementLocated(usernameInputLocator),
        5000
      );

      await usernameInput.click();
      await usernameInput.clear();
      await usernameInput.sendKeys(username);
    } catch (e) {
      await this.driverUtil.errorHandling(this.setUsername.name, e as Error);
      throw e;
    }
  }

  async setPassword(password: string) {
    const passwordInputLocator = By.css("input[name='password']");

    try {
      const passwordInput = await this.driver.wait(
        until.elementLocated(passwordInputLocator),
        5000
      );

      await passwordInput.click();
      await passwordInput.clear();
      await passwordInput.sendKeys(password);
    } catch (e) {
      await this.driverUtil.errorHandling(this.setPassword.name, e as Error);
      throw e;
    }
  }

  async clickLogin() {
    const loginButtonLocator = By.css("button[type='submit']");

    try {
      const loginButton = await this.driver.wait(
        until.elementLocated(loginButtonLocator),
        5000
      );

      await loginButton.click();
    } catch (e) {
      await this.driverUtil.errorHandling(this.clickLogin.name, e as Error);
      throw e;
    }
  }

  async checkAlertInvalidCredentialExist(): Promise<boolean> {
    const invalidCredentialTextLocator = By.xpath(
      "//p[text()='Invalid credentials']"
    );

    try {
      await this.driver.wait(
        until.elementLocated(invalidCredentialTextLocator),
        5000
      );

      return true;
    } catch (e) {
      await this.driverUtil.errorHandling(
        this.checkAlertInvalidCredentialExist.name,
        e as Error
      );
      throw e;
    }
  }
}
