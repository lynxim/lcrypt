import { randomBytes, createCipheriv, createDecipheriv, createHmac } from 'crypto';

class LCrypt {
    constructor(key) {
        if (typeof key !== 'string' || key.length === 0) {
            throw new Error('The key is invalid.');
        }

        key = Buffer.from(key.indexOf('base64:') === 0 ? key.substring(7) : key, 'base64');
        this.method = getCipherMethod(key);
        this.key = key;
    }

    encode(value) {
        var iv = randomBytes(16);
        var cipher = createCipheriv(this.method, this.key, iv);
        var value = cipher.update(value.toString(), 'utf8', 'base64') + cipher.final('base64');
        var mac = hash(iv.toString('base64'), value, this.key);
        var json = Buffer.from(JSON.stringify({
            iv: iv.toString('base64'),
            value: value,
            mac: mac.toString('hex')
        }));

        return json.toString('base64');
    }
    decode(payload) {
        payload = getJsonPayload(payload, this.key);
        var decipher = createDecipheriv(this.method, this.key, Buffer.from(payload.iv, 'base64'));

        return decipher.update(payload.value, 'base64', 'utf8') + decipher.final('utf8');
    }
}

function getCipherMethod(key) {
    switch (key.length) {
        case 16:
            return 'aes128';
        case 24:
            return 'aes192';
        case 32:
            return 'aes256';
        default:
            throw new Error('The key is invalid');
    }
}

function getJsonPayload(cipher, key) {
    var payload = JSON.parse(Buffer.from(cipher, 'base64'));
    
    if (!validPayload(payload)) {
        throw new Error('The payload is invalid.');
    }
    
    if (!validMac(payload, key)) {
        throw new Error('The MAC is invalid.');
    }
    
    return payload;
}

function hash(iv, value, key) {
    return getHmac(iv + value, key);
}

function validMac(payload, key) {
    var bytes = randomBytes(16);
    
    return calculateMac(payload, bytes, key).toString('hex') === getHmac(payload.mac, bytes).toString('hex');
}

function calculateMac(payload, bytes, key) {
    return getHmac(hash(payload.iv, payload.value, key).toString('hex'), bytes);
}

function getHmac(data, key) {
    var sha = createHmac('sha256', key);
    sha.update(data.toString());
    
    return sha.digest();
}

function validPayload(object) {
    return typeof object === 'object' && object.hasOwnProperty('iv') && object.hasOwnProperty('value') && object.hasOwnProperty('mac');
}

export default LCrypt;