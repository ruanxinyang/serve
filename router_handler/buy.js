const db = require('../db/index')

exports.sumbit = (req,res) =>{
    let info = req.body
    const sql ='insert into orders set ?;'
    db.query(sql,{order_id:info.id,order_staus:0,count:info.count,price_sum:info.price_sum,order_remark:info.order_remark,user_id:info.user_id},(err,results)=>{
        if(err) return res.cc(err)
        const orderId = info.id;
        
//         const formattedData = info.paylist.replace(/([a-zA-Z0-9_]+?):/g, '"$1":');
// const paylist = JSON.parse(formattedData);
    info.paylist.forEach((item)=>{
          db.query('insert into order_item set ?;',{order_id:orderId,product_id:item.product_id,sum:item.count,price:item.price,name:item.name,image:item.image
        },(err2,result)=>{
          if(err2) return res.cc(err2)
          
        })
      })
      res.send({
        status:0,
        message:'订单添加成功',
        data:results
    })
    })
} 
exports.track = (req,res) =>{
    const sql = 'select * from orders left join order_item on orders.order_id = order_item.order_id where user_id = ?;'
    db.query(sql,req.body.id,(err,results)=>{
        
        if(err) return res.cc(err)
        
        const ordersByOrderId = results.reduce((acc, item) => {
          const orderId = item.order_id
          if (!acc[orderId]) {
            acc[orderId] = {
              order_id: orderId,
              order_staus:item.order_staus,
              count:item.count,
              price_sum:item.price_sum,
              order_remark:item.order_remark,
              goods: []
            }
          }
          acc[orderId].goods.push({
            id:item.id,
            product_id: item.product_id,
            sum:item.sum,
            price:item.price,
            name:item.name,
            image:item.image
          })
          return acc
        }, {})
        
        
        res.send({
            status:0,
            message:'查询订单成功',
            data:Object.values(ordersByOrderId)
        })
    })
}