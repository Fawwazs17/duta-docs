---
title: .NET SDK
description: The official Duta.Net package for .NET.
---

The official .NET client. Targets .NET 8.

## Install

```bash
dotnet add package Duta.Net
```

## Usage

```csharp
using Duta;

var duta = new DutaClient("duta_live_xxx");

var result = await duta.Emails.SendAsync(new SendEmailOptions
{
    From = "hello@yourdomain.com",
    To = new[] { "user@example.com" },
    Subject = "Welcome",
    Html = "<p>Thanks for signing up!</p>",
});

Console.WriteLine($"Sent: {result.Id}");
```

## Error handling

Methods throw `DutaException` on failure:

```csharp
try
{
    await duta.Emails.SendAsync(options);
}
catch (DutaException e)
{
    Console.WriteLine($"{e.StatusCode} {e.Name}: {e.Message}");
    // e.Name: authentication_error | permission_denied | rate_limit_exceeded | ...
}
```

## Methods

- `duta.Emails.SendAsync(options)`: [send an email](/api-reference/send/). Returns `SendEmailResult`.
- `duta.Emails.GetAsync(id)`: [retrieve an email](/api-reference/get/). Requires a full-access key.
- `duta.Emails.ListAsync(page, limit)`: [list emails](/api-reference/list/). Requires a full-access key.

Pass your own `HttpClient` to the constructor to reuse a shared instance in long-running apps.

Source: [github.com/indra-sh/duta-dotnet](https://github.com/indra-sh/duta-dotnet).
