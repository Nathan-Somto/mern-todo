import crypto from 'crypto';

function generateRandomSecret(bytes:number){
    return crypto.randomBytes(bytes).toString('hex');
}
console.log(generateRandomSecret(32));