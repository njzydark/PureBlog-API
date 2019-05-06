const logger = require('../utils/logger')

// 错误捕捉
module.exports = (err, req, res, next) => {
  logger.error(err.message)
  res.status(500).send({
    success: false,
    message: err.message
  })
}
