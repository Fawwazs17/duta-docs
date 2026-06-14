---
title: Python SDK
description: The official duta-sdk package for Python.
---

The official Python client. Zero dependencies, standard library only.

## Install

```bash
pip install duta-sdk
```

## Usage

```python
from duta import Duta

duta = Duta("duta_live_xxx")

result = duta.emails.send({
    "from": "hello@yourdomain.com",
    "to": "user@example.com",
    "subject": "Welcome",
    "html": "<p>Thanks for signing up!</p>",
})
print("Sent:", result["id"])
```

## Error handling

Methods raise `DutaError` on failure:

```python
from duta import Duta, DutaError

try:
    duta.emails.send({ "from": "...", "to": "...", "subject": "Hi", "text": "Hello" })
except DutaError as e:
    print(e.status_code, e.name, e.message)
    # e.name: authentication_error | permission_denied | rate_limit_exceeded | ...
```

## Methods

- `duta.emails.send(params)`: [send an email](/api-reference/send/). `params` keys: `from`, `to` (str or list), `subject`, `html`, `text`, `reply_to`, `tags`.
- `duta.emails.get(email_id)`: [retrieve an email](/api-reference/get/). Requires a full-access key.
- `duta.emails.list(page=1, limit=20)`: [list emails](/api-reference/list/). Requires a full-access key.

Source: [github.com/indra-sh/duta-python](https://github.com/indra-sh/duta-python).
