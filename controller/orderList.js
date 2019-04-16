var fs = require('fs-extra');

var url = require("url");
var querystring = require("querystring");

var baseOrderId = 100001   // 基础orderId

// 获取订单列表
const onGetOrderList = (req, res, next) => {
  res.set('content-type', 'application/json; charset=utf8')
  fs.readFile('public/mock/orderList.json', function (err, data) {
    if (err) {
      res.render('data', {
        code: 500,
        data: '发送了不可预知的错误，请重试'
      });
    } else {
      if(!data.length) data="[]"
      res.render('data', {
        code: 200,
        data:JSON.stringify(data)
      });
    }
  })
}

// 获取用户的订单列表
const onGetOrderListByUser = (req, res, next) => {
  res.set('content-type', 'application/json; charset=utf8')
  fs.readFile('public/mock/orderList.json', function (err, data) {
    if (err) {
      res.render('data', {
        code: 500,
        data: '发送了不可预知的错误，请重试'
      });
    } else {
      let arg = url.parse(req.url).query;
      let params = querystring.parse(arg);
      let dataScore  = JSON.parse(data)
      let dataList = dataScore.orderList.filter(item=>item.userId==params.userId)
      if(!dataList.length) dataList="[]"
      res.render('data', {
        code: 200,
        data:JSON.stringify(dataList)
      });
    }
  })
}

// 新增订单
const onAddOrder = async (req,res,next )=> {
  fs.readFile('public/mock/orderList.json', function (err, data) {
    let dataScore = JSON.parse(data)
    let reqBody = req.body
    dataScore.orderList.push({
      orderId:baseOrderId+dataScore.orderList.length,
      userId:reqBody.userId,
      movieId:reqBody.movieId,
      userName:reqBody.userName,
      orderTime:reqBody.orderTime,
      orderContent:reqBody.orderContent
    })
    fs.writeFile('public/mock/orderList.json', JSON.stringify(dataScore))
    if (err) {
      res.render('data', {
        code: 500,
        data: '发送了不可预知的错误，请重试'
      });
    } else {
      res.render('data', {
        code: 200,
        data: '登录成功'
      });
    }
  })
}



module.exports = {
  onGetOrderList,
  onGetOrderListByUser,
  onAddOrder,
}