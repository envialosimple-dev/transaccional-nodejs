<a href="https://envialosimple.com/transaccional"><img src="https://envialosimple.com/images/logo_tr.svg" width="200px"/></a>

# EnvíaloSimple Transaccional - Node.js SDK

## Requirements

- Node.js 18 or higher
- EnvíaloSimple Transaccional API Key ([Create a demo account for free here](https://envialosimple.com/transaccional))

## Installation (NOT PUBLISHED YET)

```bash
npm install envialosimple-transaccional
```

## Basic Usage

```ts
import { Transaccional, MailParams } from "envialosimple-transaccional";

const estr = Transaccional(your_api_key);
const params = new MailParams();

params
    .setFrom('no-reply@mycompany.com', 'MyCompany Notifications')
    .setTo('john.doe@example.com', 'John Doe')
    .setSubject('This is a test for {{name}}')
    .setHtml('<h1>HTML emails are cool, {{name}}</h1>')
    .setText('Text emails are also cool, {{name}}')
    .setSubstitutions({name: 'John'});


await estr.mail.send(params);
```
