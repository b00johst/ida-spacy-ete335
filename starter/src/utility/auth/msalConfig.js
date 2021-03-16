export const msalConfig = {
    auth: {
        // clientId for appRegistration in Azure AD.        
        // ida-spacy-test-ar (in production): 'c6b6983e-0fcd-4337-82e8-5b7391841773'
        clientId: 'c6b6983e-0fcd-4337-82e8-5b7391841773',//ida-spacy-test-ar (in production),                     
        // 913f18ec-7f26-4c5f-a816-784fe9a58edd is the tenantId for liuonline.onmicrosoft.com
        authority: 'https://login.microsoftonline.com/913f18ec-7f26-4c5f-a816-784fe9a58edd',
        redirectUri: 'https://happy-glacier-0ed436203.azurestaticapps.net',
    },
    cache: {
        cacheLocation: "localStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    }
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
    scopes: ["openid", "profile", "User.Read","https://liuonline.onmicrosoft.com/ida-spacy-progress-api-test-ar/user_impersonation"],
    forceRefresh: false // Set this to "true" to skip a cached token and go to the server to get a new token
};
 
// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const apiRequest = {
    scopes: ["User.Read"],
    forceRefresh: false // Set this to "true" to skip a cached token and go to the server to get a new token
};

export const idaSpacyProgressApiRequest = {
    scopes: ["https://liuonline.onmicrosoft.com/ida-spacy-progress-api-test-ar/user_impersonation"],
    forceRefresh: false // Set this to "true" to skip a cached token and go to the server to get a new token
};