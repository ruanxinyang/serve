const express = require('express');
const router = express.Router();

const user_handler = require('../router_handler/user');
const sql_handler = require('../router_handler/sql')
//导入验证数据的中间件
const expressJoi = require('@escook/express-joi');
const {reg_login_schema} = require('../schema/user'); 
router.post('/reguser',expressJoi(reg_login_schema),user_handler.regUser)
router.post('/login',user_handler.login)
router.post('/exit',user_handler.exit)
router.post('/run',user_handler.run)
router.post('/sqlList',sql_handler.sqlList)
router.post('/addSql',sql_handler.addSql)
router.post('/deleteSql',sql_handler.deleteSql)
router.post('/tables',sql_handler.tables)
router.post('/fetchTable',sql_handler.fetchTable)
const buy_handler = require('../router_handler/buy.js')
router.post('/buy',buy_handler.sumbit)
router.post('/track',buy_handler.track)
module.exports = router;