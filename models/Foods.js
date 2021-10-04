const mongoose = require('mongoose')
// 创建一张用户表
const FoodSchema = new mongoose.Schema({
  _id:String,
  foodTitle:String,
  foodSite:String,
  distance:String,
  content:String
})
// 映射对象
const FoodsModel = mongoose.model('Foods',FoodSchema)

// 暴露对象
module.exports = FoodsModel