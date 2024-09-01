import FormData from "form-data";
import fs from "fs";
import path from "path";
import { WebDriver } from "selenium-webdriver";
import { TARS } from "./Tars";
import { Status } from "./UtilTypes";

export class DriverUtil {
  private driver: WebDriver;
  private tars: TARS;

  constructor(driver: WebDriver, tars: TARS) {
    this.driver = driver;
    this.tars = tars;
  }

  async screenshoot(
    title: string,
    description: string,
    result: Status,
    timeoutMs?: number
  ) {
    let screenshoot;

    if (timeoutMs) {
      await this.delay(timeoutMs);
    }

    screenshoot = await this.driver.takeScreenshot();

    const fileName = Date.now().toString() + ".png";

    fs.writeFileSync(
      path.join(__dirname, "..", "..", "screenshoot", fileName),
      screenshoot,
      "base64"
    );

    const formData = new FormData();

    formData.append(
      "image",
      fs.createReadStream(
        path.join(__dirname, "..", "..", "screenshoot", fileName)
      )
    );
    formData.append("title", title);
    formData.append("description", description);
    formData.append("result", result);

    await this.tars.addTestStep(formData);
  }

  async errorHandling(title: string, e: Error): Promise<void> {
    await this.screenshoot(title, e.message, Status.Failed, 1000);
  }

  async delay(timeoutMs: number) {
    await new Promise((resolve) => setTimeout(resolve, timeoutMs));
  }

  async waitUntilPageReady(timeoutMs: number) {
    await this.driver.wait(async () => {
      const readyState = await this.driver.executeScript(
        "return document.readyState"
      );
      return readyState === "complete";
    }, timeoutMs);
  }
}
