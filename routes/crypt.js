const crypto = require('crypto');

const hash = (secret) => {
    return crypto.createHmac('sha256', secret).update('Welcome').digest('hex')
}
module.exports = hash;