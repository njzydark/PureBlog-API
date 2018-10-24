const router = require('express').Router()
const controller = require('../controllers/blogs')
const validateToken = require('../middlewares/validateToken')
const permission = require('../middlewares/permission')

router.get('/', controller.getAllBlogs)
router.get('/:id', controller.getBlogById)
router.post('/', validateToken, controller.createBlog)
router.put('/:id', validateToken, permission.checkBlogId, controller.updateBlogById)
router.delete('/:id', validateToken, permission.checkBlogId, controller.deleteBlogById)

module.exports = router