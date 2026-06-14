---
title: Domains
description: How sending domains and suppression work in Duta.
---

A domain is a verified sender identity. You must verify a domain before sending from any address on it.

## Why verification matters

Verification proves you own the domain and sets up DKIM signing, so receiving servers can confirm your mail is authentic. This is what keeps you out of spam folders. See [Verify a domain](/guides/domain-setup/) for the steps.

## Suppression list

When a recipient hard-bounces or files a spam complaint, Duta automatically adds them to your account's suppression list. Future sends to a suppressed address are rejected with `422`, and the response lists the `blocked` addresses.

This protects your sender reputation: repeatedly mailing addresses that bounce or complain is the fastest way to get your domain flagged. Suppression is scoped per account, so one tenant's bounces never affect another's.

## Multiple domains

Your plan determines how many domains you can verify (see [pricing](https://duta.indra.sh/pricing)). Each verified domain can send independently.
