const mongoose = require('mongoose')
// 创建一张用户表
const UserSchema = new mongoose.Schema({
  username:String,
  password:String,
  user_avatar:String,
})
// 映射对象
const UserModel = mongoose.model('User',UserSchema)

// 暴露对象
module.exports = UserModel