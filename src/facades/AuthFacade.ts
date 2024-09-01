import { WebDriver } from "selenium-webdriver";
import { DashboardPage } from "../pages/DashboardPage";
import { LoginPage } from "../pages/LoginPage";
import { DriverUtil } from "../utils/DriverUtil";
import { Status } from "../utils/UtilTypes";

export class AuthFacade {
  private driver: WebDriver;
  private loginPage: LoginPage;
  private dashboardPage: DashboardPage;
  private driverUtil: DriverUtil;

  constructor(driver: WebDriver, driverUtil: DriverUtil) {
    this.driver = driver;
    this.driverUtil = driverUtil;
    this.loginPage = new LoginPage(this.driver, this.driverUtil);
    this.dashboardPage = new DashboardPage(this.driver, this.driverUtil);
  }

  async login(username: string, password: string) {
    await this.loginPage.setUsername(username);
    await this.driverUtil.screenshoot(
      "Set Username",
      "Expected : Memastikan Berhasil Input Username\nActual : Berhasil Input Username",
      Status.Done,
      1000
    );
    await this.loginPage.setPassword(password);
    await this.driverUtil.screenshoot(
      "Set Password",
      "Expected : Memastikan Berhasil Input Password\nActual : Berhasil Input Password",
      Status.Done
    );
    await this.loginPage.clickLogin();
    await this.driverUtil.screenshoot(
      "Click Login",
      "Expected : Memastikan Berhasil Click Loign\nActual : Berhasil Click Login",
      Status.Done,
      3000
    );
  }

  async logout() {
    await this.dashboardPage.clickUserDropdown();
    await this.driverUtil.screenshoot(
      "Click User Dropdown",
      "Expected : Memastikan Berhasil Click User Dropdown\nActual : Berhasil Click User Dropdown",
      Status.Done,
      1000
    );
    await this.dashboardPage.clickLogout();
    await this.driverUtil.screenshoot(
      "Click Logout",
      "Expected : Memastikan Berhasil Click Logout\nActual : Berhasil Click Logout",
      Status.Done,
      2000
    );
  }
}
