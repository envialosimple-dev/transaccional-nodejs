import { Transaccional } from "../modules/Transaccional.module";
import { MailParams } from "../models/mail/MailParams";
import { Attachment } from "../models/mail/Attachment";

var fs = require('fs');
require("dotenv").config();

test("Basic E-Mail", async () => {
  const estr = new Transaccional(process.env.TEST_API_KEY!);
  const mailParams = new MailParams();

  mailParams
    .setFrom(process.env.TEST_FROM_EMAIL!, process.env.TEST_FROM_NAME!)
    .setTo(process.env.TEST_TO_EMAIL!, process.env.TEST_TO_NAME)
    .setReplyTo(process.env.TEST_REPLY_TO!)
    .setSubject(process.env.TEST_SUBJECT!)
    .setPreviewText(process.env.TEST_PREVIEW_TEXT!)
    .setHtml(`<body>Jest Basic {{sub}}</body>`)
    .setText(`Jest Basic {{sub}}`)
    .setContext({ sub: "substitution" });

  const outcome = await estr.mail.send(mailParams);

  expect(outcome.queued).toBe(true);
});

test("Multiple To E-Mail", async () => {
  const estr = new Transaccional(process.env.TEST_API_KEY!);
  const mailParams = new MailParams();

  mailParams
    .setFrom(process.env.TEST_FROM_EMAIL!, process.env.TEST_FROM_NAME!)
    .setTo([
      {email: process.env.TEST_TO_EMAIL, name: process.env.TEST_TO_NAME},
      {email: process.env.TEST_SECOND_TO_EMAIL, name: process.env.TEST_SECOND_TO_NAME},
      {email: process.env.TEST_THIRD_TO_EMAIL},
    ])
    .setReplyTo(process.env.TEST_REPLY_TO!)
    .setSubject(process.env.TEST_SUBJECT!)
    .setPreviewText(process.env.TEST_PREVIEW_TEXT!)
    .setHtml(`<body>Jest Multiple To {{sub}}</body>`)
    .setText(`Jest Multiple To {{sub}}`)
    .setContext({ sub: "substitution" });

  const outcome = await estr.mail.send(mailParams);

  if(Array.isArray(outcome)){
    expect(outcome[0].queued).toBe(true);
  } else {
    expect(outcome.queued).toBe(true);
  }
});

test("E-Mail with Attachments", async () => {
  const estr = new Transaccional(process.env.TEST_API_KEY!);
  const mailParams = new MailParams();
  const img = fs.readFileSync("./src/tests/logo.png", { encoding: 'base64' });
  const attachment = new Attachment(img, "logo.png", "attachment");
  const attachment_inline = new Attachment(img, "logo.png", "inline", "logo");

  mailParams
    .setFrom(process.env.TEST_FROM_EMAIL!, process.env.TEST_FROM_NAME!)
    .setTo(process.env.TEST_TO_EMAIL!, process.env.TEST_TO_NAME!)
    .setReplyTo(process.env.TEST_REPLY_TO!)
    .setSubject(process.env.TEST_SUBJECT!)
    .setPreviewText(process.env.TEST_PREVIEW_TEXT!)
    .setHtml(`<body><img src="cid:logo"/>Jest Basic {{sub}}</body>`)
    .setText(`Jest Basic {{sub}}`)
    .setContext({ sub: "substitution" })
    .addAttachment(attachment)
    .addAttachment(attachment_inline);

  const outcome = await estr.mail.send(mailParams);

  expect(outcome.queued).toBe(true);
});

export {};
