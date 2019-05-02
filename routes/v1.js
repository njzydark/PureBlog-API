const router = require('express').Router()
// 用户信息相关路由
const users = require('./users')
// 博文信息相关路由
const blogs = require('./blogs')
// 类别信息相关路由
const categories = require('./categories')
// 标签信息相关路由
const tags = require('./tags')
// 统计信息相关路由
const statistic = require('./statistic')
// 用户信息相关操作
const usersController = require('../controllers/users')

router.post('/login', usersController.login)
router.post('/register', usersController.register)
router.use('/users', users)
router.use('/blogs', blogs)
router.use('/categories', categories)
router.use('/tags', tags)
router.use('/statistic', statistic)

module.exports = router
