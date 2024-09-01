import fs from "fs/promises";
import path from "path";
import { TestCase } from "../test-data/TestDataTypes";

export class TestDataUtil {
  static async loadTestData<T>(scenarioName: string): Promise<T[]> {
    const testDataPath = path.join(
      __dirname,
      "..",
      "test-data",
      `${scenarioName}.json`
    );

    try {
      const data = await fs.readFile(testDataPath, "utf-8");
      const jsonData: T[] = JSON.parse(data);
      return jsonData;
    } catch (e) {
      console.info("FAILED TO LOAD TEST DATA");
      throw e;
    }
  }

  static getTestDataByTestCaseName<T extends TestCase>(
    testData: T[],
    testCaseName: string
  ): T {
    const data = testData.find((value) => value.test_case === testCaseName);

    if (!data) {
      throw new Error("NO SUCH TEST DATA WITH TEST CASE " + testCaseName);
    }

    return data;
  }
}
