---
title: Retrieve an email
description: GET /v1/email/:id
---

Fetch a single email by its ID.

```
GET https://api.duta.indra.sh/v1/email/:id
```

Requires a **full-access** API key (a sending-only key cannot read email).

## Example

```bash
curl https://api.duta.indra.sh/v1/email/3f6c1a2b-... \
  -H "Authorization: Bearer duta_live_xxx"
```

```ts
const { data } = await duta.emails.get("3f6c1a2b-...");
```

## Response

`200 OK`

```json
{
  "id": "3f6c1a2b-...",
  "to": ["you@example.com"],
  "from": "hello@yourdomain.com",
  "subject": "Hello from Duta",
  "html": "<p>It works!</p>",
  "text": null,
  "status": "delivered",
  "tags": { "order_id": "1234" },
  "createdAt": "2026-06-15T00:00:00.000Z",
  "updatedAt": "2026-06-15T00:00:02.000Z"
}
```

`status` is one of `queued`, `sent`, `delivered`, `bounced`, `complained`, or `failed`.
