const db = require('../db/index')

exports.getDetailList = (req,res) =>{
    const sql ='select commodity_name,commodity_id,retail_price,picture,commodity_type_id from product'
    db.query(sql,(err,results)=>{
        if(err) return res.cc(err)
        

const ordersByOrderId = results.reduce((acc, item) => {
  const orderId = item.commodity_type_id
  if (!acc[orderId]) {
    acc[orderId] = {
      class_id: orderId,
      goods: []
    }
  }
  acc[orderId].goods.push({
      product_id:item.commodity_id,
      product_name:item.commodity_name,
      price:item.retail_price,
      image_url:item.picture
  })
  return acc
}, {})


        res.send({
            status:200,
            message:'获取商品列表成功',
            data:Object.values(ordersByOrderId)
        })
    })
} 