import { MailModule } from "./Mail.module";

export class Transaccional {
  private readonly api_key: string;
  private baseUrl: string = "https://api.envialosimple.email/api/v1";
  mail: MailModule;
  
  constructor(api_key: string) {
    this.api_key = api_key;
    this.mail = new MailModule(this.api_key, this.baseUrl);
  }
}

