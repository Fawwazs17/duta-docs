---
title: Migrate from Resend to Duta
description: Move your transactional email from Resend to Duta, often by changing a single line.
---

If you send transactional email with Resend, moving to Duta is quick. You get the same kind of API, with MYR pricing and local billing. There are two ways to migrate: keep your Resend code and point it at Duta, or switch to the Duta SDK.

## Before you start

1. Sign up at [app.duta.indra.sh](https://app.duta.indra.sh).
2. Verify your sending domain (same DNS idea as Resend). See [Verify a domain](/guides/domain-setup/).
3. Create a Duta API key (`duta_live_...`).

## Fastest path: point Resend at Duta (no code rewrite)

Duta exposes a Resend-compatible endpoint at `POST https://api.duta.indra.sh/emails`. The official Resend SDK lets you override the base URL, so you can keep all of your existing `resend.emails.send(...)` calls and just change two things: the base URL and the API key.

```ts
import { Resend } from "resend";

// Before
// const resend = new Resend("re_xxx");

// After: same SDK, pointed at Duta
const resend = new Resend("duta_live_xxx", {
  baseUrl: "https://api.duta.indra.sh",
});

// Your existing code keeps working unchanged
await resend.emails.send({
  from: "hello@yourdomain.com",
  to: "user@example.com",
  reply_to: "support@yourdomain.com",
  subject: "Hello",
  html: "<p>Hi</p>",
});
```

Or set it with an environment variable, with no code change at all:

```bash
RESEND_BASE_URL=https://api.duta.indra.sh
RESEND_API_KEY=duta_live_xxx
```

Not using the Resend SDK? The endpoint is plain HTTP, so any language works. Just change the host:

```bash
curl -X POST https://api.duta.indra.sh/emails \
  -H "Authorization: Bearer duta_live_xxx" \
  -H "Content-Type: application/json" \
  -d '{
    "from": "hello@yourdomain.com",
    "to": "user@example.com",
    "reply_to": "support@yourdomain.com",
    "subject": "Hello",
    "html": "<p>Hi</p>"
  }'
```

Duta accepts the Resend payload (including `reply_to` and `tags`), returns `{ "id": "..." }` on success, and uses the same `Authorization: Bearer` header. Only the key format differs (`duta_live_` instead of `re_`).

## Alternative: switch to the Duta SDK

If you would rather fully adopt Duta, install [`@duta/sdk`](/sdks/typescript/). It is a typed client with normalised error handling. The send call is almost identical; the main rename is `reply_to` to `replyTo`:

```ts
import { Duta } from "@duta/sdk";

const duta = new Duta("duta_live_xxx");

await duta.emails.send({
  from: "hello@yourdomain.com",
  to: "user@example.com",
  replyTo: "support@yourdomain.com",
  subject: "Hello",
  html: "<p>Hi</p>",
});
```

Steps:

1. Install the SDK: `npm install @duta/sdk` (or the [Python, PHP, .NET](/sdks/typescript/) equivalents).
2. Swap the import and client for Duta's.
3. Move your API key into `DUTA_API_KEY`.
4. Rename `reply_to` to `replyTo` (and any other snake_case fields).
5. Send one test email to confirm.

## Not yet supported

Whichever path you choose, these Resend features are on the roadmap and not available yet. The `/emails` endpoint returns a clear error if you send them, so nothing is ever silently dropped:

- `cc` and `bcc`
- Attachments
- Scheduled sending
- Batch send

Check that your sends do not rely on these before switching production traffic.

## Rolling back

Nothing is destructive. To switch back, revert the base URL and key to Resend's. Your Resend account and setup are untouched.
