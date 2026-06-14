---
title: API keys
description: How Duta API keys and permissions work.
---

An API key authenticates your requests to the Duta API. Create and revoke keys in the [dashboard](https://app.duta.indra.sh) under **API Keys**.

## Using a key

Pass it as a bearer token:

```
Authorization: Bearer duta_live_xxx
```

Keep keys secret. Store them in environment variables, never in client-side code or version control.

## Permissions

| Permission | Can send | Can read / list |
| ---------- | -------- | --------------- |
| Full access | yes | yes |
| Sending only | yes | no |

A **sending-only** key can call [send](/api-reference/send/) but not [retrieve](/api-reference/get/) or [list](/api-reference/list/). Use sending-only keys in places that only need to send, to limit exposure if a key leaks.

## Rotating keys

If a key is exposed, revoke it in the dashboard and create a new one. Revocation is immediate.
