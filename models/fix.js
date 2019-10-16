var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/users')

var Schema = mongoose.Schema

module.exports = mongoose.model('Fix',new Schema({
	place:{
		type:String,
		required:true
	},
	specific:{
		type:String,
		required:true
	}
}))