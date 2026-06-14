---
title: Receive webhooks
description: Get real-time email events and verify they came from Duta.
---

Webhooks notify your server in real time when an email is delivered, bounced, or complained about.

## Set up an endpoint

1. In the [dashboard](https://app.duta.indra.sh), open **Webhooks** and add your endpoint URL.
2. Choose the events you want.
3. Copy the signing secret (`whsec_...`) shown once on creation. Store it safely.

## Events

| Event | When |
| ----- | ---- |
| `email.delivered` | The recipient's server accepted the message. |
| `email.bounced` | A hard or soft bounce was received. |
| `email.complained` | The recipient marked it as spam. |

## Payload

```json
{
  "type": "email.delivered",
  "data": { "messageId": "ses-message-id", "to": ["user@example.com"] },
  "createdAt": "2026-06-15T00:00:00.000Z"
}
```

## Verify the signature

Every request includes an `X-Duta-Signature` header. Verify it before trusting the payload, using your signing secret. Read the body as raw text before parsing:

```ts
import { verifyWebhook } from "@duta/sdk";

export async function POST(req: Request) {
  const body = await req.text();
  const valid = await verifyWebhook(
    body,
    req.headers.get("x-duta-signature") ?? "",
    process.env.DUTA_WEBHOOK_SECRET!,
  );
  if (!valid) return new Response("Invalid signature", { status: 401 });

  const event = JSON.parse(body);
  // handle event.type
}
```

If you parse the body before verifying, the signature check will fail.
