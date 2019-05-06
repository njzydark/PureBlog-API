const Category = require('../models/categories')
const logger = require('../utils/logger')

module.exports = {
  async getAllCategories(req, res, next) {
    try {
      const categoties = await Category.find().exec()
      res.status(200).send({
        success: true,
        data: categoties
      })
    } catch (e) {
      logger.error(e.message)
      next(new Error(`获取所有类别信息失败`))
    }
  },
  async createCategory(req, res, next) {
    const { name } = req.body
    if (!name) {
      return res.status(400).send({
        success: false,
        message: '类别名不能为空'
      })
    }
    try {
      const category = new Category({
        name
      })
      const result = await category.save()
      res.status(201).send({
        success: true,
        data: result
      })
    } catch (e) {
      logger.error(e.message)
      next(new Error(`类别创建失败`))
    }
  },
  async updateCategoryById(req, res, next) {
    const { name } = req.body
    if (!name) {
      return res.status(400).send({
        success: false,
        message: '类别名不能为空'
      })
    }
    try {
      const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
          name
        },
        {
          new: true
        }
      ).exec()
      res.status(201).send({
        success: true,
        data: category
      })
    } catch (e) {
      logger.error(e.message)
      next(new Error(`类别更新失败`))
    }
  },
  async deleteCategoryById(req, res, next) {
    try {
      const result = await Category.findByIdAndDelete(req.params.id).exec()
      res.status(200).send({
        success: true,
        data: result
      })
    } catch (e) {
      logger.error(e.message)
      next(new Error(`类别删除失败`))
    }
  }
}
