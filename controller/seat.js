const fs = require('fs-extra')

// 获取所有座位表
const getAllSeat = (req , res , next) => {
  res.set('content-type', 'application/json; charset=utf8')
  fs.readFile('public/mock/seat.json', function (err, data) {
    let dataScore  = JSON.parse(data)
    if (err) {
      res.render('data', {
        code: 500,
        data: '发送了不可预知的错误，请重试'
      });
    } else {
      if(!dataScore.length){
        data = "[]"
      }
      res.render('data', {
        code: 200,
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
      res.render('data', {
        code: 500,
        data: '发送了不可预知的错误，请重试'
      });
    } else {
      if(!dataScore.length){
        data = "[]"
      }else{
        let arg = url.parse(req.url).query;
        let params = querystring.parse(arg);
        dataScore.some(item=>{
          if(item.movieId == params.movieId){
            data = item.movieSeat
            return true
          }else{
            data = '[]'
          }
        })
      }
      res.render('data', {
        code: 200,
        data:JSON.stringify(data)
      });
    }
  })
}

// 新增座位表
const setSeatList = (req, res, next) => {
  res.set('content-type', 'application/json; charset=utf8')

  res.set('content-type', 'application/json; charset=utf8')
  fs.readFile('public/mock/seat.json', function (err, data) {
    if (err) {
      res.render('data', {
        code: 500,
        data: '发送了不可预知的错误，请重试'
      });
    } else {
      let dataScore = JSON.parse(data)     // 数据库中的数据 
      let reqBody = req.body   // 请求中body的参数
      let movieId = reqBody.movieId
      let seatList = reqBody.seatList
      if(!dataScore.length){
        dataScore.push({
          movieId,
          movieSeat:seatList
        })
      }else{
        dataScore.some((item,index)=>{
          if(item.movieId == reqBody.movieId){
           let newMovieSeat = [...reqBody.seatList,...item.movieSeat]
           dataScore[index].movieSeat = newMovieSeat
          }else{
            dataScore.push({
              movieId,
              movieSeat:seatList
            })
          }
        })
      }
      fs.writeFile('public/mock/seat.json', JSON.stringify(dataScore))
      res.render('data', {
        code: 200,
        data:'添加座位成功'
      });
    }
  })
}

module.exports = {
  getAllSeat,
  getSeatById,
  setSeatList
}