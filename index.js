require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const logger = require('./utils/logger')
const bodyParser = require('body-parser')
const handleLog = require('./middlewares/handleLog')
const handleError = require('./middlewares/handleError')
const handleCORS = require('./middlewares/handleCORS')

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
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

// 记录Http请求日志
app.use(handleLog)

app.all('*', handleCORS)

routes(app)

// 错误捕捉
app.use(handleError)

// 数据库连接
mongoose.connect(
  process.env.DB_URL,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  },
  err => {
    if (err) {
      logger.error(err.message)
    } else {
      logger.info(`数据库连接成功`)
    }
  }
)

app.listen(stage.port, () => {
  logger.info(`启动成功，服务监听地址 http://localhost:${stage.port}`)
})
