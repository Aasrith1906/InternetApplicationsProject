

function encryptString(text) {

    var cryptojs = require('crypto-js')
    var ciphertext = cryptojs.SHA3(text, { outputLength: 512 }).toString();
    return ciphertext
}

export { encryptString }