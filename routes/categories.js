const router = require('express').Router()
const controller = require('../controllers/categories')
const validateToken = require('../middlewares/validateToken')
const permission = require('../middlewares/permission')

router.get('/', controller.getAllCategories)
router.post('/', validateToken, permission.isAdmin, controller.createCategory)
router.put('/:id', validateToken, permission.isAdmin, controller.updateCategoryById)
router.delete('/:id', validateToken, permission.isAdmin, controller.deleteCategoryById)

module.exports = router
