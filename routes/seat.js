const express = require('express')
const router = express.Router()


// 控制逻辑
var seat_controller = require('../controller/seat.js')

// 获取所有被预定座位表
router.get('/getAllSeat',seat_controller.getAllSeat)
// 获取当前电影的座位表
router.get('/getSeatById',seat_controller.getSeatById)
// 新增电影座位
router.post('/setSeatList',seat_controller.setSeatList)
// 新增电影座位
router.delete('/releaseSeat',seat_controller.releaseSeat)

module.exports = router