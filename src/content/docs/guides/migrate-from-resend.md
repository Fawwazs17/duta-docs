---
title: Migrate from Resend to Duta
description: Move your transactional email from Resend to Duta in a few minutes.
---

If you send transactional email with Resend, moving to Duta is quick. You get the same kind of API with MYR pricing and local billing.

## Before you start

1. Sign up at [app.duta.indra.sh](https://app.duta.indra.sh).
2. Verify your sending domain (same DNS idea as Resend). See [Verify a domain](/guides/domain-setup/).
3. Create a Duta API key (`duta_live_...`).

## What carries over

The send call is very close to what you already write. The main rename is `reply_to` to `replyTo`:

```ts
// Resend
await resend.emails.send({
  from: "hello@yourdomain.com",
  to: "user@example.com",
  reply_to: "support@yourdomain.com",
  subject: "Hello",
  html: "<p>Hi</p>",
});

// Duta
await duta.emails.send({
  from: "hello@yourdomain.com",
  to: "user@example.com",
  replyTo: "support@yourdomain.com",
  subject: "Hello",
  html: "<p>Hi</p>",
});
```

Authentication is identical in shape: a bearer token in the `Authorization` header. Only the key format differs (`duta_live_` instead of `re_`).

## Steps

1. Install the SDK: `npm install @duta/sdk`.
2. Swap the import and client for Duta's.
3. Move your API key into `DUTA_API_KEY`.
4. Rename `reply_to` to `replyTo` (and any other snake_case fields).
5. Send one test email to confirm.

## Not yet supported

These Resend features are on the roadmap and not available yet, so check before relying on them:

- `cc` and `bcc`
- Attachments
- Scheduled sending
- Batch send

## Rolling back

Nothing is destructive. If you need to switch back, revert the client and key. Your Resend setup is untouched.
