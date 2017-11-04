var crypto = require('crypto');
var assert = require('assert');
var lcrypt = require('./index.js')(crypto.randomBytes(32).toString('base64'));

console.log('\t- testing encode and decode.');

assert.ok(lcrypt.decode(lcrypt.encode('hello world!')) === 'hello world!');

console.log('\t- test is ok.\r\n');