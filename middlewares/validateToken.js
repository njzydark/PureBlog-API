const jwt = require('jsonwebtoken')

// 验证token合法性
module.exports = (req, res, next) => {
  const authorizationHeader = req.headers.authorization
  if (authorizationHeader) {
    const token = authorizationHeader.split(' ')[1]
    const secret = process.env.JWT_SECRET
    const options = {
      expiresIn: process.env.JWT_EXPIRESIN,
      issuer: process.env.JWT_ISSUER
    }
    try {
      let result = jwt.verify(token, secret, options)
      req.decoded = result
      next()
    } catch (err) {
      res.status(401).send({
        success: false,
        message: 'Token验证失败，请重新登录'
      })
    }
  } else {
    res.status(401).send({
      success: false,
      message: '无Token，认证失败'
    })
  }
}