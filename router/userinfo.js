const express = require('express')
const router = express.Router();
const joi = require('@escook/express-joi')
const {update_userinfo_schema, update_password_schema, update_avatar_schema} = require('../schema/user')


const userinfo_handler = require('../router_handler/userinfo');
const expressJoi = require('@escook/express-joi');
router.get('/userinfo',userinfo_handler.getuserinfo)

router.post('/userinfo',expressJoi(update_userinfo_schema),userinfo_handler.updateuserinfo)
router.post('/updatepwd',expressJoi(update_password_schema),userinfo_handler.updateuserpwd)
router.post('/update/avatar',expressJoi(update_avatar_schema),userinfo_handler.updateAvatar)
module.exports =router; 