var fs = require('fs')
var express = require('express')
var User = require('../models/user')
var md5 = require('blueimp-md5')

var router = express.Router()


router.get('/',function (req,res){
	res.render('index.html',{
		user:req.session.user
	})
})

router.get('/news',function (req,res){
  res.render('news.html',{
    user:req.session.user
  })
})


router.get('/login',function (req,res) {
	res.render('login.html')
})

router.post('/login',function (req,res,next){
	var body = req.body
	User.find({
		email:body.email,
		password:md5(md5(body.password))
	},function (err,user){
		if (err) {
			return next(err)
		} 
		
		if (!user) {
      return res.status(200).json({
        err_code: 1,
        message: 'Email or password is invalid.'
      })
    }

    if(body.email === 'admin@f.com'){
    	return res.status(200).json({
    		err_code:1000,
        data:body.email,
    		massage:'admin access'
    	})
    }

		// 记录用户的登录状态
		req.session.user = user

		res.status(200).json({
      err_code: 0,
      data:body.email,
      message: 'OK'
    })
	})
})

router.get('/register',function (req,res,next){
	res.render('register.html')
})

router.post('/register',function (req,res,next){
	var body = req.body
  User.findOne({
    $or: [{
        email: body.email
      },
      {
        nickname: body.nickname
      }
    ]
  }, function (err, data) {
    if (err) {
      return next(err)
    }
    if (data) {
      return res.status(200).json({
        err_code: 1,
        message: 'Email or nickname aleady exists.'
      })
      return res.send(`邮箱或者昵称已存在，请重试`)
    }

    // 对密码进行 md5 多次重复加密
    body.password = md5(md5(body.password))

    new User(body).save(function (err, user) {
      if (err) {
        return next(err)
      }

      req.session.user = user

      res.status(200).json({
        err_code: 0,
        message: 'OK'
      })
    })
  })
})


module.exports = router