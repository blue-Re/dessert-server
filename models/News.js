const mongoose = require('mongoose')
// 创建一张用户表
const NewsSchema = new mongoose.Schema({
  _id:String,
  avatarUrl:String,
  author:String,
  content:String,
  imgList:Array,
})
// 映射对象
const NewsModel = mongoose.model('News',NewsSchema)

// 暴露对象
module.exports = NewsModel