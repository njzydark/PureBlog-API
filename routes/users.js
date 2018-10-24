const router = require('express').Router()
const controller = require('../controllers/users')
const validateToken = require('../middlewares/validateToken')
const permission = require('../middlewares/permission')

router.get('/', validateToken, permission.isAdmin, controller.getAllUsers)
router.get('/:id', validateToken, permission.checkUserId, controller.getUserById)
router.delete('/:id', validateToken, permission.checkUserId, controller.deleteUserById)

module.exports = router