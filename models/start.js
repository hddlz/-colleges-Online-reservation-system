var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/users')

var Schema = mongoose.Schema

module.exports = mongoose.model('Start',new Schema({
	place:{
		type:String,
		required:true
	},
	date:{
		type:String,
		required:true
	},
	s_time:{
		type:String,
  },
	e_time:{
		type:String,
	},
	email:{
		type:String,
		required:true
	},
	status:{
		type:String
	}
})
)