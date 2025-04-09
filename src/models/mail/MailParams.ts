import { MailParamsObject, Recipient } from "../../types/Mail.types";
import { Attachment } from "./Attachment";

export class MailParams {
  from: string;
  from_name?: string;
  to: string|Array<Recipient>;
  to_name?: string;
  reply_to?: string;
  subject?: string;
  preview_text?: string;
  text: string;
  html: string;
  attachments?: Attachment[];
  template_id?: string;
  substitutions?: { [key: string]: string | number };
  context?: object;
  variables?: { [key: string]: string | number };

  constructor(config?: any) {
    this.from = config?.from;
    this.from_name = config?.from_name;
    this.to = config?.to;
    this.to_name = config?.to_name;
    this.reply_to = config?.reply_to
    this.subject = config?.subject;
    this.preview_text = config?.preview_text;
    this.template_id = config?.templateId;
    this.text = config?.text;
    this.html = config?.html;
    this.attachments = config?.attachments ?? [];
    this.substitutions = config?.substitutions ?? {};
    this.context = config?.context ?? {};
    this.variables = config?.variables ?? {};
  }

  setFrom(from: string, name?: string): MailParams {
    this.from = from;
    if (name !== undefined) this.from_name = name;
    return this;
  }

  setTo(to: string|Array<Recipient>, name?: string): MailParams {
    this.to = to;
    if (name !== undefined) this.to_name = name;
    return this;
  }

  setReplyTo(reply_to: string): MailParams {
    this.reply_to = reply_to;
    return this;
  }

  setSubject(subject: string): MailParams {
    this.subject = subject;
    return this;
  }

  setPreviewText(preview_text: string): MailParams {
    this.preview_text = preview_text;
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
    console.warn('Warning: The setSubstitutions() is deprecated ' + 
                 'and will be removed in a future release. ' + 
                 'Please use setContext() instead.');
    this.substitutions = substitutions;
    return this;
  }

  setContext(context: object) {
    this.context = context;
    return this;
  }

  isScalar(variable: any) {
    const scalarTypes = ['boolean', 'string', 'number'];
    return scalarTypes.includes(typeof variable);
  }

  toObject(): MailParamsObject {
    let result: MailParamsObject = {};

    if (this.to === undefined) {
      throw new Error('Email address "To" must be set');
    }

    if (this.template_id === undefined) {
      if (this.from === undefined) {
        throw new Error('Email address "From" must be set');
      }

      if (this.subject === undefined) {
        throw new Error("Subject must be set");
      }  
    }

    if (this.substitutions !== undefined) {
      Object.entries(this.substitutions).forEach(([_, value]) => {
        if (!this.isScalar(value)) {
          throw new Error('Substitutions can only be scalar values');
        }
      });

      // Copy substitutions to context if necessary
      if (this.context !== undefined) {
        if (Object.entries(this.substitutions).length > 0 &&
            Object.entries(this.context).length === 0) {
          this.context = this.substitutions;
        }
      }
    }
    
    // Pass only email if no name was provided
    if (this.from_name === undefined) {
      result.from = this.from;
    } else {
      result.from = {
        email: this.from,
        name: this.from_name,
      };
    }

    // Pass only email if no name was provided
    if (this.to_name === undefined || Array.isArray(this.to)) {
      result.to = this.to;
    } else {
      result.to = {
        email: this.to,
        name: this.to_name,
      };
    }

    if (this.preview_text !== undefined) {
      result.preview_text = this.preview_text;
    }

    if (this.reply_to !== undefined) {
      result.reply_to = this.reply_to;
    }

    // Pass only needed keys
    if (this.template_id !== undefined) {
      result.templateID = this.template_id;
    } else {
      if (this.text !== undefined) {
        result.text = this.text;
      }
      if (this.html !== undefined) {
        result.html = this.html;
      }
    }

    // Add remaining keys
    result.subject = this.subject;
    result.context = this.context;
    result.variables = this.variables;

    // Serialize attachments
    if (this.attachments !== undefined && this.attachments?.length > 0) {
      result.attachments = [];

      this.attachments?.forEach((attachment) => {
        result.attachments?.push(attachment.toObject());
      });
    }

    return result;
  }
}
