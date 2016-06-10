
/*!
 * Module dependencies.
 */

var mongoose = require('mongoose');
var User = mongoose.model('User');

var local = require('./passport/local');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var configAuth = require('../config/auth');

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

  passport.use(new FacebookStrategy({
    clientID : configAuth.facebookAuth.clientID,
    clientSecret : configAuth.facebookAuth.clientSecret,
    callbackURL : configAuth.facebookAuth.callbackURL,
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
            var newUser = new User();
            newUser.username = profile.displayName;
            newUser.email = profile.emails[0].value;
            newUser.save(function(err) {
              if(err)
                throw err;
              return done(null, newUser);
            })
          }
        })
    })
  }));
  
  // use these strategies
  passport.use(local);

  //====================LOGIN=================================
  //==========================================================
  passport.use('login', new LocalStrategy({
  usernameField : 'username',
  passwordField : 'password',
  passReqToCallback : true
  },
  
  function(req, username, password, done) {
    process.nextTick(function() {
      User.findOne({ 'username' : username }, function(err, user) {
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
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true
  },
  function(req, username, password, done) {
   
    process.nextTick(function() {
   
    // kiểm tra xem username đã được sử dụng hay chưa
      User.findOne({'username': username}, function(err, existingUser) {
        if (err)
          return done(err);
     
      // nếu tồn tại user với username này rồi thì báo lỗi
        if (existingUser)
          return done(null, false, req.flash('signupMessage',
            'Tên truy cập đã tồn tại, vui lòng chọn tên khác.'));
      // Ngược lại thì tạo mới user
        else {
          var newUser = new User();
          newUser.username = req.body.username;
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

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
 
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};