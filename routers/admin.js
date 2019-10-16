var fs = require('fs')
var express = require('express')
var User = require('../models/admin')
var md5 = require('blueimp-md5')

var router = express.Router()

router.get('/admin',function (req,res) {
	res.render('admin/admin-index.html',{
		user:req.session.user
	})
})

router.get('/admin/user',function (req,res){
	User.find(function(err,users){
		if (err) {
			return res.status(500).send('server error')
		}
		res.render('admin/admin-user.html',{
			users:users,
			user:req.session.user
		})
	})
})



router.get('/admin/new',function (req,res){
	res.render('admin/admin-new.html',{
		user:req.session.user
	})
})

router.post('/admin/new', function (req, res) {
	
  new User(req.body).save(function (err) {
    if (err) {
      console.log(err)
      return res.status(500).send('Server error.')
    }
    res.redirect('/admin/user')
  })
})

router.get('/admin/edit',function (req,res){
	var id = req.query.id.replace(/"/g,'')
	User.findById(id,function (err,users) {
		if (err) {
      return res.status(500).send('Server error.')
    }
    res.render('admin/admin-edit.html',{
    	users:users,
    	user:req.session.user
    })
	})
})

router.post('/admin/edit',function (req,res){
	var id = req.body.id.replace(/"/g, '')
  User.findByIdAndUpdate(id, req.body, function (err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.redirect('/admin/user')
  })
})

router.get('/admin/delete', function (req, res) {

  var id = req.query.id.replace(/"/g, '')
  User.findByIdAndRemove(id, function (err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.redirect('/admin/user')
  })
})

module.exports = router