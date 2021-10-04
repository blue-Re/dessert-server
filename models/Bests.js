const mongoose = require('mongoose')
// 创建一张用户表
const BestSchema = new mongoose.Schema({
  _id:String,
  content:String,
  imgList:Array,
  author:String,
  seeCount:String
})
// 映射对象
const BestsModel = mongoose.model('Bests',BestSchema)

// 暴露对象
module.exports = BestsModel