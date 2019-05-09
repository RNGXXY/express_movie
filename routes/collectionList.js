var express = require('express');
var router = express.Router();

// 控制逻辑
var collectionList_controller = require('../controller/collectionList.js')


// 获取所有列表数据
router.get('/dataList',collectionList_controller.onGetAllList)
// // 获取某用户列表数据
router.get('/dataListByUser', collectionList_controller.onGetUserList) 
// 增加
router.post('/addData',collectionList_controller.onAddData)
// 删除
router.post('/removeData',collectionList_controller.onRemoveData)

module.exports = router;
