
/**
 * Expose
 */

module.exports = {
  db: 'mongodb://sang:123456789@ds013574.mlab.com:13574/doanudpt',
  facebook: {
    clientID: '1729079927370976',
    clientSecret: 'c307074b1259b80252f64ca1734a93d1',
    callbackURL: 'https://calm-shore-60790.herokuapp.com/auth/facebook/callback',
    scope: [
      'email',
      'user_about_me',
      'user_friends'
    ]
  },
  google: {
    clientID: 'APP_ID',
    clientSecret: 'SECRET',
    callbackURL: 'https://calm-shore-60790.herokuapp.com/auth/google/callback',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.google.com/m8/feeds',
    ]
  }
};
