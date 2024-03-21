export interface Token {
    header: {
        alg: string,
        typ: string,
    },
    payload: {
        jti: string,//jsonTokenIdentifier
        iss: string,//issuer
        iat: string,//issuedAt
        nbf: string,//notBefore (Não Antes)
        exp: string,//expiration
        sub: string,//Subject
        aud: string,//Audience
    },
    signature: string,
}

export interface Header {
    alg: string,
    typ: string,
}

export interface Payload {
    jti: string,//jsonTokenIdentifier
    iss: string,//issuer
    iat: string,//issuedAt
    nbf: string,//notBefore (Não Antes)
    exp: string,//expiration
    sub: string,//Subject
    aud: string,//Audience
}