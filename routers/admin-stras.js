var fs = require('fs')
var express = require('express')
var Stra = require('../models/stras')
var md5 = require('blueimp-md5')

var router = express.Router()

router.get('/admin/stras',function (req,res){
	Stra.find(function(err,stras){
		if (err) {
			return res.status(500).send('server error')
		}
		res.render('admin/admin-stras.html',{
			stras:stras,
			user:req.session.user
		})
	})
})

router.get('/admin/stras-edit',function (req,res){
	var id = req.query.id.replace(/"/g,'')
	Stra.findById(id,function(err,stras){
		if (err) {
			return res.status(500).send('server error')
		}
		res.render('admin/admin-stras-edit.html',{
			stras:stras,
			user:req.session.user
		})
	})
})

router.post('/admin/stras-edit', function (req, res) {
  var id = req.body.id.replace(/"/g, '')
  Stra.findByIdAndUpdate(id,req.body,function (err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.redirect('/admin/stras')
  })
})

router.get('/admin/stras-new',function (req,res){
	Stra.find(function(err,stras){
		if (err) {
			return res.status(500).send('server error')
		}
		res.render('admin/admin-stras-new.html',{
			stras:stras,
			user:req.session.user
		})
	})
})

router.post('/admin/stras-new', function (req, res) {
  new Stra(req.body).save(function (err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.redirect('/admin/stras')
  })
})

router.get('/admin/stras-delete', function (req, res) {
  var id = req.query.id.replace(/"/g, '')
  Stra.findByIdAndRemove(id, function (err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.redirect('/admin/stras')
  })
})

module.exports = router