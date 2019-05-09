const mongoose = require('mongoose')

const Schema = mongoose.Schema

const tagSchema = new Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    required: true
  },
  // 状态 0 禁用 1 正常
  status: {
    type: Number,
    default: 1
  }
})

module.exports = mongoose.model('Tag', tagSchema)
