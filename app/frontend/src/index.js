import * as msal from '@azure/msal-browser';

let idClaims;
let accessToken;
let count;

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

const msalInstance = new msal.PublicClientApplication(msalConfig);

const request = {
  scopes: [SCOPE],
};

msalInstance.handleRedirectPromise().then(async (tokenResult) => {
  if (!tokenResult) {
    console.log('acquiring token via redirect');
    msalInstance.acquireTokenRedirect(request);
  }
  if (tokenResult) {
    console.log('got token(s)', tokenResult);
    accessToken = tokenResult.accessToken;
    idClaims = tokenResult.idTokenClaims;
  }
});

function updateElement(id, text) {
  const el = document.getElementById(id);
  el.innerHTML = text; 
}

function hideElement(id) { 
  const el = document.getElementByid(id);
  el.style.display = 'none';
}

function showElement(id) { 
  const el = document.getElementByid(id);
  el.style.display = 'none';
}

async function callApi(token) {
  const resp = await fetch(SERVER_URI, { method: 'POST', body: token });
  const json = await resp.json();
  console.log('got api response', json);
  return json;
}

function syncUI() {
  if (!idClaims) {
    hideElement('counter');
    updateElement('username', '');
    updateElement('count', '');
  } else {
    updateElement('username', idClaims.name);
    updateElement('count', count);
    showElement('counter');
  }
}

async function refresh() {
  const countResult = await callApi(accessToken);
  if (countResult && countResult.count) {
    count = countResult.count;
  }
  syncUI();
}


document.getElementById('refresh-btn').addEventListener("click", refresh); 
