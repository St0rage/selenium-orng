import { Builder, WebDriver } from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome";

export class Driver {
  private driver: WebDriver;

  constructor() {
    const options = new Options();
    options.addArguments("--start-maximized");
    this.driver = new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();
  }

  public getDriver(): WebDriver {
    return this.driver;
  }
}
