---
title: List emails
description: GET /v1/email
---

List emails, most recent first.

```
GET https://api.duta.indra.sh/v1/email?page=1&limit=20
```

Requires a **full-access** API key.

## Query parameters

| Param   | Type     | Default | Description                |
| ------- | -------- | ------- | -------------------------- |
| `page`  | `number` | `1`     | Page number, starts at 1.  |
| `limit` | `number` | `20`    | Results per page, max 100. |

## Example

```bash
curl "https://api.duta.indra.sh/v1/email?page=1&limit=20" \
  -H "Authorization: Bearer duta_live_xxx"
```

```ts
const { data } = await duta.emails.list({ page: 1, limit: 20 });
```

## Response

`200 OK`

```json
{
  "emails": [
    { "id": "3f6c...", "subject": "Hello", "status": "delivered", "to": ["you@example.com"] }
  ],
  "page": 1,
  "limit": 20
}
```
