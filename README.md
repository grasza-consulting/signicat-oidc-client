# Signicat OpenID Connect Provider

Signicat OpenID Connect Provider is a library to simplify implementation of it's SDK in NodeJS projects.

[![npm version](https://badge.fury.io/js/signicat-oidc-client.svg)](https://badge.fury.io/js/signicat-oidc-client)

## Installation

If you are using [yarn](https://yarnpkg.com/lang/en/) package manager.

```bash
yarn install signicat-oidc-client
```

If you are using [npm](https://www.npmjs.com/) package manager.

```bash
npm i signicat-oidc-client
```

## Usage 

### Fully working RunKIT example with express
[![Try signicat-oidc-client on RunKit](https://badge.runkitcdn.com/signicat-oidc-client.svg)](https://runkit.com/kamillo1888/signicatclientprototype)

### Redirect to our Auth endpoint

```nodejs
const signicat = require("signicat-oidc-client");

// Create an instance of SDK client
let client = signicat.Signicat.init('DFvfZ4bVE4tmoxjxjKm7L4uSOftBJYPL', 'hL_mqdzkDR7F-BrSUhPCfO8O1f02ZM1BLfFSF77LkcQZ4eEI5wH-xO4UlPxMPlfJ');

// Create params (nonce and state will be generated by SDK, you can allso pass them as arguments)
let params = signicat.Signicat.generateParams('https://your-callback-url/');

// Get redirect URI and redirect to this page
let redirectUrl = await client.getAuthorizationUrl(params);

```

### Implementing callback return response with express

```nodejs
const signicat = require("signicat-oidc-client");

const { nonce, state } = req.session;
delete req.session.nonce;
delete req.session.state;

// Create an instance of SDK client
let client = signicat.Signicat.init('DFvfZ4bVE4tmoxjxjKm7L4uSOftBJYPL', 'hL_mqdzkDR7F-BrSUhPCfO8O1f02ZM1BLfFSF77LkcQZ4eEI5wH-xO4UlPxMPlfJ');

// Parsing callback params
let callbackParams = await client.getCallbackParams(req);

// Saving response to our session storage
req.session.user = await client.getAuthorizationCallback(CALLBACK_URL, callbackParams, {nonce, state, response_type: 'token id_token'});

// Now you can redirect to your 

```



## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)