const Blog = require('../models/blogs')
const logger = require('../utils/logger')

module.exports = {
  isAdmin(req, res, next) {
    const payload = req.decoded
    if (payload && payload.role == 'admin') {
      next()
    } else {
      res.status(403).send({
        success: false,
        message: '无权限访问'
      })
    }
  },
  checkUserId(req, res, next) {
    const payload = req.decoded
    if (req.params.id == payload.id || payload.role == 'admin') {
      next()
    } else {
      res.status(403).send({
        success: false,
        message: '无权限访问'
      })
    }
  },
  async checkBlogId(req, res, next) {
    try {
      const blog = await Blog.findById(req.params.id).exec()
      if (!blog) {
        return res.status(400).send({
          success: false,
          message: '无效的Id'
        })
      }
      const authorId = blog.authorId
      const payload = req.decoded
      if (authorId == payload.id || payload.role == 'admin') {
        next()
      } else {
        res.status(403).send({
          success: false,
          message: '无权限访问'
        })
      }
    } catch (e) {
      logger.error(e.message)
      next(new Error(`博客ID检查失败`))
    }
  }
}
