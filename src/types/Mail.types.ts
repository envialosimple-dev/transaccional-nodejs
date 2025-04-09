export type SuccessfulResponse = {
  queued: boolean;
  id: string;
};

export type AttachmentObject = {
  id?: string;
  content: string;
  disposition: "attachment" | "inline";
  filename: string;
};

export type Recipient = {
  email: string;
  name?: string;
}

export type MailParamsObject = {
  from?: string | { email: string; name: string };
  to?: string | Recipient | Array<Recipient>;
  reply_to?: string;
  subject?: string;
  preview_text?: string;
  text?: string;
  html?: string;
  attachments?: AttachmentObject[];
  templateID?: string;
  context?: object;
  variables?: { [key: string]: string | number };
};
