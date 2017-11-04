const crypto = require('crypto');
const lcrypt = require('./index.js')('J92xtBr1tuLJV3mOFzMytJg4SDW0nirSAqMr7ZPGA4s=');

let cipherText = lcrypt.encode('some text.');

console.log(cipherText);
console.log(lcrypt.decode('eyJpdiI6IldJZG9CYnhaYVhSN1JXVGVvL05zT3c9PSIsInZhbHVlIjoiSWwvVGdScFRZRm1KNTVnZnZEamg1Zz09IiwibWFjIjoiY2MzOTFhZmRhMTYxN2E4YWUzNDFhZTEwZGEzYTZlZjkwNzU3MDk0ZGIyODUzNjI1NjA5YjA5MDZkMjU3MWY4YSJ9'));