import * as jwt from 'jsonwebtoken';
const jwksClient = require('jwks-rsa');


interface AuthResult {
    email: string,
    roles: string[],
    error?: string
}

export const getAuthResult = async (token: string): Promise<AuthResult> => {
    const client = jwksClient({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://goaltrails.eu.auth0.com/.well-known/jwks.json'
    });
    const key = await client.getSigningKey('Rzd7NjyYbFaU73hnoJWs7');
    const signingKey = key.getPublicKey();
    let result

    jwt.verify(token, signingKey, (err, verifiedJwt) => {
        if (err) {
            result = { email: "", roles: [], error: err }
        }
        if (verifiedJwt) {
            result = { email: verifiedJwt['https://goaltrails.com/email'], roles: [] }
        }
    });
    return result
}