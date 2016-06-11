
/**
 * Module dependencies.
 */


var passport = require('passport');

var mongoose = require('mongoose');
var profile = require('profile');
mongoose.connect('mongodb://localhost/DAUDPT');
var db = mongoose.connection;
var User = mongoose.model('User');
var product = mongoose.model('products');

module.exports = function (app, passport) {

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
  app.get('/store',function(req, res, next){
    res.render('store');
  });
  app.get('/contact',function(req, res, next){
    res.render('contact');
  });
  app.get('/:id',function(req, res, next){
    var productID = req.params.id;
    var detailsproduct = db.model('products');
    detailsproduct.find({'productID':productID}).exec(function(err, data){
      if(err){
  		    res.send("Errors");
    	}
      else
    	{
    		//res.json(data);
        console.log("vo ham detail");
        console.log(data);

    		res.render('details', {data: data});
    	}

    });
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
