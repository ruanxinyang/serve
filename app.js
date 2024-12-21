const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const userRouter = require('./router/user.js')
const detail = require('./router/detail.js')
app.use(function (req, res, next) {
  // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
  res.cc = function (err, status = 404) {
    res.send({
      // 状态
      status,
      // 状态描述，判断 err 是 错误对象 还是 字符串
      message: err instanceof Error ? err.message : err,
    })
  }
  next()
})
app.use(detail)
app.use(cors())
//配置解析表单的中间件
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use('/api',userRouter)
// 响应数据的中间件

const joi = require('joi')
// 错误中间件
app.use(function (err, req, res, next) {
  // 数据验证失败
  if (err instanceof joi.ValidationError) return res.cc(err)
  // 未知错误
  res.cc(err)
})
app.listen(3017,()=>{
    console.log('已启动');
})