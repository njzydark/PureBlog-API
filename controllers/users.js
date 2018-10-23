const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/users')

module.exports = {
  async login(req, res, next) {
    const {
      name,
      password
    } = req.body
    if (!name || !password) {
      return res.status(400).send({
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
            name: user.name,
            role: user.role
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
          res.status(401).send({
            success: false,
            message: '密码错误，登录失败'
          })
        }
      } else {
        res.status(401).send({
          success: false,
          message: '用户不存在，登录失败'
        })
      }
    } catch (e) {
      next(e)
    }
  },
  async register(req, res, next) {
    const {
      name,
      password,
      email
    } = req.body
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
      next(e)
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
      next(e)
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
      next(e)
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
      next(e)
    }
  }
}