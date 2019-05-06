const morgan = require('morgan')
const logger = require('../utils/logger')

morgan.token(`status`, (req, res) => {
  const status = (typeof res.headersSent !== `boolean`
  ? Boolean(res._header)
  : res.headersSent)
    ? res.statusCode
    : undefined
  // get status color
  const color =
    status >= 500
      ? 31 // red
      : status >= 400
      ? 33 // yellow
      : status >= 300
      ? 36 // cyan
      : status >= 200
      ? 32 // green
      : 0 // no color
  return `\x1b[${color}m${status}\x1b[0m`
})

const devModify = ':method :url :status :response-time ms'
const combinedModify = ':remote-addr :method :url :status :response-time ms :user-agent"'
const morganFormat = process.env.NODE_ENV == 'development' ? devModify : combinedModify

module.exports = morgan(morganFormat, { stream: logger.stream })
