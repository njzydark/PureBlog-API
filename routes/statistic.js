const router = require('express').Router()
const controller = require('../controllers/statistic')
const validateToken = require('../middlewares/validateToken')

router.get('/allCount', validateToken, controller.getAllCount)
router.get('/blogCountTrend', validateToken, controller.getBlogCountTrend)
router.get('/categoryProportionData', validateToken, controller.getCategoryProportionData)
router.get('/tagProportionData', validateToken, controller.getTagProportionData)
router.get('/blogArchive', controller.getBlogArchive)
router.get('/userInfo', controller.getUserInfo)

module.exports = router
