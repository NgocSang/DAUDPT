var listproduct = require('../models/product');


exports.loadStore = function(req, res, next){
    listproduct.find({'featured':'true'}).exec(function(err, data){
      if(err){
  		    res.send("Errors");
    	}
      else
    	{
    		console.log(data);
    		console.log("Success");
    		res.render('store',{data:data, user:req.user});
    }
  })
};