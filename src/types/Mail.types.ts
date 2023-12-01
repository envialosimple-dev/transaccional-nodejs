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

export type MailParamsObject = {
  from?: string | { email: string; name: string };
  to?: string | { email: string; name: string };
  subject?: string;
  text?: string;
  html?: string;
  attachments?: AttachmentObject[];
  templateID?: string;
  substitutions?: { [key: string]: string | number };
  variables?: { [key: string]: string | number };
};
