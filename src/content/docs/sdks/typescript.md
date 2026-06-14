---
title: TypeScript / JavaScript SDK
description: The official @duta/sdk client.
---

The official SDK for Node.js, Cloudflare Workers, Vercel Edge, Deno, and the browser. Zero dependencies.

## Install

```bash
npm install @duta/sdk
```

## Usage

Create the client once and reuse it:

```ts
// lib/mailer.ts
import { Duta } from "@duta/sdk";

export const duta = new Duta(process.env.DUTA_API_KEY!);
```

```ts
const { data, error } = await duta.emails.send({
  from: "hello@yourdomain.com",
  to: "user@example.com",
  subject: "Welcome",
  html: "<p>Thanks for signing up!</p>",
});
```

## Error handling

Methods never throw on API errors. They return `{ data, error }`, and exactly one is set:

```ts
const { data, error } = await duta.emails.send({ /* ... */ });
if (error) {
  // error.name: authentication_error | permission_denied | rate_limit_exceeded | ...
  console.error(error.statusCode, error.name, error.message);
  return;
}
console.log(data.id);
```

## Methods

- `duta.emails.send(options)`: [send an email](/api-reference/send/)
- `duta.emails.get(id)`: [retrieve an email](/api-reference/get/)
- `duta.emails.list({ page, limit })`: [list emails](/api-reference/list/)
- `verifyWebhook(payload, signature, secret)`: [verify a webhook](/guides/webhooks/)

## Cloudflare Workers

Workers expose env per request, so create the client inside the handler:

```ts
app.post("/welcome", async (c) => {
  const duta = new Duta(c.env.DUTA_API_KEY);
  await duta.emails.send({ /* ... */ });
});
```

Source and full reference: [github.com/Fawwazs17/duta-js](https://github.com/Fawwazs17/duta-js).
