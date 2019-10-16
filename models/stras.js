var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/users')

var Schema = mongoose.Schema

module.exports = mongoose.model('Stra',new Schema({
	title:{
		type:String,
		required:true
	},
	text:{
		type:String,
	},
	time:{
		type:String,
		required:true
	}
}))