var fs = require('fs')
var express = require('express')
var Start = require('../models/start')
var md5 = require('blueimp-md5')

var router = express.Router()

router.get('/start',function (req,res){
  res.render('start.html',{
    user:req.session.user
  })
})

router.post('/start',function (req,res){
  new Start(req.body).save(function (err) {
    if (err) {
      console.log(err)
      return res.status(500).send('Server error.')
    }
    
    res.status(200).json({
      err_code:0,
      message:'ok'
    })
    
  })
})

module.exports = router