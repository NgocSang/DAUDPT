
/**
 * Expose
 */

module.exports = {
  db: 'mongodb://localhost/DAUDPT',
  facebook: {
    clientID: '1729079927370976',
    clientSecret: 'c307074b1259b80252f64ca1734a93d1',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    scope: [
      'email',
      'user_about_me',
      'user_friends'
    ]
  },
  google: {
    clientID: '608277780696-e8a1pmicvbq1jho6u1toihlo5o7ltlli.apps.googleusercontent.com',
    clientSecret: 'FeIu5sq5V3oUR9IP7KVbWorK',
    callbackURL: 'http://localhost:3000/auth/google/callback',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.google.com/m8/feeds',
    ]
  }
};
