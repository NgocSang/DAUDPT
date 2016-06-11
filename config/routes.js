
/**
 * Module dependencies.
 */


var passport = require('passport');

var mongoose = require('mongoose');
var login = require('login');
var signup = require('signup');
var profile = require('profile');
mongoose.connect('mongodb://localhost/DAUDPT');
var db = mongoose.connection;
var User = mongoose.model('User');
var product = mongoose.model('products');
module.exports = function (app, passport) {


  app.get('/signup', signup.index);

  app.get('/home',function(req, res, next){
    var listproduct = db.model('products');
    listproduct.find({'featured':'true'}).exec(function(err, data){
      if(err){
  		    res.send("Errors");
    	}
      else
    	{
    		//res.json(data);
        console.log(data);
    		console.log("Success");
    		res.render('home', {data: data});
    	}
    })
  });
  app.get('/insertData', function(req, res) {
  var User1 = new review({productID: "ABC"});
  User1.save(function (err, data) {
    if (err) {
      res.send("Error" + err);
    }
    else {
        res.json(data);
        console.log("Success");
    }
  });
});
  app.get('/store',function(req, res, next){
    res.render('store');
  });
  app.get('/contact',function(req, res, next){
    res.render('contact');
  });
  app.get('/:id',function(req, res, next){
    var productID = req.params.id;
    var detailsproduct = db.model('products');
    var reviewproduct = db.model('reviews');
    detailsproduct.find({'productID':productID}).exec(function(err, data){
      if(err){
  		    res.send("Errors");
    	}
      else
    	{
        console.log("vo detail product");
        console.log(data[0]);
        reviewproduct.find({'productID':productID}).exec(function(err, reviewpro){
          if(err){
            res.send('Errors');
          }
          else{
            console.log("vo review");
            console.log(reviewpro[0]);
            res.render('details', {data: data, reviewpro: reviewpro});
          }
        });

    	}

    });
  });
  app.post('/:id', function(req, res){
    var reviewproduct = db.model('reviews');
    var productID = req.body.productID;
    console.log('id san pham' + productID);
    var reviewed = {
        avatar:req.body.comment.avatar,
        content:req.body.comment.content,
        name:req.body.comment.name,
        rating:req.body.comment.rating
      };
    reviewproduct.findOne({'productID':productID}).exec(function(err, reviewpro){
      if(err){
        res.send('Errors');
      }
      else{
        if (reviewpro)
        {
          console.log(reviewpro);
          reviewproduct.update({productID:productID},{$push:{comment:reviewed}}).exec(function(err, data){
            if(err){
              res.send('Erorr');
            }
            else{
              console.log('Thanh cong');
              res.send({success:true, data:reviewed});
            }
          });
        }
        else{

          var reviweproduct = new review({productID:productID, comment:reviewed });
          reviweproduct.save(function(err, data){
            if(err){
              res.send('Error');

            }
            else {

              console.log('Them thanh cong');
              res.send({success:true, data:reviewed});
            }
          });
        }
      }
    });
  });
/*app.get('/', function(req, res) {
 // hiển thị view login và login message Mnếu nó tồn tại.
 res.render('profile', { message: req.flash('loginMessage') });
 });


  app.get('/profile', isLoggedIn, function(req, res) {
    user = req.user;

    ///----------------------



    ////--------------------

  res.render('profile', {
    user : req.user
    // lấy thông tin người dùng trong session
    //và truyền qua view
    });
  });
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
  // route middleware kiểm tra để chắc chắn là
    // người dùng đã đăng nhập
    function isLoggedIn(req, res, next) {

    // nếu người dùng đã đăng nhập thì tiếp tục thực hiện
     if (req.isAuthenticated())
     return next();

    // ngược lại điều hướng về đăng nhập.
     res.redirect('/');
    }
  app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

// Xử lý sau khi facebook xác thực thành viên
  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect : '/profile',
    failureRedirect : '/login'
  }));


  app.post('/signup', passport.authenticate('signup', {
 successRedirect : '/profile',
 // Chuyển về trang thông tin cá nhân nếu đăng ký thành công
 failureRedirect : '/signup',
 // Điều hướng về lại trang đăng ký nếu có lỗi
 failureFlash : true // cho phép flash messages
 }));

  app.post('/profile', passport.authenticate('login', {
 successRedirect : '/profile',
 // Chuyển về trang thông tin cá nhân nếu đăng ký thành công
 failureRedirect : '/',
 // Điều hướng về lại trang đăng nhập nếu có lỗi
 failureFlash : true // cho phép flash messages
 }));
  /**
   * Error handling
   */

  app.use(function (err, req, res, next) {
    // treat as 404
    if (err.message
      && (~err.message.indexOf('not found')
      || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next();
    }
    console.error(err.stack);
    // error page
    res.status(500).render('500', { error: err.stack });
  });

  // assume 404 since no middleware responded
  app.use(function (req, res, next) {
    res.status(404).render('404', {
      url: req.originalUrl,
      error: 'Not found'
    });
  });


};
