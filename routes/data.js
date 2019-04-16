var express = require('express');
var fs = require('fs-extra');
var path = require('path'); //系统路径模块
var router = express.Router();

router.get('/', function (req, res, next) {
  console.log(req.url)  // 请求头
  // console.log(req.query)    // 请求参数
  res.set('content-type', 'application/json; charset=utf8')
  fs.readFile('public/mock/a.json', function(err, data) {
    // 读取文件失败/错误
    if (err) {
        console.log(err)
    }
    // 读取文件成功
    else{
      res.render('data',{
        code:200,
        data
      });
    }
  });
});

router.post('/', function (req, res, next) {
  // console.log(req.url)  // 请求头
  // console.log(req.body)    // 请求参数
  res.set('content-type', 'application/json; charset=utf8')
  let xx = null
  fs.readFile('public/mock/a.json', function(err, data) {
    console.log(data)
    xx = JSON.parse(data)
    // 读取文件失败/错误
    if (err) {
        console.log(err)
    }
    // 读取文件成功
    else{
      xx.list.push('hahaaha')
      let aa = JSON.stringify(xx)
      console.log(aa)
      fs.writeFile('public/mock/b.json', aa )
      res.render('data',{
        code:200,
        data
      });
    }
  });

 
  // fs.writeFile('public/mock/b.json', aa , function(err) {
  //   // if (err) {
  //   //     throw err;
  //   // }
  
  //   console.log('Saved.');
  
    // 写入成功后读取测试
    // fs.readFile('public/mock/a.json', function(err, data) {
    //     if (err) {
    //         throw err;
    //     }
    //     console.log(data);
    // });
  // });
});



module.exports = router; 
