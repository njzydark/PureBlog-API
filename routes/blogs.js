const router = require('express').Router()
const controller = require('../controllers/blogs')
const validateToken = require('../middlewares/validateToken')

router.get('/', controller.getAllBlogs)
router.get('/:id', controller.getBlogById)
router.post('/', validateToken, controller.createBlog)
router.put('/:id', validateToken, controller.updateBlogById)
router.delete('/:id', validateToken, controller.deleteBlogById)

module.exports = router