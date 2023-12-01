import { Attachment } from "./Attachment";

export class MailParams {
  from: string;
  from_name: string;
  to: string;
  to_name: string;
  subject: string;
  text: string;
  html: string;
  attachments?: Attachment[];
  template_id?: string;
  substitutions?: { [key: string]: string | number };
  variables?: { [key: string]: string | number };

  constructor(config?: any) {
    this.from = config?.from;
    this.to = config?.to;
    this.subject = config?.subject;
    this.template_id = config?.templateId;
    this.text = config?.text;
    this.html = config?.html;
    this.attachments = config?.attachments ?? [];
    this.substitutions = config?.substitutions ?? {};
    this.variables = config?.variables ?? {};
  }

  setFrom(from: string, name?: string): MailParams {
    this.from = from;
    if (name !== undefined) this.from_name = name;
    return this;
  }

  setTo(to: string, name?: string): MailParams {
    this.to = to;
    if (name !== undefined) this.to_name = name;
    return this;
  }

  setSubject(subject: string): MailParams {
    this.subject = subject;
    return this;
  }

  setText(text: string): MailParams {
    this.text = text;
    return this;
  }

  setHtml(html: string): MailParams {
    this.html = html;
    return this;
  }

  setAttachments(attachments: Attachment[]): MailParams {
    this.attachments = attachments;
    return this;
  }

  addAttachment(attachment: Attachment): MailParams {
    this.attachments?.push(attachment);
    return this;
  }

  setTemplateID(id: string): MailParams {
    this.template_id = id;
    return this;
  }

  setVariables(variables: { [key: string]: string | number }): MailParams {
    this.variables = variables;
    return this;
  }

  setSubstitutions(substitutions: {
    [key: string]: string | number;
  }): MailParams {
    this.substitutions = substitutions;
    return this;
  }

  toObject(): object {
    let result = {};

    // Pass only email if no name was provided
    if (this.from_name === undefined) {
      result["from"] = this.from;
    } else {
      result["from"] = {
        email: this.from,
        name: this.from_name,
      };
    }

    // Pass only email if no name was provided
    if (this.to_name === undefined) {
      result["to"] = this.to;
    } else {
      result["to"] = {
        email: this.to,
        name: this.to_name,
      };
    }

    // Pass only needed keys
    if (this.template_id !== undefined) {
      result["templateID"] = this.template_id;
    } else {
      if (this.text !== undefined) {
        result["text"] = this.text;
      }
      if (this.html !== undefined) {
        result["html"] = this.html;
      }
    }

    // Add remaining keys
    result["subject"] = this.subject;
    result["substitutions"] = this.substitutions;
    result["variables"] = this.variables;

    // Serialize attachments
    if (this.attachments !== undefined && this.attachments?.length > 0) {
      result["attachments"] = [];

      this.attachments?.forEach((attachment) => {
        result["attachments"].push(attachment.toObject());
      });
    }

    return result;
  }
}
