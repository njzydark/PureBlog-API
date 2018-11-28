// 错误捕捉
module.exports = (err, req, res, next) => {
  res.status(500).send({
    success: false,
    err: err.message
  })
}
