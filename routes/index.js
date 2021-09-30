var express = require('express');
var router = express.Router();
// 首先应该引入User模块
const User = require('../models/User')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send({ code: 0, str: 'aaa' })
});

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

module.exports = router;
