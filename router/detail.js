const express = require('express')
const router = express.Router()
const detail_handler = require('../router_handler/detail.js')
router.get('/detail',detail_handler.getDetailList)
module.exports = router