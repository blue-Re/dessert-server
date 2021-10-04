const mongoose = require('mongoose')
// 创建一张用户表
const BaskSchema = new mongoose.Schema({
  _id:String,
  foodUrl:String,
})
// 映射对象
const BasksModel = mongoose.model('Bask',BaskSchema)

// 暴露对象
module.exports = BasksModel