const router = require('express').Router()
// 用户信息相关路由
const users = require('./users')

// 验证token合法性
const validateToken = require('../middlewares/validateToken')
// 是否具有admin权限
const isAdmin = require('../middlewares/isAdmin')
// 用户信息相关操作
const usersController = require('../controllers/users')

router.post('/login', usersController.login)
router.post('/register', usersController.register)
router.use('/users', validateToken, isAdmin, users)

module.exports = router