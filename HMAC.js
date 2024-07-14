const { createHmac, randomBytes } = require('crypto');

class HMACGenerator {
    constructor() {
        this.key = randomBytes(32); 
    }

    generateHMAC(message) {
        const hmac = createHmac('sha3-256', this.key);
        hmac.update(message);
        return hmac.digest('hex');
    }

    getKey() {
        return this.key.toString('hex');
    }
}

module.exports = HMACGenerator;