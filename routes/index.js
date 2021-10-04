var express = require('express');
var router = express.Router();

// 首先应该引入User模块
const User = require('../models/User')
const Foods = require('../models/Foods')
const Bests = require('../models/Bests');
const Focus = require('../models/Focus');
const BasksModel = require('../models/Bask');
const NewsModel = require('../models/News');

//设置跨域访问
// router.all('*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//   res.header("X-Powered-By",' 3.2.1')
//   res.header("Content-Type", "application/json;charset=utf-8");
//   next();
// });

// 注册
router.post('/register', (req, res) => {
  // 获取参数
  const { username, password } = req.body
  // 查询数据库是否有该用户
  User.find({ username }, (err, data) => {
    if (err) return
    if (data.length !== 0) {
      // 说明用户已注册
      res.send({ code: 1, msg: '用户名已注册' })
    } else {
      // 往数据库新加一条数据
      User.create({
        username,
        password
      }, (err, data) => {
        if (!err) {
          console.log(data);
          res.send({ code: 0, msg: '注册成功' })
        }
      })
    }
  })
})

// 登陆
router.post('/login', (req, res) => {
  // 获取参数
  const { username, password } = req.body
  // 判断参数与数据库数据是否一致
  User.find({ username }, (err, data) => {
    if (err) res.send({ code: 1, msg: '数据库查询失败了！' })
    if (data.length === 0) {
      // 说明用户没有注册，应该先让注册
      res.send({ code: 1, msg: '该用户没有进行注册' })
    } else {
      // console.log(data);
      if (data[0].username === username && data[0].password === password) {
        res.send({ code: 0, msg: '登陆成功' })
      } else {
        res.send({ code: 1, msg: '用户名或密码错误' })
      }
    }

  })
})

// 甜点信息
router.get('/foods', (req, res) => {
  // 查找数据库相关的信息
  Foods.find((err, data) => {
    if (err) res.send({ code: 1, err })
    res.send({ code: 0, data })
  })
})

// 根据food的_id去查找对应的食物信息
router.get('/food_id', (req, res) => {
  // 拿到当前路由的_id
  let id = req.query._id
  let arr = []
  Foods.find((err, data) => {
    if (err) res.send({ code: 1, msg: '网络繁忙' })
    // console.log(data);
    for (let i = 0; i < data.length; i++) {
      if (data[i]._id === id) {
        arr.push(data[i])
      }
    }
    res.send({ code: 0, data: arr })
  })
})

// 根据关键字模糊查询food
router.get('/food_key', (req, res) => {
  // 获取参数
  const searchText = req.query.searchText
  if (searchText === "") {
    res.send({ code: 0, msg: '关键字不能为空' })
  } else {
    // 将关键字写入表达式中
    let reg = new RegExp(searchText, "ig")
    Foods.find({
      $or: [ //多条件，数组
        { 'foodTitle': { $regex: reg } }
      ]
    }, (err, data) => {
      if (err) res.send({ code: 1, msg: '网络繁忙' })
      console.log(data);
      if (data.length === 0) {
        res.send({ code: 1, msg: '暂无相关物品！' })
      } else {
        res.send({ code: 0, data })
      }
    })
  }
})



// 精品信息
router.get('/best', (req, res) => {
  // 查找数据库相关的信息
  Bests.find((err, data) => {
    if (err) res.send({ code: 1, err })
    res.send({ code: 0, data })
  })
})

// 查找关注信息
router.get('/focus', (req, res) => {
  // 查找数据库相关的信息
  Focus.find((err, data) => {
    if (err) res.send({ code: 1, err })
    res.send({ code: 0, data })
  })
})

// 获取晒单信息
router.get('/bask', (req, res) => {
  // 查找数据库相关的信息
  BasksModel.find((err, data) => {
    if (err) res.send({ code: 1, err })
    res.send({ code: 0, data })
  })
})

// 获取推荐信息
router.get('/news', (req, res) => {
  // 查找数据库相关的信息
  NewsModel.find((err, data) => {
    if (err) res.send({ code: 1, err })
    res.send({ code: 0, data })
  })
})

module.exports = router;
