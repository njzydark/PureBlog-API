const Category = require('../models/categories')

module.exports = {
  async getAllCategories(req, res, next) {
    try {
      const categoties = await Category.find().exec()
      res.status(200).send({
        success: true,
        data: categoties
      })
    } catch (e) {
      next(e)
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
      next(e)
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
      next(e)
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
      next(e)
    }
  }
}
