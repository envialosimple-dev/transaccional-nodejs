import { MailParams } from "../models/mail/MailParams";
import { HttpModule } from "./Http.module";
import { SuccessfulResponse } from "../types/Mail.types";

export class MailModule {
  endpoint="/mail/send";
  http: HttpModule;
  base_url: string;

  constructor(api_key: string, base_url: string) {
    this.base_url = base_url;
    this.http = new HttpModule(api_key);
  }

  async send(params: MailParams): Promise<SuccessfulResponse> {
    const data = params.toObject();
    const response = await this.http.post(this.base_url + this.endpoint, data);

    if (response.status >= 400) {
      switch (response.status) {
        case 429:
          throw new Error('Hourly Limit Reached');
        case 403:
          throw new Error('Make sure API Key is correct and not disabled');
        default:
          throw new Error(`The server responded with code ${response.status}`);
      }
    }

    const success_data: SuccessfulResponse = response.data;

    return success_data;
  }
}
