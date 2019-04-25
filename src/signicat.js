const { Issuer } = require('openid-client');

const clientIssuer = new Issuer({
  issuer: 'https://accounts.google.com',
  authorization_endpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  token_endpoint: 'https://www.googleapis.com/oauth2/v4/token',
  userinfo_endpoint: 'https://www.googleapis.com/oauth2/v3/userinfo',
  jwks_uri: 'https://www.googleapis.com/oauth2/v3/certs'
}); // => Issuer

class Signicat {
  constructor(clientID, clientSecret) {
    this.client = new clientIssuer.Client({
      client_id: clientID,
      client_secret: clientSecret
    });
  }

  /**
   * @returns {Issuer.Client}
   */
  getClient() {
    return this.client;
  }

  getAuthorizationUrl(redirectURI, scope, isPost = false) {
    if (!isPost) {
      return this.getClient().authorizationUrl({
        redirect_uri: redirectURI,
        scope: scope
      });
    }

    return this.getClient().authorizationPost({
      redirect_uri: redirectURI,
      scope: scope
    });
  }

  getAuthorizationCallbackPromise(url, query, state = {}) {
    return this.getClient().authorizationCallback(url, query, state);
  }

  getRefreshTokenPromise(refreshToken) {
    return this.getClient().refresh(refreshToken);
  }

  getRevokeTokenPromise(token, tokenTypeHint) {
    return this.getClient().revoke(token, [tokenTypeHint]);
  }

  getIntrospectTokenPromise(token, tokenTypeHint) {
    return this.getClient().introspect(token, [tokenTypeHint]);
  }

  getUserInfoPromise(accessToken, params = {}) {
    return this.getClient().userinfo(accessToken, params);
  }
}

module.exports = {Signicat};
