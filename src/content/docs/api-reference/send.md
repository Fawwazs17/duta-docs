---
title: Send an email
description: POST /v1/email/send
---

Send a transactional email.

```
POST https://api.duta.indra.sh/v1/email/send
```

## Authentication

Pass your API key as a bearer token:

```
Authorization: Bearer duta_live_xxx
```

## Body

| Field     | Type                       | Required | Description                                  |
| --------- | -------------------------- | -------- | -------------------------------------------- |
| `from`    | `string`                   | yes      | Sender address. Its domain must be verified. |
| `to`      | `string` or `string[]`     | yes      | One recipient, or up to many.                |
| `subject` | `string`                   | yes      | Subject line.                                |
| `html`    | `string`                   | one of   | HTML body.                                   |
| `text`    | `string`                   | one of   | Plain-text body.                             |
| `replyTo` | `string`                   | no       | Reply-To address.                            |
| `tags`    | `Record<string, string>`   | no       | Arbitrary key/value metadata.                |

At least one of `html` or `text` is required.

## Example

```bash
curl -X POST https://api.duta.indra.sh/v1/email/send \
  -H "Authorization: Bearer duta_live_xxx" \
  -H "Content-Type: application/json" \
  -d '{
    "from": "hello@yourdomain.com",
    "to": ["a@example.com", "b@example.com"],
    "subject": "Your receipt",
    "html": "<p>Thanks for your order.</p>",
    "tags": { "order_id": "1234" }
  }'
```

```ts
await duta.emails.send({
  from: "hello@yourdomain.com",
  to: ["a@example.com", "b@example.com"],
  subject: "Your receipt",
  html: "<p>Thanks for your order.</p>",
  tags: { order_id: "1234" },
});
```

## Response

`202 Accepted`

```json
{ "id": "3f6c1a2b-...", "status": "queued" }
```

Use the `id` to [retrieve the email](/api-reference/get/) later. Errors are documented under [Errors](/api-reference/errors/).
