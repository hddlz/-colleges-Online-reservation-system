var fs = require('fs')
var express = require('express')
var Comments = require('../models/comments')

var router = express.Router()

router.get('/admin/comments',function (req,res){
	Comments.find(function(err,comments){
		if (err) {
			return res.status(500).send('server error')
		}
		res.render('admin/admin-Comments.html',{
			comments:comments,
			user:req.session.user
		})
	})
})

router.post('/admin/comments-status',function (req,res) {
  var id = req.body.id.replace(/"/g, '')
  Comments.findByIdAndUpdate(id,req.body,function (err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.redirect('/admin/comments')
  })
})

router.get('/admin/comments-new',function (req,res) {
	res.render('admin/admin-comments-new.html',{
		user:req.session.user
	})
})

router.post('/admin/comments-new', function (req, res) {
  new Comments(req.body).save(function (err) {
    if (err) {
      console.log(err)
      return res.status(500).send('Server error.')
    }
    res.redirect('/admin/comments')
  })
})

router.get('/admin/comments-delete', function (req, res) {
  var id = req.query.id.replace(/"/g, '')
  Comments.findByIdAndRemove(id, function (err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.redirect('/admin/comments')
  })
})

module.exports = router