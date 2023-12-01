import { AttachmentObject } from "../../types/Mail.types";

export class Attachment {
  content: string;
  filename: string;
  disposition: "attachment" | "inline";
  id?: string;

  constructor(
    content: string,
    filename: string,
    disposition: "attachment" | "inline",
    id?: string
  ) {
    this.content = content;
    this.filename = filename;
    this.disposition = disposition;
    this.id = id;
  }

  toObject(): AttachmentObject {
    return {
      content: this.content,
      filename: this.filename,
      disposition: this.disposition,
      id: this.id,
    };
  }
}
