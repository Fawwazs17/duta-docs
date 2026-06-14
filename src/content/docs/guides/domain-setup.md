---
title: Verify a domain
description: Add and verify a sending domain so Duta can send on your behalf.
---

You can only send from a domain you own and have verified. Verification proves ownership and sets up DKIM so your mail is signed and lands in inboxes.

## Steps

1. In the [dashboard](https://app.duta.indra.sh), open **Domains** and click **Add domain**.
2. Enter your domain, for example `yourdomain.com`.
3. Duta shows a set of DNS records (DKIM, and a custom MAIL FROM record).
4. Add those records at your DNS provider (Cloudflare, Namecheap, etc.).
5. Back in the dashboard, wait for the status to turn **verified**. DNS can take a few minutes to propagate.

## Sending

Once verified, send from any address on that domain:

```ts
await duta.emails.send({
  from: "hello@yourdomain.com",
  to: "user@example.com",
  subject: "Hello",
  text: "It works.",
});
```

If you try to send from an unverified domain, the API returns `403`. See [Errors](/api-reference/errors/).

## Custom MAIL FROM

Duta sets up a custom MAIL FROM subdomain (for example `mail.yourdomain.com`). This improves SPF alignment and brands the "mailed-by" line that Gmail shows. It is configured automatically as part of domain onboarding.
