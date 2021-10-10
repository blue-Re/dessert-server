const mongoose = require('mongoose')
// 创建一张用户表
const RemarkSchema = new mongoose.Schema({
  food_id:String,
  username:String,
  content:String,
  time:Date
})
// 映射对象
const RemarkModel = mongoose.model('Remark',RemarkSchema)

// 暴露对象
module.exports = RemarkModel