import axios, { AxiosError, AxiosInstance } from "axios";
import { CreateReport } from "./UtilTypes";
import FormData from "form-data";

export class TARS {
  private apiClient: AxiosInstance;
  private createReportEndpoint: string;
  private addTestStepEndpoint: string;
  private saveReportEndpoint: string;
  private token: string;

  constructor(baseUrl: string) {
    this.createReportEndpoint = "api/create-report";
    this.addTestStepEndpoint = "api/add-test-step";
    this.saveReportEndpoint = "api/save-report";
    this.token = "";

    this.apiClient = axios.create({
      baseURL: baseUrl,
    });
  }

  async createReport(data: CreateReport) {
    try {
      const response = await this.apiClient.post(
        this.createReportEndpoint,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      this.token = response.data.data.token;
    } catch (e) {
      const error = e as AxiosError;

      this.errorHandling(error);
    }
  }

  async addTestStep(formData: FormData) {
    try {
      await this.apiClient.post(this.addTestStepEndpoint, formData, {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (e) {
      const error = e as AxiosError;

      this.errorHandling(error);
    }
  }

  async saveReport() {
    try {
      await this.apiClient.post(
        this.saveReportEndpoint,
        {},
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (e) {
      const error = e as AxiosError;

      this.errorHandling(error);
    }
  }

  private errorHandling(error: AxiosError) {
    if (error.response) {
      console.log(error.response.data);

      throw error;
    }

    if (error.code === "ECONNREFUSED") {
      throw error;
    }
  }
}
