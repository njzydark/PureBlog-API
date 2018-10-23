const Blog = require('../models/blogs')

module.exports = {
  async getAllBlogs(req, res, next) {
    res.send('get blogs')
  },
  async getBlogById(req, res, next) {
    res.send('get blog by id ' + req.params.id)
  },
  async createBlog(req, res, next) {
    res.send('create blog')
  },
  async updateBlogById(req, res, next) {
    res.send('update blog by id ' + req.params.id)
  },
  async deleteBlogById(req, res, next) {
    res.send('delete blog by id ' + req.params.id)
  },
}