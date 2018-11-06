const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const environment = process.env.NODE_ENV
const stage = require('../config')[environment]

const Schema = mongoose.Schema

const userSchema = new Schema({
  // 用户名
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  // 密码
  password: {
    type: String,
    required: true,
    trim: true
  },
  // 角色
  role: {
    type: String,
    default: 'user'
  },
  // 邮箱
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  // 头像
  avatar: {
    type: String,
    trim: true
  }
})

userSchema.pre('save', function(next) {
  const user = this
  if (!user.isModified || !user.isNew) {
    next()
  } else {
    bcrypt.hash(user.password, stage.saltingRounds, function(err, hash) {
      if (err) {
        console.log('密码加盐失败 ', user.name)
        next(err)
      } else {
        user.password = hash
        next()
      }
    })
  }
})

module.exports = mongoose.model('User', userSchema)