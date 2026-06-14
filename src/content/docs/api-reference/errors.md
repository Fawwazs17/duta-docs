---
title: Errors
description: Error codes the Duta API returns and how to fix them.
---

The Duta API uses standard HTTP status codes. Error responses include a message you can show or log.

| Status | Meaning | Common cause and fix |
| ------ | ------- | -------------------- |
| `401` | Authentication failed | Missing or invalid API key. Check the `Authorization: Bearer` header. |
| `402` | Quota exceeded | You hit your plan's monthly send limit. Upgrade in the dashboard. |
| `403` | Permission denied | The sender domain is not verified for your account, or the key lacks the required scope. [Verify the domain](/guides/domain-setup/). |
| `422` | Unprocessable | Invalid sender, or a recipient is on your suppression list. The response lists `blocked` addresses. |
| `429` | Rate limited | Too many requests per second, or the free-plan daily cap. Slow down or upgrade. |
| `500` | Server error | Transient. Retry with backoff; contact support if it persists. |

## Error shape

Most errors return:

```json
{ "error": "Sender domain not verified for this account" }
```

Rate-limit errors return:

```json
{ "statusCode": 429, "name": "rate_limit_exceeded", "message": "Too many requests." }
```

The [TypeScript SDK](/sdks/typescript/) normalises both shapes into a single `DutaError` with a stable `name`, so you can branch on `error.name` reliably.
