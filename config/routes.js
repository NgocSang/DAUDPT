
/**
 * Module dependencies.
 */


var passport = require('passport');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/DAUDPT');
var db = mongoose.connection;
var User = mongoose.model('User');
var product = mongoose.model('products');
var cart = mongoose.model('carts');
var review = mongoose.model('reviews');
var order = mongoose.model('oders');
var ObjectID = require('mongodb').ObjectID;
module.exports = function (app, passport) {

  //==========================================================
  //====================LOGIN=================================
  //==========================================================
  app.post('/login', passport.authenticate('login', {
    successRedirect : '/',
    // Chuyển về trang thông tin cá nhân nếu đăng ký thành công
    failureRedirect : '/',
    // Điều hướng về lại trang đăng nhập nếu có lỗi
    failureFlash : true // cho phép flash messages
  }));
  //==========================================================
  //==========================================================

  //==========================================================
  //====================SIGNUP================================
  //==========================================================
  app.post('/signup', passport.authenticate('signup', {
    successRedirect : '/',
    // Chuyển về trang thông tin cá nhân nếu đăng ký thành công
    failureRedirect : '/',
    // Điều hướng về lại trang đăng ký nếu có lỗi
    failureFlash : true // cho phép flash messages
  }));
  //==========================================================
  //==========================================================
  app.post('/logout', function(req, res){
    req.logOut();
    res.redirect('/');
    console.log( "logout");
  });
  //==========================================================
  //==============LOGIN WITH FACEBOOK=========================
  //==========================================================
  app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // Xử lý sau khi facebook xác thực thành viên
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
      successRedirect : '/',
      failureRedirect : '/'
  }));
    //==========================================================
  //==========================================================
  app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback', passport.authenticate('google', {
      successRedirect : '/',
      failureRedirect : '/'
  }));
  //=============================================================
  //=============================================================

  app.get('/',function(req, res, next){
    var listproduct = db.model('products');

    console.log("Success");
    listproduct.find({'featured':'true'}).exec(function(err, data){
      if(err){
  		    res.send("Errors");
    	}
      else
    	{
    		//res.json(data);
        console.log(data);
    		console.log("Success");
        if(req.user){
          var cartproduct = db.model('carts');
          cartproduct.findOne({email:req.user.email}).exec(function(err, listcart){
            if(err){
              res.send('Error');
            }
            else{
              res.render('home', {data: data, user: req.user, listcart:listcart});
            }
          });
        }
        else{
          res.render('home', {data: data, user: req.user, listcart:null});
        }
    	}
    })
  });
app.post('/',function(req, res, next){
  console.log(req.body.email);
  console.log(req.body.avatar);
  var changuser = db.model('User');
  changuser.update({email:req.body.email},{avatar:req.body.avatar}).exec(function(err, data){
    if(err){
      res.send('Error');
    }else{
      res.send({success:true});

    }
  });

});
app.get('/cart',function(req, res, next){
  var cartproduct = db.model('carts');
  cartproduct.findOne({email:req.user.email}).exec(function(err, listcart){
    if(err){
      res.send('Error');
    }
    else{
      console.log('Kiểm tra json');
      console.log(listcart);
      res.render('cart', {user: req.user, listcart:listcart});
      ///////////////////////////////////

    }
  });
});
  app.post('/cart', function(req, res, next){
    if(req.body.idorder){
      var cartremove = db.model('carts');
      var oderproduct = new order({id:req.body.idorder, item:req.body.item, receiver:req.body.receiver});
      oderproduct.save(function(err, data){
        if(err){
          res.send('Error');
        }
        else{

          cartremove.remove({email:req.body.idorder}).exec(function(err, data){
            if(err){
              res.send('Erorr');
            }
            else{
              console.log('Add order success');
              res.send({success:true});
            }
          });

        }
      });
    }else{
        var cartremoved = db.model('carts');
        console.log(req.body.id);
          console.log(req.body.email);
        cartremoved.update({email:req.body.email},{$pop:{cart:{_id:ObjectID(req.body.id)}}}).exec(function(err, data){
          if(err){
            res.send('Error');
          }
          else{
            console.log('Xóa thành công');
            res.send({success:true});
          }
      });
    }
  });
  /*

  */
  app.get('/store',function(req, res, next){
    res.render('store',{user:req.user});
  });
  app.get('/contact',function(req, res, next){
    res.render('contact', {user:req.user});
  });
  app.get('/services',function(req, res, next){
    res.render('services', {user:req.user});
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

            ////////////////////
            console.log(data);
        		console.log("Success");
            if(req.user){
              var cartproduct = db.model('carts');
              cartproduct.findOne({email:req.user.email}).exec(function(err, listcart){
                if(err){
                  res.send('Error');
                }
                else{
                  res.render('details', {data: data, reviewpro: reviewpro, user: req.user, listcart:listcart});
                }
              });
            }
            else{
              res.render('details', {data: data, reviewpro: reviewpro, user: req.user, listcart:null});
            }
          }
        });

    	}

    });
  });
  app.post('/:id', function(req, res){
    if(req.body.productID){
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
            console.log('vo ham upadte comment');
            console.log(reviewed);
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
  }else{
      console.log("vo post");
      console.log(req.body.email);
      var email = req.body.email;
      var cartproduct = db.model('carts');
      var carted = {
        color : req.body.cart.color,
        imgUrl : req.body.cart.imgUrl,
        name : req.body.cart.name,
        number : req.body.cart.number,
        price : req.body.cart.price,
        size : req.body.cart.size
        };
      cartproduct.findOne({'email':email}).exec(function(err, cartpro){
        if(err){
          res.send('Error');
        }
        else{
          if(cartpro){
            cartproduct.update({email:email},{$push:{cart:carted}}).exec(function(err, data){
              if(err){
                res.send('Erorr');
              }
              else{
                console.log('Thanh cong khi them cart');
                res.send({success:true});
              }
            });
          }
          else{
            //viet nguoc lai ko trả
            var cartedproduct = new cart({email:email, cart:carted });
            cartedproduct.save(function(err, data){
              if(err){
                res.send('Error');

              }
              else {

                console.log('Them thanh cong cart moi phan insert');
                res.send({success:true});
              }
            });
          }
        }
      });
      console.log(carted);
  }
  });



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
