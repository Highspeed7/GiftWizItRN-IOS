export var config = {
    issuer: 'https://giftwizit.b2clogin.com/b4d3aec8-2794-4abb-8517-a30636599371/v2.0',
    clientId: 'b4d3aec8-2794-4abb-8517-a30636599371',
    redirectUrl: 'giftwi://GetStarted',
    additionalParameters: {
        prompt: 'login'
    },
    scopes: ["https://giftwizit.onmicrosoft.com/api/read", "https://giftwizit.onmicrosoft.com/api/user_impersonation", "offline_access"],
    serviceConfiguration: {
        authorizationEndpoint: 'https://giftwizit.b2clogin.com/giftwizit.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_SigninSignup',
        tokenEndpoint: 'https://giftwizit.b2clogin.com/giftwizit.onmicrosoft.com/oauth2/v2.0/token?p=B2C_1_SigninSignup1',
        revocationEndpoint: 'https://giftwizit.b2clogin.com/giftwizit.onmicrosoft.com/oauth2/v2.0/logout?p=B2C_1_SigninSignup1'
    }
}