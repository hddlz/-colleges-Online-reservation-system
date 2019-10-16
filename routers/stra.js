var fs = require('fs')
var express = require('express')
var Stra = require('../models/stras')
var md5 = require('blueimp-md5')

var router = express.Router()

router.get('/stra',function (req,res){
	Stra.find(function (err,stra){
		if (err) {
			return res.status(500).send('server error')
		}
		res.render('stra.html',{
			stra:stra,
			user:req.session.user
		})
	})
})

router.get('/time',function (req,res){
	Stra.find(function (err,stra){
		if (err) {
			return res.status(500).send('server error')
		}
		  res.render('time.html',{
		    stra:stra,
    		user:req.session.user
  		})
	})
})

module.exports = router