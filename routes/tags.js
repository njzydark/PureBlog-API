const router = require('express').Router()
const controller = require('../controllers/tags')
const validateToken = require('../middlewares/validateToken')
const permission = require('../middlewares/permission')

router.get('/', controller.getAllTags)
router.post('/', validateToken, permission.isAdmin, controller.createTag)
router.put('/:id', validateToken, permission.isAdmin, controller.updateTagById)
router.delete('/:id', validateToken, permission.isAdmin, controller.deleteTagById)

module.exports = router