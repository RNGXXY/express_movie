const express = require('express')
const router = express.Router()


// 控制逻辑
var seat_controller = require('../controller/seat.js')

// 获取素有座位表
router.get('/getAllSeat',seat_controller.getAllSeat)
// 获取当前电影的座位表
router.get('/getSeatById',seat_controller.getSeatById)
// 新增电影座位表
router.post('/setSeatList',seat_controller.setSeatList)

module.exports = router