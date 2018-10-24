const Blog = require('../models/blogs')

module.exports = {
  async getAllBlogs(req, res, next) {
    res.send('get blogs')
  },
  async getBlogById(req, res, next) {
    res.send('get blog by id ' + req.params.id)
  },
  async createBlog(req, res, next) {
    const payload = req.decoded
    const {
      title,
      content,
      categoryId,
      tagsId
    } = req.body
    if (!title || !content) {
      return res.status(400).send({
        success: false,
        message: '标题或正文不能为空'
      })
    }
    try {
      const blog = new Blog({
        authorId: payload.id,
        title,
        content,
        categoryId,
        tagsId
      })
      const result = await blog.save()
      res.status(201).send({
        success: true,
        data: result
      })
    } catch (e) {
      next(e)
    }
  },
  async updateBlogById(req, res, next) {
    res.send('update blog by id ' + req.params.id)
  },
  async deleteBlogById(req, res, next) {
    res.send('delete blog by id ' + req.params.id)
  },
}