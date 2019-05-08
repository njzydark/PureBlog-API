const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/users')
const logger = require('../utils/logger')

module.exports = {
  async login(req, res, next) {
    const { name, password } = req.body
    if (!name || !password) {
      return res.status(200).send({
        success: false,
        message: '用户名或密码不能为空'
      })
    }
    try {
      const user = await User.findOne({
        name
      }).exec()
      if (user) {
        const match = await bcrypt.compare(password, user.password)
        if (match) {
          const payload = {
            id: user._id,
            role: user.role,
            name: user.name,
            avatar: user.avatar
          }
          const secret = process.env.JWT_SECRET
          const options = {
            expiresIn: process.env.JWT_EXPIRESIN,
            issuer: process.env.JWT_ISSUER
          }
          const token = jwt.sign(payload, secret, options)
          res.status(201).send({
            success: true,
            data: {
              user: payload,
              token
            }
          })
        } else {
          res.status(200).send({
            success: false,
            message: '密码错误，登录失败'
          })
        }
      } else {
        res.status(200).send({
          success: false,
          message: '用户不存在，登录失败'
        })
      }
    } catch (e) {
      logger.error(e.message)
      next(new Error(`登录失败`))
    }
  },
  async register(req, res, next) {
    const { name, password, email } = req.body
    if (!name || !password || !email) {
      return res.status(400).send({
        success: false,
        message: '用户名，密码或邮箱不能为空'
      })
    }
    try {
      const user = new User({
        name,
        password,
        email
      })
      const result = await user.save()
      res.status(201).send({
        success: true,
        data: result
      })
    } catch (e) {
      logger.error(e.message)
      next(new Error(`注册失败`))
    }
  },
  async getAllUsers(req, res, next) {
    try {
      const users = await User.find().exec()
      res.status(200).send({
        success: true,
        data: users
      })
    } catch (e) {
      logger.error(e.message)
      next(new Error(`获取所有用户信息失败`))
    }
  },
  async getUserById(req, res, next) {
    try {
      const user = await User.findById(req.params.id).exec()
      res.status(200).send({
        success: true,
        data: user
      })
    } catch (e) {
      logger.error(e.message)
      next(new Error(`获取用户信息失败`))
    }
  },
  async updateUserById(req, res, next) {
    const { name, email, avatar, introduction } = req.body
    if (!name || !email) {
      return res.status(400).send({
        success: false,
        message: '用户名或邮箱不能为空'
      })
    }
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { name, email, avatar, introduction },
        {
          new: true
        }
      ).exec()
      res.status(200).send({
        success: true,
        data: user
      })
    } catch (e) {
      logger.error(e.message)
      next(new Error(`用户信息更新失败`))
    }
  },
  async deleteUserById(req, res, next) {
    try {
      const result = await User.findByIdAndDelete(req.params.id).exec()
      res.status(200).send({
        success: true,
        data: result
      })
    } catch (e) {
      logger.error(e.message)
      next(new Error(`用户删除失败`))
    }
  }
}
