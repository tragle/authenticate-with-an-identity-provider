import * as msal from '@azure/msal-browser';

const CLIENT_ID = process.env.CLIENT_ID;
const REDIRECT_URI = process.env.REDIRECT_URI;
const SERVER_URI = process.env.SERVER_URI;
const AUTHORITY = process.env.AUTHORITY;
const KNOWN_AUTHORITY = process.env.KNOWN_AUTHORITY;  
const SCOPE = process.env.SCOPE;

const msalConfig = {
  auth: {
    clientId: CLIENT_ID,
    redirectUri: REDIRECT_URI,
    authority: AUTHORITY,
    knownAuthorities: [KNOWN_AUTHORITY],
  }
};

console.log(JSON.stringify(msalConfig));

const msalInstance = new msal.PublicClientApplication(msalConfig);

const request = {
  scopes: [SCOPE],
};

console.log(JSON.stringify(request));

msalInstance.handleRedirectPromise().then(async (token) => {
  if (!token) {
    console.log('acquiring token via redirect');
    msalInstance.acquireTokenRedirect(request);
  }
  if (token) {
    console.log('got token', token);
    const resp = await fetch(SERVER_URI, { method: 'POST', body: token.accessToken });
    const body = await resp.json();
    console.log('got api response', body);
  }
});
