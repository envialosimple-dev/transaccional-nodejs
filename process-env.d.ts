declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      TEST_API_KEY: string;
      TEST_FROM_EMAIL: string;
      TEST_TO_EMAIL: string;
      TEST_FROM_NAME: string;
      TEST_TO_NAME: string;
      TEST_TEMPLATE_ID: string;
      TEST_INVALID_FROM_EMAIL: string;
      TEST_SUBJECT: string;
      TEST_REPLY_TO: string;
      TEST_PREVIEW_TEXT: string;
    }
  }
}

export {}