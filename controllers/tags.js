const Tag = require('../models/tags')

module.exports = {
  async getAllTags(req, res, next) {
    try {
      const tags = await Tag.find().exec()
      res.status(200).send({
        success: true,
        data: tags
      })
    } catch (e) {
      next(e)
    }
  },
  async createTag(req, res, next) {
    const {
      name
    } = req.body
    if (!name) {
      return res.status(400).send({
        success: false,
        message: '标签名不能为空'
      })
    }
    try {
      const tag = new Tag({
        name
      })
      const result = await tag.save()
      res.status(201).send({
        success: true,
        data: result
      })
    } catch (e) {
      next(e)
    }
  },
  async updateTagById(req, res, next) {
    const {
      name
    } = req.body
    if (!name) {
      return res.status(400).send({
        success: false,
        message: '标签名不能为空'
      })
    }
    try {
      const tag = await Tag.findByIdAndUpdate(req.params.id, {
        name
      }, {
        new: true
      }).exec()
      res.status(201).send({
        success: true,
        data: tag
      })
    } catch (e) {
      next(e)
    }
  },
  async deleteTagById(req, res, next) {
    try {
      const result = await Tag.findByIdAndDelete(req.params.id).exec()
      res.status(200).send({
        success: true,
        data: result
      })
    } catch (e) {
      next(e)
    }
  }
}