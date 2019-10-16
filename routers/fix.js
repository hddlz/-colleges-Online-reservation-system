var fs = require('fs')
var express = require('express')
var Fix = require('../models/fix')

var router = express.Router()

router.get('/fix',function (req,res) {
	res.render('fix.html',{
		user:req.session.user
	})
})

router.post('/fix',function (req,res){
	 new Fix(req.body).save(function (err) {
    if (err) {
      console.log(err)
      return res.status(500).send('Server error.')
    }

    res.redirect('/')
  })
})


module.exports = router