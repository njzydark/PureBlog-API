const User = require('../models/users')
const Blog = require('../models/blogs')
const Category = require('../models/categories')
const Tag = require('../models/tags')

module.exports = {
  // 获取用户、博客、类别和标签数量
  async getAllCount(req, res, next) {
    try {
      const userPromise = User.find()
        .estimatedDocumentCount()
        .exec()
      const blogPromise = Blog.find()
        .estimatedDocumentCount()
        .exec()
      const categoryPromise = Category.find()
        .estimatedDocumentCount()
        .exec()
      const tagPromise = Tag.find()
        .estimatedDocumentCount()
        .exec()
      const [userCount, blogCount, categoryCount, tagCount] = await Promise.all([
        userPromise,
        blogPromise,
        categoryPromise,
        tagPromise
      ])
      res.status(200).send({
        success: true,
        data: [userCount, blogCount, categoryCount, tagCount]
      })
    } catch (e) {
      next(e)
    }
  },
  // 获取近半年用户博客数量统计数据
  async getBlogCountTrend(req, res, next) {
    try {
      const lookup = {
        $lookup: {
          from: 'users',
          localField: 'author',
          foreignField: '_id',
          as: 'user'
        }
      }
      const unwind = {
        $unwind: '$user'
      }
      const addFields = {
        $addFields: {
          user: '$user.name',
          coverDate: {
            $toDate: '$createTime'
          }
        }
      }
      const project = {
        $project: {
          _id: 1,
          createDate: {
            $dateToString: {
              format: '%Y-%m',
              date: '$coverDate',
              // 解决聚合查询时时间转换差1天的问题
              timezone: '+08'
            }
          },
          title: 1,
          user: 1
        }
      }
      const groupByDateAndUser = {
        $group: {
          _id: {
            createDate: '$createDate',
            user: '$user'
          },
          count: {
            $sum: 1
          }
        }
      }
      const finalProject = {
        $project: {
          _id: 0,
          date: '$_id.createDate',
          user: '$_id.user',
          count: 1
        }
      }
      const users = await User.find(null, { _id: 0, name: 1 })
      const data = await Blog.aggregate([lookup, unwind, addFields, project, groupByDateAndUser, finalProject])
      res.status(200).send({
        success: true,
        data,
        users
      })
    } catch (e) {
      next(e)
    }
  },
  // 获取类别占比数据
  async getCategoryProportionData(req, res, next) {
    try {
      const lookup = {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'categories'
        }
      }
      const unwind = {
        $unwind: '$categories'
      }
      const addFields = {
        $addFields: {
          categoryName: '$categories.name'
        }
      }
      const project = {
        $project: {
          _id: 1,
          title: 1,
          categoryName: 1
        }
      }
      const group = {
        $group: {
          _id: '$categoryName',
          count: {
            $sum: 1
          }
        }
      }
      const data = await Blog.aggregate([lookup, unwind, addFields, project, group])
      res.status(200).send({
        success: true,
        data
      })
    } catch (e) {
      next(e)
    }
  },
  // 获取标签占比数据
  async getTagProportionData(req, res, next) {
    try {
      const unwindTags = {
        $unwind: '$tags'
      }
      const lookup = {
        $lookup: {
          from: 'tags',
          localField: 'tags',
          foreignField: '_id',
          as: 'tags'
        }
      }
      const unwind = {
        $unwind: '$tags'
      }
      const addFields = {
        $addFields: {
          tagName: '$tags.name'
        }
      }
      const project = {
        $project: {
          _id: 1,
          title: 1,
          tagName: 1
        }
      }
      const group = {
        $group: {
          _id: '$tagName',
          count: {
            $sum: 1
          }
        }
      }
      const data = await Blog.aggregate([unwindTags, lookup, unwind, addFields, project, group])
      res.status(200).send({
        success: true,
        data
      })
    } catch (e) {
      next(e)
    }
  }
}
