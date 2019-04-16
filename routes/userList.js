var express = require('express');
var router = express.Router();

// 控制逻辑
var userList_controller = require('../controller/userList.js')


// 获取用户列表数据
router.get('/dataList',userList_controller.onGetUserList)
// 用户登录
router.post('/sign', userList_controller.onSign) 

module.exports = router;
