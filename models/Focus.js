const mongoose = require('mongoose')
// 创建一张用户表
const FocusSchema = new mongoose.Schema({
  _id:String,
  content:String,
  imgList:Array,
  author:String,
  seeCount:String,
  avatarUrl:String,
})
// 映射对象
const FocusModel = mongoose.model('Focus',FocusSchema)

// 暴露对象
module.exports = FocusModel