var fs = require('fs')
var express = require('express')
var Start = require('../models/start')
var md5 = require('blueimp-md5')

var router = express.Router()

router.get('/admin/start',function (req,res){
	Start.find(function(err,starts){
		if (err) {
			return res.status(500).send('server error')
		}
		res.render('admin/admin-start.html',{
			starts:starts,
			user:req.session.user
		})
	})
})

router.post('/admin/start-status',function (req,res) {
  var id = req.body.id.replace(/"/g, '')
  Start.findByIdAndUpdate(id,req.body,function (err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.redirect('/admin/start')
  })
})

router.get('/admin/start-new',function (req,res){
	res.render('admin/admin-start-new.html',{
		user:req.session.user
	})
})

router.post('/admin/start-new', function (req, res) {
  new Start(req.body).save(function (err) {
    if (err) {
      console.log(err)
      return res.status(500).send('Server error.')
    }
    res.redirect('/admin/start')
  })
})

router.get('/admin/start-delete', function (req, res) {
  var id = req.query.id.replace(/"/g, '')
  Start.findByIdAndRemove(id, function (err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.redirect('/admin/start')
  })
})

module.exports = router