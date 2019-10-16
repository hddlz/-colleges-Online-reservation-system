var mongoose = require('mongoose')
// users库
mongoose.connect('mongodb://localhost/users')

var Schema = mongoose.Schema

module.exports = mongoose.model('Comment',new Schema({
	title:{
		type:String,
		required:true
	},
	content:{
		type:String,
		required:true
	},
	status:{
		type:String		
	}
}))