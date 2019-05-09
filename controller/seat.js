const fs = require('fs-extra')
const url = require('url')
const querystring = require('querystring')
// 获取所有座位表
const getAllSeat = (req , res , next) => {
  res.set('content-type', 'application/json; charset=utf8')
  fs.readFile('public/mock/seat.json', function (err, data) {
    let dataScore  = JSON.parse(data)
    if (err) {
      res.render('data', {
        code: 500,
        msg : JSON.stringify({msg:'发送了不可预知的错误，请重试'}),
        data: JSON.stringify({msg:'发送了不可预知的错误，请重试'}),
      });
    } else {
      if(!dataScore.length){
        data = "[]"
      }
      res.render('data', {
        code: 200,
        msg : JSON.stringify({msg:'获取成功'}),
        data
      });
    }
  })
}

// 根据Id获取座位表
const getSeatById = (req, res, next) => {
  res.set('content-type', 'application/json; charset=utf8')
  fs.readFile('public/mock/seat.json', function (err, data) {
    let dataScore  = JSON.parse(data)
    if (err) {
      let msg = JSON.stringify({msg:'发送了不可预知的错误，请重试'})
      res.render('data', {
        code: 500,
        msg:msg,
        data: msg
      });
    } else {
      if(!dataScore.length){
        data = '[]'
      }else{
        let arg = url.parse(req.url).query;
        let params = querystring.parse(arg);
        dataScore.some(item=>{
          if(item.movieId == params.movieId && item.sceneId == params.sceneId){
            data = JSON.stringify(item.movieSeat)
            return true
          }else{
            data = '[]'
          }
        })
      }
      res.render('data', {
        code: 200,
        msg : JSON.stringify({msg:'查询成功'}),
        data
      });
    }
  })
}

// 新增座位表
const setSeatList = (req, res, next) => {

  res.set('content-type', 'application/json; charset=utf8')
  fs.readFile('public/mock/seat.json', function (err, data) {
    if (err) {
      res.render('data', {
        code: 500,
        msg : JSON.stringify({msg:'发送了不可预知的错误，请重试'}),
        data: JSON.stringify({msg:'发送了不可预知的错误，请重试'}),
      });
    } else {
      let dataScore = JSON.parse(data)     // 数据库中的数据 
      let reqBody = req.body   // 请求中body的参数
      let movieId = reqBody.movieId
      let seatList = reqBody.seatList
      let movieName = reqBody.movieName
      let sceneId = reqBody.sceneId
      if(!dataScore.length){
        dataScore.unshift({
          movieId,
          movieName,
          sceneId,
          movieSeat:seatList,
        })
      }else{
        let hasSome = false
        dataScore.some((item,index)=>{ 
          if(item.movieId == reqBody.movieId && item.sceneId == reqBody.sceneId){
           let newMovieSeat = [...reqBody.seatList,...item.movieSeat]
           dataScore[index].movieSeat = newMovieSeat
           hasSome = true
           return true
          }
        })
        if(!hasSome){
          dataScore.unshift({
             movieId,
             movieName,
             sceneId,
             movieSeat:seatList,
           })
         }
      }
      fs.writeFile('public/mock/seat.json', JSON.stringify(dataScore))
      res.render('data', {
        code: 200,
        msg :JSON.stringify({msg:'添加座位成功'}),
        data:JSON.stringify({msg:'添加座位成功'})
      });
    }
  })
}

// 释放座位
const releaseSeat = (req,res,next)=>{
  res.set('content-type', 'application/json; charset=utf8')
  fs.readFile('public/mock/seat.json', function (err, data) {
    if (err) {
      res.render('data', {
        code: 500,
        msg : JSON.stringify({msg:'发送了不可预知的错误，请重试'}),
        data: JSON.stringify({msg:'发送了不可预知的错误，请重试'}),
      });
    } else {
      let dataScore = JSON.parse(data)     // 数据库中的数据 
      let reqBody = req.body   // 请求中body的参数
      let newDataScore = dataScore.filter(item=>item.movieId !== reqBody.movieId && item.sceneId !== reqBody.sceneId)
      fs.writeFile('public/mock/seat.json', JSON.stringify(newDataScore))
      res.render('data', {
        code: 200,
        msg :JSON.stringify({msg:'操作成功'}),
        data:JSON.stringify({msg:'操作成功'})
      });
    }
  })
}

module.exports = {
  getAllSeat,
  getSeatById,
  setSeatList,
  releaseSeat
}