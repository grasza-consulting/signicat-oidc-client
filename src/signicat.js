const { Issuer } = require('openid-client');

const DISCOVER_DOMAIN = 'https://dev-zc3yb-ev.eu.auth0.com';

class Signicat {
  constructor(clientID, clientSecret) {
    this.client = this.discover()
      .then((issuer) => {
        return new issuer.Client({
          client_id: clientID,
          client_secret: clientSecret
        });
      });
  }

  /**
   * @returns {Promise<Issuer.Client>}
   */
  getClient() {
    return this.client;
  }

  discover() {
    return Issuer.discover(DISCOVER_DOMAIN);
  }

  getCallbackParamsPromise(params) {
    return this.getClient().then((client) => {
      return client.callbackParams(params);
    });
  }

  getAuthorizationUrlPromise(params, isPost = false) {
    if (!isPost) {
      return this.getClient().then((client) => {
        return client.authorizationUrl(params);
      });
    }

    return this.getClient().then((client) => {
      client.authorizationPost(params);
    });
  }

  getAuthorizationCallbackPromise(url, query, state = {}) {
    return this.getClient().then((client) => {
      return client.authorizationCallback(url, query, state);
    });
  }

  getRefreshTokenPromise(refreshToken) {
    return this.getClient().then((client) => {
      return client.refresh(refreshToken);
    });
  }

  getRevokeTokenPromise(token, tokenTypeHint) {
    return this.getClient().then((client) => {
      return client.revoke(token, [tokenTypeHint]);
    });
  }

  getIntrospectTokenPromise(token, tokenTypeHint) {
    return this.getClient().then((client) => {
      return client.introspect(token, [tokenTypeHint]);
    });
  }

  getUserInfoPromise(accessToken, params = {}) {
    return this.getClient().then((client) => {
      return client.userinfo(accessToken, params);
    });
  }
}

module.exports = {Signicat};
