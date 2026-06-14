---
title: PHP SDK
description: The official duta/duta-php package.
---

The official PHP client. Uses cURL, no third-party dependencies.

## Install

```bash
composer require duta/duta-php
```

## Usage

```php
require 'vendor/autoload.php';

$duta = new \Duta\Client('duta_live_xxx');

$result = $duta->emails->send([
    'from' => 'hello@yourdomain.com',
    'to' => 'user@example.com',
    'subject' => 'Welcome',
    'html' => '<p>Thanks for signing up!</p>',
]);

echo "Sent: " . $result['id'];
```

## Error handling

Methods throw `\Duta\DutaException` on failure:

```php
use Duta\DutaException;

try {
    $duta->emails->send([ /* ... */ ]);
} catch (DutaException $e) {
    echo $e->statusCode . ' ' . $e->name . ': ' . $e->getMessage();
    // $e->name: authentication_error | permission_denied | rate_limit_exceeded | ...
}
```

## Methods

- `$duta->emails->send($params)`: [send an email](/api-reference/send/). Keys: `from`, `to` (string or array), `subject`, `html`, `text`, `reply_to`, `tags`.
- `$duta->emails->get($id)`: [retrieve an email](/api-reference/get/). Requires a full-access key.
- `$duta->emails->list($page = 1, $limit = 20)`: [list emails](/api-reference/list/). Requires a full-access key.

Package: [packagist.org/packages/duta/duta-php](https://packagist.org/packages/duta/duta-php) · Source: [github.com/indra-sh/duta-php](https://github.com/indra-sh/duta-php).
