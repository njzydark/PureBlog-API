require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const logger = require('morgan')
const bodyParser = require('body-parser')
const handleError = require('./middlewares/handleError')

const app = express()
// 引入路由表
const routes = require('./routes/index')

// 获取运行环境
const environment = process.env.NODE_ENV
// 获取当前运行环境配置
const stage = require('./config')[environment]

// 处理json数据
app.use(bodyParser.json())
// 处理表单数据
app.use(bodyParser.urlencoded({
  extended: true
}))

// 运行环境为开发时，开启错误日志
if (environment == 'development') {
  app.use(logger('dev'))
}

routes(app)

// 错误捕捉
app.use(handleError)

// 数据库连接
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
}, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('数据库连接成功')
  }
})

app.listen(stage.port, () => {
  console.log(`服务监听地址 http://localhost:${stage.port}`)
})