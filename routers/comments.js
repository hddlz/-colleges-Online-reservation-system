var fs = require('fs')
var express = require('express')
var Comments = require('../models/comments')

var router = express.Router()

// function->函数  响应
router.get('/comments',function (req,res){
	Comments.find(function (err,Comments){
		if (err) {
			return res.status(500).send('server error')
		}
		res.render('comments.html',{
			Comments:Comments,
			user:req.session.user
		})
	})
})

router.post('/comments',function (req,res){
	 new Comments(req.body).save(function (err) {
    if (err) {
      return res.status(500).send('Server error.')
    }

    res.redirect('/comments')
  })
})

module.exports = router