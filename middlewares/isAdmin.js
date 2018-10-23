// 是否具有管理员权限
module.exports = (req, res, next) => {
  const payload = req.decoded
  if (payload && payload.role == 'admin') {
    next()
  } else {
    res.status(403).send({
      success: false,
      message: '无权限访问'
    })
  }
}