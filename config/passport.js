
/*!
 * Module dependencies.
 */

var mongoose = require('mongoose');
var User = mongoose.model('User');

var local = require('./passport/local');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var configAuth = require('./env/development');

/**
 * Expose
 */

module.exports = function (passport, config) {
  // serialize sessions
  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function(id, done) {
    User.findOne({ _id: id }, function (err, user) {
      done(err, user)
    })
  })

  //=========================================================
//====================LOGIN=================================
//==========================================================
passport.use('login', new LocalStrategy({
usernameField : 'email',
passwordField : 'password',
passReqToCallback : true
},

function(req, username, password, done) {
  process.nextTick(function() {
    User.findOne({ 'email' : username }, function(err, user) {
      if (err)
        return done(err);

      if (!user || !user.validPassword(password))
        return done(null, false, req.flash('loginMessage',
          'Tên truy cập hoặc mật khẩu không chính xác'));
    // thực hiện thành công thì trả về thông tin user
      else
        return done(null, user);
    });
  });
}));

//====================SIGN UP=================================
//==========================================================
passport.use('signup', new LocalStrategy({
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true
},
function(req, username, password, done) {

  process.nextTick(function() {

  // kiểm tra xem username đã được sử dụng hay chưa
    User.findOne({'email': username}, function(err, existingUser) {
      if (err)
        return done(err);

    // nếu tồn tại user với username này rồi thì báo lỗi
      if (existingUser)
        return done(null, false, req.flash('signupMessage',
          'Tên truy cập đã tồn tại, vui lòng chọn tên khác.'));
    // Ngược lại thì tạo mới user
      else {
        var newUser = new User();
        newUser.fullname = req.body.fullname;
        newUser.email = req.body.email;
        newUser.password = newUser.generateHash(password);

        newUser.save(function(err) {
          if (err)
            throw err;

          return done(null, newUser, req.flash('signupMessage',
          'Đăng ký tài khoản thành công!'));
        });
      }
    });
  });

}));

//======================================================================
//============================LOGIN WITH FACEBOOK=======================
//======================================================================
passport.use(new FacebookStrategy({
  clientID : configAuth.facebook.clientID,
  clientSecret : configAuth.facebook.clientSecret,
  callbackURL : configAuth.facebook.callbackURL,
  passReqToCallback : true,
  profileFields: ['id', 'displayName', 'photos', 'emails']
},
function(req, token, refreshToken, profile, done) {
  process.nextTick( function() {
    User.findOne({'email' : profile.emails[0].value},
      function(err, user) {
        if(err)
          return done(err);
        if(user) {
          return done(null, user);
        }
        else {
          var newUserFB = new User();
          newUserFB.fullname = profile.displayName;
          newUserFB.email = profile.emails[0].value;
          newUserFB.avatar = profile.photos[0].value;

          newUserFB.save(function(err) {
            if(err)
              throw err;
            return done(null, newUserFB);
          })
        }
      })
  })
}));

//======================================================================
//============================LOGIN WITH GOOGLE=======================
//======================================================================
  passport.use(new GoogleStrategy({
    clientID: configAuth.google.clientID,
    clientSecret: configAuth.google.clientSecret,
    callbackURL: configAuth.google.callbackURL,
  },
  function(token, refreshToken, profile, done) {
    process.nextTick(function() {
      User.findOne({'google.id': profile.id}, function(err, user) {
        if(err)
          return done(err);
        if(user) {
          return done(null, user);
        } else {
          var newUSerGG = new User();
          newUSerGG.userid = profile.id;
          newUSerGG.token = token;
          newUSerGG.fullname = profile.displayName;
          newUSerGG.email = profile.emails[0].value;
          newUSerGG.avatar = profile.photos[0].value;

          newUSerGG.save(function(err) {
            if (err) {
              throw err;
            }
            return done(null, newUSerGG);
          });
        }
      });
    });
  }
  ));
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
