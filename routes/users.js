const router = require('express').Router()
const controller = require('../controllers/users')
const validateToken = require('../middlewares/validateToken')
const isAdmin = require('../middlewares/isAdmin')

router.get('/', validateToken, isAdmin, controller.getAllUsers)
router.get('/:id', validateToken, isAdmin, controller.getUserById)
router.delete('/:id', validateToken, isAdmin, controller.deleteUserById)

module.exports = router