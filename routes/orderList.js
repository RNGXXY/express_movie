var express = require('express');
var router = express.Router();

// 控制逻辑
var orderList_controller = require('../controller/orderList.js')


// 获取订单列表数据
router.get('/dataList',orderList_controller.onGetOrderList)
// 获取某用户订单列表数据
router.get('/dataListByUser',orderList_controller.onGetOrderListByUser) 
// 增加订单
router.post('/addOrder',orderList_controller.onAddOrder)


module.exports = router;
