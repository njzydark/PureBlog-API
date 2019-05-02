const router = require('express').Router()
const controller = require('../controllers/statistic')
const validateToken = require('../middlewares/validateToken')

router.get('/allCount', validateToken, controller.getAllCount)
router.get('/blogCountTrend', validateToken, controller.getBlogCountTrend)
router.get('/categoryProportionData', validateToken, controller.getCategoryProportionData)
router.get('/tagProportionData', validateToken, controller.getTagProportionData)

module.exports = router
