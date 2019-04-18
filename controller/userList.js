var fs = require('fs-extra');

var baseUserId = 100001   // 基础userId

// 获取用户列表
const onGetUserList = (req, res, next) => {
  res.set('content-type', 'application/json; charset=utf8')
  fs.readFile('public/mock/userList.json', function (err, data) {
    if (err) {
      res.render('data', {
        code: 500,
        msg : JSON.stringify({msg:'发送了不可预知的错误，请重试'}),
        data : JSON.stringify({msg:'发送了不可预知的错误，请重试'})
      });
    } else {
      if(!data.length) data=[]
      res.render('data', {
        code: 200,
        msg : JSON.stringify({msg:'获取成功'}),
        data
      });
    }
  })
}

// 登录，新用户进行数据增加
const onSign = (req, res, next) => {
  let reqBody = req.body
  let type = Object.keys(reqBody)[0]
  if (type == 'add') {
    fs.readFile('public/mock/userList.json', function (err, data) {
      let dataScore = JSON.parse(data)
      let hasSomeUser = false   // 有相同phoneNum的用户
      let resData = {}
      dataScore.userList.some((item, index) => {
        if (item.userPhone == reqBody.add.userPhone) {
          console.log('用户已存在')
          resData.userId = item.userId
          resData.userName = item.userName
          resData.userPhone = item.userPhone
          hasSomeUser = true
          return true
        }
      })
      if (!hasSomeUser) {
        reqBody.add.userId = String(baseUserId + dataScore.userList.length)
        reqBody.add.userName = '用户'+String(baseUserId + dataScore.userList.length)
        resData.userId = reqBody.add.userId
        resData.userName = reqBody.add.userName
        resData.userPhone = reqBody.add.userPhone
        dataScore.userList.unshift(reqBody.add)
        fs.writeFile('public/mock/userList.json', JSON.stringify(dataScore))
      }
      if (err) {
        res.render('data', {
          code : 500,
          msg : JSON.stringify({msg:'发送了不可预知的错误，请重试'}),
          data : JSON.stringify({msg:'发送了不可预知的错误，请重试'})
        });
      } else {
        res.render('data', {
          code : 200,
          msg :JSON.stringify({msg:'登录成功'}),
          data : JSON.stringify(resData)
        });
      }
    })
  }
}

module.exports = {
  onGetUserList,
  onSign
}