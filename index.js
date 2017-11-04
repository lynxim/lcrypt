var crypto = require('crypto');

function LCrypt(key) {
    if (typeof key !== 'string' || key.length === 0) {
        throw new Error('The key is invalid.');
    }
    
    key = new Buffer(key.indexOf('base64:') === 0 ? key.substr(7) : key, 'base64');
    this.method = getCipherMethod(key);
    this.key = key;
}

LCrypt.prototype.encode = function(value) {
    var iv = crypto.randomBytes(16);
    var cipher = crypto.createCipheriv(this.method, this.key, iv);
    var value = cipher.update(value.toString(), 'utf8', 'base64') + cipher.final('base64');
    var mac = hash(iv.toString('base64'), value, this.key);
    var json = new Buffer(JSON.stringify({
        iv: iv.toString('base64'),
        value: value,
        mac: mac.toString('hex')
    }));
    
    return json.toString('base64');
}

LCrypt.prototype.decode = function(payload) {
    payload = getJsonPayload(payload, this.key);
    var decipher = crypto.createDecipheriv(this.method, this.key, new Buffer(payload.iv, 'base64'));
    
    return decipher.update(payload.value, 'base64', 'utf8') + decipher.final('utf8');
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
    var payload = JSON.parse(new Buffer(cipher, 'base64'));
    
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
    var bytes = crypto.randomBytes(16);
    
    return calculateMac(payload, bytes, key).toString('hex') === getHmac(payload.mac, bytes).toString('hex');
}

function calculateMac(payload, bytes, key) {
    return getHmac(hash(payload.iv, payload.value, key).toString('hex'), bytes);
}

function getHmac(data, key) {
    var sha = crypto.createHmac('sha256', key);
    sha.update(data.toString());
    
    return sha.digest();
}

function validPayload(object) {
    return typeof object === 'object' && object.hasOwnProperty('iv') && object.hasOwnProperty('value') && object.hasOwnProperty('mac');
}

function init(key) {
    return new LCrypt(key);
}

module.exports = init;

