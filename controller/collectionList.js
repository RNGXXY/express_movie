var fs = require('fs-extra');

var url = require("url");
var querystring = require("querystring");

var _id = 100001   // 基础orderId

// 获取订单列表
const onGetAllList = (req, res, next) => {
  res.set('content-type', 'application/json; charset=utf8')
  fs.readFile('public/mock/collectionList.json', function (err, data) {
    let dataScore  = JSON.parse(data)
    if (err) {
      res.render('data', {
        code: 500,
        msg : JSON.stringify({msg:'发送了不可预知的错误，请重试'}),
        data : JSON.stringify({msg:'发送了不可预知的错误，请重试'})
      });
    } else {
      if(!dataScore.length) data='[]'
      res.render('data', {
        code: 200,
        msg : JSON.stringify({msg:'获取成功'}),
        data 
      });
    }
  })
}

// 获取用户的订单列表
const onGetUserList = (req, res, next) => {
  res.set('content-type', 'application/json; charset=utf8')
  fs.readFile('public/mock/collectionList.json', function (err, data) {
    if (err) {
      res.render('data', {
        code: 500,
        msg : JSON.stringify({msg:'发送了不可预知的错误，请重试'}),
        data : JSON.stringify({msg:'发送了不可预知的错误，请重试'})
      });
    } else {
      let arg = url.parse(req.url).query;
      let params = querystring.parse(arg);
      let dataScore  = JSON.parse(data)
      let dataList = dataScore.filter(item=>item.userId==params.userId)
      if(!dataList.length) dataList='[]'
      res.render('data', {
        code: 200,
        msg : JSON.stringify({msg:'获取成功'}),
        data:JSON.stringify(dataList)
      });
    }
  })
}

// 新增记录u
const onAddData = (req,res,next )=> {
  res.set('content-type', 'application/json; charset=utf8')
  fs.readFile('public/mock/collectionList.json', function (err, data) {
    let dataScore = JSON.parse(data)
    let reqBody = req.body
    let hasSame = false
    if(dataScore.length){
        dataScore.map(item=>{
            if(item.contId == reqBody.contId && item.userId == reqBody.userId) {
                hasSame = true
                return true
            }
        })
    }
    if(!hasSame){
        dataScore.unshift({
            id:String(_id+dataScore.length),
            userId:reqBody.userId,
            userName:reqBody.userName,
            contId:reqBody.contId,
            imgSrcV:reqBody.imgSrcV,
            movieName:reqBody.movieName,
            detailType:reqBody.detailType,
            area:reqBody.area,
            timeStamp:new Date().getTime()
          })
          fs.writeFile('public/mock/collectionList.json', JSON.stringify(dataScore))
    }
    if (err) {
      res.render('data', {
        code: 500,
        msg : JSON.stringify({msg:'发送了不可预知的错误，请重试'}),
        data : JSON.stringify({msg:'发送了不可预知的错误，请重试'})
      });
    } else {
      res.render('data', {
        code: 200,
        msg : JSON.stringify({msg:'成功'}),
        data : JSON.stringify({msg:'成功'}) 
      });
    }
  })
}

// 删除记录
onRemoveData = (req,res,next)=>{
  res.set('content-type', 'application/json; charset=utf8')
  fs.readFile('public/mock/collectionList.json', function (err, data) {
    let dataScore = JSON.parse(data)
    let reqBody = req.body
    if (err) {
      res.render('data', {
        code: 500,
        msg : JSON.stringify({msg:'发送了不可预知的错误，请重试'}),
        data : JSON.stringify({msg:'发送了不可预知的错误，请重试'})
      });
    } else {
      if(dataScore.length){
        let dataList = dataScore.filter(item=>item.userId != reqBody.userId && item.contId != reqBody.contId)
        fs.writeFile('public/mock/collectionList.json', JSON.stringify(dataList))
      }
      res.render('data', {
        code: 200,
        msg : JSON.stringify({msg:'成功'}),
        data : JSON.stringify({msg:'成功'}) 
      });
    }

  })
}

module.exports = {
    onGetAllList,
    onGetUserList,
    onAddData,
    onRemoveData
}