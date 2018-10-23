const router = require('express').Router()
// 用户信息相关路由
const users = require('./users')
// 博文信息相关路由
const blogs = require('./blogs')
// 用户信息相关操作
const usersController = require('../controllers/users')

router.post('/login', usersController.login)
router.post('/register', usersController.register)
router.use('/users', users)
router.use('/blogs', blogs)

module.exports = router