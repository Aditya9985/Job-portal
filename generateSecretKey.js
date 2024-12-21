const crypto = require('crypto');

// Generate a random 256-bit (32-byte) secret key
const secretKey = crypto.randomBytes(32).toString('hex');

console.log('JWT Secret Key:', secretKey);
