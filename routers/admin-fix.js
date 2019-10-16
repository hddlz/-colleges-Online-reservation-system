var fs = require('fs')
var express = require('express')
var Fix = require('../models/fix')

var router = express.Router()

router.get('/admin/fix',function (req,res){
	Fix.find(function(err,fix){
		if (err) {
			return res.status(500).send('server error')
		}
		res.render('admin/admin-fix.html',{
			fix:fix,
			user:req.session.user
		})
	})
})

module.exports = router