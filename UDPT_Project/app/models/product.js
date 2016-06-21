var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
	productID: {type: String, index: {unique: true, required: true}},
	basicInfo:{
		name: {type: String},
		imgUrl: {type: String},
		price: {type: Number},
		tag: {type: String},
		description: {type: String},
		listimgUrl: [{type: String}]
	},
	color: [{type: String}],
	size: [{type: String}],
	featured:{type:Boolean}
	});

var Product = mongoose.model('products', productSchema);
module.exports = Product ;
