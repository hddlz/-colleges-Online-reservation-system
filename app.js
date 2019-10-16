// 引入需求文件
var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var session = require('express-session')

var index = require('./routers/index.js')
var stra = require('./routers/stra.js')
var start = require('./routers/start.js')
var comments = require('./routers/comments.js')
var fix = require('./routers/fix.js')
var admin = require('./routers/admin.js')
var adminStra = require('./routers/admin-stras.js')
var adminStart = require('./routers/admin-start.js')
var adminComments = require('./routers/admin-comments.js')
var adminFix = require('./routers/admin-fix.js')
// 配置
var app = express()

app.use('/node_modules/',express.static(path.join(__dirname,'./node_modules/')))
app.use('/public/',express.static(path.join(__dirname,'./public/')))

app.engine('html',require('express-art-template'))
app.set('views',path.join(__dirname,'./views/'))

app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())

app.use(session({
	// 配置加密字符串，它会在原有加密基础之上和这个字符串拼起来去加密
  // 目的是为了增加安全性，防止客户端恶意伪造
  secret: 'user',
  resave: false,
  saveUninitialized: false // 无论你是否使用 Session ，我都默认直接给你分配一把钥匙
}))

// 挂载路由
app.use(index)
app.use(stra)
app.use(start)
app.use(comments)
app.use(fix)
app.use(admin)
app.use(adminStra)
app.use(adminStart)
app.use(adminComments)
app.use(adminFix)



app.listen(3000, function () {
  console.log('启动 ...')
})

module.exports = app