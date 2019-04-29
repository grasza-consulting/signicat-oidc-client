const { Issuer } = require('openid-client');
const crypto = require('crypto');

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

  static init(clientID, clientSecret) {
    return new Signicat(clientID, clientSecret);
  }

  static generateRandomString(bytesLength = 8) {
    return crypto.randomBytes(bytesLength).toString('hex');
  }

  static generateParams(callbackURL, nonce, state) {

    if (nonce === undefined) {
      nonce = Signicat.generateRandomString(8);
    }

    if (state === undefined) {
      state = Signicat.generateRandomString(10);
    }

    return {
      nonce: nonce,
      state: state,
      redirect_uri: callbackURL,
      scope: 'openid profile email',
      response_type: 'token id_token',
      response_mode: 'form_post'
    };
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

  getCallbackParams(params) {
    return this.getClient().then((client) => {
      return client.callbackParams(params);
    });
  }

  getAuthorizationUrl(params) {
    return this.getClient().then((client) => {
      return client.authorizationUrl(params);
    });
  }

  getAuthorizationCallback(url, query, state = {}) {
    return this.getClient().then((client) => {
      return client.authorizationCallback(url, query, state);
    });
  }

  getRefreshToken(refreshToken) {
    return this.getClient().then((client) => {
      return client.refresh(refreshToken);
    });
  }

  getRevokeToken(token, tokenTypeHint) {
    return this.getClient().then((client) => {
      return client.revoke(token, [tokenTypeHint]);
    });
  }

  getIntrospectToken(token, tokenTypeHint) {
    return this.getClient().then((client) => {
      return client.introspect(token, [tokenTypeHint]);
    });
  }

  getUserInfo(accessToken, params = {}) {
    return this.getClient().then((client) => {
      return client.userinfo(accessToken, params);
    });
  }
}

module.exports = {Signicat};
