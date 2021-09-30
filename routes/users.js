var express = require('express');
var router = express.Router();
// 首先应该引入User模块
const User = require('../models/User')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({code:1});
});

router.post('/login',(req,res)=>{
  
})


module.exports = router;
