const mongoose = require('mongoose')

const Schema = mongoose.Schema

const blogSchema = new Schema({
  // 标题
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  // 正文
  content: {
    type: String,
    required: true,
    trim: true
  },
  // 创建时间
  createTime: {
    type: Number,
    default: new Date().getTime()
  },
  // 更新时间
  updateTime: {
    type: Number,
    default: null
  },
  // 文章所属分类 类别Id
  category: {
    type: String,
    default: null
  },
  // 文章所属标签 标签Id
  tags: {
    type: Array,
    default: []
  },
  // 阅读次数
  views: {
    type: Number,
    default: 0
  },
  // 点赞用户 用户Id
  likes: {
    type: Array,
    default: []
  },
  // 作者ID
  author: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Blog', blogSchema)