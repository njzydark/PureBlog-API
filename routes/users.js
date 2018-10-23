const router = require('express').Router()
const controller = require('../controllers/users')

router.get('/', controller.getAllUsers)
router.get('/:id', controller.getUserById)
router.delete('/:id', controller.deleteUserById)

module.exports = router