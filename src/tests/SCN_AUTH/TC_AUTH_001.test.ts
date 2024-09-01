import expect from "expect.js";
import path from "path";
import { WebDriver } from "selenium-webdriver";
import { SCN_AUTH } from "../../test-data/TestDataTypes";
import { Driver } from "../../driver/Driver";
import { AuthFacade } from "../../facades/AuthFacade";
import { DashboardPage } from "../../pages/DashboardPage";
import { LoginPage } from "../../pages/LoginPage";
import { DriverUtil } from "../../utils/DriverUtil";
import { TARS } from "../../utils/Tars";
import { TestDataUtil } from "../../utils/TestDataUtil";
import { CreateReport, Status } from "../../utils/UtilTypes";
import { config } from "../../config/Config";

let driver: WebDriver;
let driverUtil: DriverUtil;
let loginPage: LoginPage;
let dashboardPage: DashboardPage;
let authFacade: AuthFacade;
let tars: TARS;
let testData: SCN_AUTH;
let testCaseName: string = "";

beforeAll(async () => {
  driver = new Driver().getDriver();

  // Load Test Data
  const scenarioName = path.basename(__dirname);
  testCaseName = path.basename(__filename).split(".")[0];

  testData = TestDataUtil.getTestDataByTestCaseName(
    await TestDataUtil.loadTestData<SCN_AUTH>(scenarioName),
    testCaseName
  );

  // Init Tars
  tars = new TARS(config.reportUrl);
  const reportData: CreateReport = {
    project: config.project,
    scenario: testData.scenario,
    test_case: testData.test_case,
    tool: config.tool,
    activity: config.activity,
    author: config.author,
  };

  await tars.createReport(reportData);

  // Init Util
  driverUtil = new DriverUtil(driver, tars);

  // Init POM and Facade
  loginPage = new LoginPage(driver, driverUtil);
  dashboardPage = new DashboardPage(driver, driverUtil);
  authFacade = new AuthFacade(driver, driverUtil);
}, 60000);

afterAll(async () => {
  await driver.quit();
  if (tars) {
    await tars.saveReport();
  }
}, 60000);

/**
 * TEST
 */
test(
  testCaseName,
  async () => {
    await driver.get(config.url);
    await driverUtil.waitUntilPageReady(30000);

    await authFacade.login(testData.username, testData.password);

    expect(await dashboardPage.checkDashboardTextExist()).to.be(true);
    await driverUtil.screenshoot(
      "Expect Login Success",
      "Expected : Memastikan Berhasil Login\nActual : Berhasil Login",
      Status.Passed
    );

    await dashboardPage.clickUserDropdown();
    await dashboardPage.clickLogout();
  },
  60000
);
