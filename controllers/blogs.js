const Blog = require('../models/blogs')

module.exports = {
  async getAllBlogs(req, res, next) {
    try {
      const blogs = await Blog.find().exec()
      res.status(200).send({
        success: true,
        data: blogs
      })
    } catch (e) {
      next(e)
    }
  },
  async getBlogById(req, res, next) {
    try {
      const blog = await Blog.findById(req.params.id).exec()
      res.status(200).send({
        success: true,
        data: blog
      })
    } catch (e) {
      next(e)
    }
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
      const blog = await Blog.findByIdAndUpdate(req.params.id, {
        title,
        content,
        categoryId,
        tagsId,
        updateTime: new Date().getTime()
      }, {
        new: true
      }).exec()
      res.status(201).send({
        success: true,
        data: blog
      })
    } catch (e) {
      next(e)
    }
  },
  async updateBlogAttrById(req, res, next) {
    const payload = req.decoded
    const {
      view,
      like
    } = req.body
    if (!view && !like) {
      return res.status(400).send({
        success: false,
        message: '无效的操作'
      })
    }
    try {
      const blog = await Blog.findById(req.params.id)
      let result = null
      if (view) {
        const viewCount = blog.viewCount + 1
        result = await Blog.findByIdAndUpdate(req.params.id, {
          viewCount
        }, {
          new: true
        })
      } else if (like) {
        const likesId = blog.likesId
        if (likesId.includes(payload.id)) {
          const index = likesId.indexOf(payload.id)
          likesId.splice(index, 1)
        } else {
          likesId.push(payload.id)
        }
        result = await Blog.findByIdAndUpdate(req.params.id, {
          likesId
        }, {
          new: true
        })
      }
      res.status(201).send({
        success: true,
        data: result
      })
    } catch (e) {
      next(e)
    }
  },
  async deleteBlogById(req, res, next) {
    try {
      const result = await Blog.findByIdAndDelete(req.params.id).exec()
      res.status(200).send({
        success: true,
        data: result
      })
    } catch (e) {
      next(e)
    }
  }
}