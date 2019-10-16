var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/users')

var Schema = mongoose.Schema

module.exports = mongoose.model('User',new Schema({
	number:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	},
	nickname:{
		type:String
	}
}))
