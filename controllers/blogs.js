const Blog = require('../models/blogs')
const config = require('../config')

module.exports = {
  async getAllBlogs(req, res, next) {
    try {
      Blog.schema.set('reqQuery', req.query)
      const blogsPromise = Blog.find().exec()
      const totalPromise = Blog.find()
        .estimatedDocumentCount()
        .exec()
      const [blogs, total] = await Promise.all([blogsPromise, totalPromise])
      res.status(200).send({
        success: true,
        data: blogs,
        limit: config.blogsLimit,
        total
      })
    } catch (e) {
      next(e)
    }
  },
  async getBlogsByCategoryId(req, res, next) {
    try {
      Blog.schema.set('reqQuery', req.query)
      const category = req.params.id
      const blogsPromise = Blog.find({
        category
      }).exec()
      const totalPromise = Blog.find({
        category
      })
        .countDocuments()
        .exec()
      const [blogs, total] = await Promise.all([blogsPromise, totalPromise])
      res.status(200).send({
        success: true,
        data: blogs,
        limit: config.blogsLimit,
        total
      })
    } catch (e) {
      next(e)
    }
  },
  async getBlogsByTagId(req, res, next) {
    try {
      Blog.schema.set('reqQuery', req.query)
      const tags = req.params.id
      const blogsPromise = Blog.find({
        tags: {
          $in: tags
        }
      }).exec()
      const totalPromise = Blog.find({
        tags: {
          $in: tags
        }
      })
        .countDocuments()
        .exec()
      const [blogs, total] = await Promise.all([blogsPromise, totalPromise])
      res.status(200).send({
        success: true,
        data: blogs,
        limit: config.blogsLimit,
        total
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
    const { title, overView, content, cover, category, tags } = req.body
    if (!title || !content) {
      return res.status(400).send({
        success: false,
        message: '标题或正文不能为空'
      })
    }
    try {
      const blog = new Blog({
        author: payload.id,
        title,
        overView,
        content,
        cover,
        category,
        tags
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
    const { title, overView, content, category, tags } = req.body
    if (!title || !content) {
      return res.status(400).send({
        success: false,
        message: '标题或正文不能为空'
      })
    }
    try {
      const blog = await Blog.findByIdAndUpdate(
        req.params.id,
        {
          title,
          overView,
          content,
          category,
          tags,
          updateTime: new Date().getTime()
        },
        {
          new: true
        }
      ).exec()
      res.status(201).send({
        success: true,
        data: blog
      })
    } catch (e) {
      next(e)
    }
  },
  async updateBlogViewsById(req, res, next) {
    const { view } = req.body
    if (!view) {
      return res.status(400).send({
        success: false,
        message: '无效的操作'
      })
    }
    try {
      const blog = await Blog.findById(req.params.id)
      const views = blog.views + 1
      const result = await Blog.findByIdAndUpdate(
        req.params.id,
        {
          views
        },
        {
          new: true
        }
      )
      res.status(201).send({
        success: true,
        data: result
      })
    } catch (e) {
      next(e)
    }
  },
  async updateBlogLikesById(req, res, next) {
    const { like } = req.body
    if (!like) {
      return res.status(400).send({
        success: false,
        message: '无效的操作'
      })
    }
    try {
      const blog = await Blog.findById(req.params.id)
      const likes = blog.likes
      const payload = req.decoded
      const index = likes.findIndex(item => item.id == payload.id)
      if (index > -1) {
        likes.splice(index, 1)
      } else {
        likes.push(payload.id)
      }
      const result = await Blog.findByIdAndUpdate(
        req.params.id,
        {
          likes
        },
        {
          new: true
        }
      )
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
