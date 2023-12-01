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
    .setSubject(process.env.TEST_SUBJECT!)
    .setHtml(`<body>Jest Basic {{sub}}</body>`)
    .setText(`Jest Basic {{sub}}`)
    .setSubstitutions({ sub: "substitution" });

  const outcome = await estr.mail.send(mailParams);

  expect(outcome.queued).toBe(true);
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
    .setSubject(process.env.TEST_SUBJECT!)
    .setHtml(`<body><img src="cid:logo"/>Jest Basic {{sub}}</body>`)
    .setText(`Jest Basic {{sub}}`)
    .setSubstitutions({ sub: "substitution" })
    .addAttachment(attachment)
    .addAttachment(attachment_inline);

  const outcome = await estr.mail.send(mailParams);

  expect(outcome.queued).toBe(true);
});

export {};
