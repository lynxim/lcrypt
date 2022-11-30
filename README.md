# lcrypt
Laravel encryption and decryption algorithm implemented in Nodejs.

## Install

```shell
npm install lcrypt
```

## Example

### NodeJS code

```javascript
import LCrypt from 'lcrypt';

// LCrypt expects a 16bits, 24bits or 32bits base64 string to be used as key.
const lcrypt = new LCrypt('J92xtBr1tuLJV3mOFzMytJg4SDW0nirSAqMr7ZPGA4s=');

let cipherText = lcrypt.encode('hello world!');

console.log(cipherText);
console.log(lcrypt.decode(cipherText));
```

*Output*

```text
eyJpdiI6ImRZdkxHRW1JZXdEVXJkdHB5dzloVUE9PSIsInZhbHVlIjoiOExpQTZYZFpkcG54VzZQVEtBbVdWQT09IiwibWFjIjoiODhmMTY2OTU2YWYyYzllNjVhNDNiOTUxZWU5ZTQ0OTU3ZjU2ZGYxOGEzOTI1YWJmOTJlNDQ5YjFjOTk0ZTlmZSJ9
hello world!
```

## For Laravel

Laravel .env file

```text
APP_KEY=base64:J92xtBr1tuLJV3mOFzMytJg4SDW0nirSAqMr7ZPGA4s=
```

### Laravel code

```php
<?php
use Illuminate\Support\Facades\Crypt;

echo Crypt::encryptString('some text.');
```

*Output*

```text
eyJpdiI6IldJZG9CYnhaYVhSN1JXVGVvL05zT3c9PSIsInZhbHVlIjoiSWwvVGdScFRZRm1KNTVnZnZEamg1Zz09IiwibWFjIjoiY2MzOTFhZmRhMTYxN2E4YWUzNDFhZTEwZGEzYTZlZjkwNzU3MDk0ZGIyODUzNjI1NjA5YjA5MDZkMjU3MWY4YSJ9
```

### NodeJS code

```javascript
import LCrypt from 'lcrypt';
const lcrypt = new LCrypt('J92xtBr1tuLJV3mOFzMytJg4SDW0nirSAqMr7ZPGA4s=');

console.log(lcrypt.decode('eyJpdiI6IldJZG9CYnhaYVhSN1JXVGVvL05zT3c9PSIsInZhbHVlIjoiSWwvVGdScFRZRm1KNTVnZnZEamg1Zz09IiwibWFjIjoiY2MzOTFhZmRhMTYxN2E4YWUzNDFhZTEwZGEzYTZlZjkwNzU3MDk0ZGIyODUzNjI1NjA5YjA5MDZkMjU3MWY4YSJ9'));
```

*Output*

```text
some text.
```

## Generate key

### NodeJS code

```javascript
const crypto = require('crypto');
console.log(crypto.randomBytes(32).toString('base64'));
```

*Output*

```text
ZvIfqyE25SXztlLf5iPrWTQt+6L18nVt3Gxh1XUJKYI=
```
