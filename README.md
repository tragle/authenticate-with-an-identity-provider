# Authenticating with single sign-on

This repo contains a reference app that integrates with an Ouath 2.0 identity provider to provide a single sign-on option for the user. 

To use this repo, read the background information in the How this works section, then follow the instructions in the Using the app section.

## How this works

Oauth 2.0 is the industry standard protocol for authorization and single sign-on. If you want your application to allow users to "Connect with Google" (for example) in order to log in to your app or to access an api, then you need to understand how Oauth 2.0 (and the OpenID Connect extension) works. 

The good news is that once you understand the basic Oauth 2.0 and OIDC flow, you can use any identity provider to implement authorization and authentication for your application. All identity providers follow the same Oauth 2.0 specification, which means that if you can integrate with one integrate with one identity provider, you know everything you need to integrate with the others.

### Terms


| Term | Definition |
| ---- | ---------- |
| Resource Owner | The user; the person who owns the identity and data connected to their accounts. |
| Client | The application that wants to access data on behalf of the **Resource Owner**. |
| Authorization Server | The application where the **Resource Owner** already has an account. |
| Resource Server | The API that the **Client** wants to use on behalf of the **Resource Owner**. |
| Redirect URI | The URL that the **Authorization Server** sends the **Resource Owner** back to after they have granted permission to the **Client**. Also called the "Callback URL." |
| Response Type | The type of information the **Client** expects back from the **Authorization Server**. |
| Scopes | The permissions the **Client** wants. |
| Consent | The message displayed to the **Resource Owner** by the **Authorization Server** asking if the **Client** should be given permission to the **Scopes** listed. |
| Client ID | An ID issued to the **Client** by the **Authorization Server**. |
| Client Secret | A secret password that only the **Client** and the **Authorization Server** know, allowing the **Access Token** to be retrieved securely. |
| Authorization Code | A short-lived code that the **Client** sends to the **Authorization Server** in exchange for an **Access Token**. |
| Access Token | The key used by the **Client** to communicate with the **Resource Server**. |


## Using the app
