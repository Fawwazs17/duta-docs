---
title: Quickstart
description: Send your first email with Duta in five minutes.
---

This guide takes you from zero to a sent email in about five minutes.

## 1. Get an API key

Sign in to the [dashboard](https://app.duta.indra.sh), open **API Keys**, and create one. It looks like `duta_live_xxx`. Keep it secret.

## 2. Verify a sending domain

Email must be sent from a domain you own and have verified. In the dashboard, open **Domains**, add your domain, and follow the DNS steps. See [Verify a domain](/guides/domain-setup/) for detail.

You cannot send from an unverified domain.

## 3. Send an email

Using the SDK:

```ts
import { Duta } from "@duta/sdk";

const duta = new Duta("duta_live_xxx");

const { data, error } = await duta.emails.send({
  from: "hello@yourdomain.com",
  to: "you@example.com",
  subject: "Hello from Duta",
  html: "<p>It works!</p>",
});

if (error) console.error(error.message);
else console.log("Sent:", data.id);
```

Or with plain HTTP:

```bash
curl -X POST https://api.duta.indra.sh/v1/email/send \
  -H "Authorization: Bearer duta_live_xxx" \
  -H "Content-Type: application/json" \
  -d '{
    "from": "hello@yourdomain.com",
    "to": "you@example.com",
    "subject": "Hello from Duta",
    "html": "<p>It works!</p>"
  }'
```

A successful send returns an `id` and a `status` of `queued`:

```json
{ "id": "3f6c...", "status": "queued" }
```

## 4. Track it

Watch delivery in the dashboard under **Emails**, or [receive webhooks](/guides/webhooks/) for real-time `delivered`, `bounced`, and `complained` events.

## Next steps

- [Install the SDK](/sdks/typescript/)
- [Full API reference](/api-reference/send/)
- [Migrate from Resend](/guides/migrate-from-resend/)
