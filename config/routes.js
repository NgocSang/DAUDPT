
/**
 * Module dependencies.
 */


var passport = require('passport');
var mongoose = require('mongoose');
var listpro = require('../app/controllers/product');
var cartpro = require('../app/controllers/cart');
var listord = require('../app/controllers/order');
var reviewpro = require('../app/controllers/review');
var User = require('../app/controllers/user');
//mongoose.connect('mongodb://sang:123456789@ds013574.mlab.com:13574/doanudpt');


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
    //-----Test MVC----------
    listpro.loadtrueproduct(function(err, data){
      console.log(data);
      if(req.user){
        cartpro.loadproductcart(req.user.email,function(error,listcart){
          if(error){
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
    });
  });
app.post('/',function(req, res, next){
  User.Changeavatar(req.body.email,req.body.avatar, function(err, data){
      if(err){
        res.send('Error');
      }else{
        res.send({success:true});

      }
  });
});

app.get('/history',function(req, res, next){
    listord.ListOrder(req.user.email, function(err, list){
      if(err){
        console.log("VO loi");
        res.send("Error");
      }
      else{
        res.render('history', {listorders: list, user:req.user});
      }
    });
  });
///
app.get('/cart',function(req, res, next){
  console.log(req.user.email);
  if(req.user.email != undefined){
    cartpro.loadproductcart(req.user.email,function(error,listcart){
      if(error){
        res.send('Error');
      }
      else{
        res.render('cart', {user: req.user, listcart:listcart});
      }
    });
  }
  else{
    res.redirect('/');
  }

});
  app.post('/cart', function(req, res, next){
    if(req.body.idorder){
      var oderproduct = new order({id:req.body.idorder, item:req.body.item, receiver:req.body.receiver});
      oderproduct.save(function(err, data){
        if(err){
          res.send('Error');
        }
        else{

          cartpro.Removeproductcart(req.body.idorder,function(error,data){
            if(error){
              res.send('Erorr');
            }
            else{
              res.send({success:true});
            }
          });

        }
      });
    }else{
      cartpro.Updateproductcart(req.body.email, req.body.id, function(error,data){
        if(error){
          res.send('Error');
        }
        else{
          res.send({success:true});
        }
      });
    }
  });
  app.get('/store',function(req, res, next){
    listpro.loadproduct(function(err, data){
      if(err){
        res.send('Error');
      }
      else{
        res.render('store', {user: req.user,data:data});
      }
    });
  });
  app.post('/store',function(req, res, next){
    var query = {
      basicInfo:{
        name:{$regex:req.body.nameproduct}
      },
      color:req.body.color,
      size:req.body.size
    };
    if (req.body.nameproduct == ''){
        delete query.basicInfo;
    }
    if(req.body.color == ''){
      delete query.color;
    }
    if(req.body.size == ''){
      delete query.size;
    }
    var ketqua = {};
     for(var prop1 in query){
       if(typeof prop1 ==="string"){

       if(typeof query[prop1] === "string")
        ketqua[prop1] = query[prop1];
       else{

         for(var prop2 in query[prop1]){

           if(typeof prop2 ==="string"){
             console.log(typeof query[prop1][prop2]);
           if(typeof query[prop1][prop2] === "object")
            ketqua[prop1+"."+prop2] = query[prop1][prop2];
          }
         }
       }
     }
     }
    listpro.Searchproduct(ketqua, function(err, data){
      if(err){
        res.send('Error');
      }else{
        res.render('store', {user: req.user,data:data});
      }
    });
  });
  app.get('/contact',function(req, res, next){
    res.render('contact', {user:req.user});
  });
  app.get('/services',function(req, res, next){
    res.render('services', {user:req.user});
  });
  app.get('/:id',function(req, res, next){
    var productID = req.params.id;
    listpro.findproduct(productID, function(err, data){
      if(err){
  		    res.send("Errors");
    	}
      else
    	{
        reviewpro.Listreview(productID, function(err, reviewpro){
          if(err){
            res.send('Errors');
          }
          else{

            if(req.user){
            cartpro.loadproductcart(req.user.email,function(error,listcart){
              if(error){
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
      var productID = req.body.productID;
      console.log('id san pham' + productID);
      var reviewed = {
          avatar:req.body.comment.avatar,
          content:req.body.comment.content,
          name:req.body.comment.name,
          rating:req.body.comment.rating
        };
      reviewpro.Findreview(productID,function(err, reviewpro1){
        if(err){
          res.send('Errors');
        }
        else{
          if (reviewpro1)
          {
            reviewpro.UdateAddreview(productID,reviewed, function(err1, data){
              if(err1){
                res.send('Erorr');
              }
              else{

                res.send({success:true, data:reviewed});
              }
            });
          }
          else{
            reviewpro.Newreview(productID, reviewed, function(err2,data){
              if(err){
                res.send('Error');
              }
              else {
                res.send({success:true, data:reviewed});
              }
            });
          }
        }
      });
  }else{

      var email = req.body.email;
      //var cartproduct = db.model('carts');
      var carted = {
        color : req.body.cart.color,
        imgUrl : req.body.cart.imgUrl,
        name : req.body.cart.name,
        number : req.body.cart.number,
        price : req.body.cart.price,
        size : req.body.cart.size
        };
      cartpro.loadproductcart(email, function(error, cartproc){
        if(error){
          res.send('Error');
        }
        else{
          if(cartproc){
            cartpro.UpdateAddproductcart(email,carted,function(error1,data){
              if(error1){
                res.send('Erorr');
              }
              else{

                res.send({success:true});
              }
            });
          }
          else{
            cartpro.Newproductcart(email, carted, function(error2, data){
              if(error2){
                res.send('Error');

              }
              else {
                res.send({success:true});
              }
            });
            //viet nguoc lai ko trả
          }
        }
      });
      /*cartproduct.findOne({'email':email}).exec(function(err, cartpro){
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
      });*/
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
