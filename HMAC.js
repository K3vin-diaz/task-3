const { sha3_256 } = require('js-sha3');
const crypto = require('crypto');

class HMACGenerator {
    constructor() {
        this.key = crypto.randomBytes(32); 
    }

    generateHMAC(message) {
        return sha3_256(message);
    }

    getKey() {
        return this.key.toString('hex');
    }
}

module.exports = HMACGenerator;