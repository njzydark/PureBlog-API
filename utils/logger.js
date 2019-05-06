const path = require('path')
const fs = require('fs')
const { createLogger, format, transports, addColors } = require('winston')

// 确保项目根目录存在logs文件夹
const logDirectory = path.resolve('./', 'logs')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

// 配置等级和颜色
const config = {
  levels: {
    error: 0,
    debug: 1,
    warn: 2,
    data: 3,
    info: 4,
    verbose: 5,
    silly: 6,
    http: 7
  },
  colors: {
    error: 'red',
    debug: 'blue',
    warn: 'yellow',
    data: 'grey',
    info: 'green',
    verbose: 'cyan',
    silly: 'magenta',
    http: 'yellow'
  }
}

// 添加自定义颜色
addColors(config.colors)

const options = {
  allLog: {
    level: 'http',
    filename: path.resolve(logDirectory, 'all.log')
  },
  errorLog: {
    level: 'error',
    filename: path.resolve(logDirectory, 'error.log')
  }
}

function formatParams(info) {
  let { timestamp, level, message } = info
  message = message.replace(/[\r\n]/g, '')
  return `[${timestamp}] ${level}: ${message}`
}

const logger = createLogger({
  level: 'http',
  levels: config.levels,
  handleExceptions: true,
  json: true,
  maxsize: 5242880, // 5MB
  maxFiles: 5,
  format: format.combine(
    format.colorize(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(formatParams)
  ),
  transports: [new transports.File(options.allLog), new transports.File(options.errorLog), new transports.Console()]
})

// 添加morgan日志信息
logger.stream = {
  write: function(message, encoding) {
    logger.http(message)
  }
}

module.exports = logger
