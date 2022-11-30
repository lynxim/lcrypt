import { randomBytes } from 'crypto';
import { ok } from 'assert';
import LCrypt from './index.js';
var lcrypt = new LCrypt(randomBytes(32).toString('base64'));

console.log('- testing encode and decode.');

ok(lcrypt.decode(lcrypt.encode('hello world!')) === 'hello world!');

console.log('- test is ok.');