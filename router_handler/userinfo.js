const db =require('../db/index')
const bcrypt =require('bcryptjs')
exports.getuserinfo = (req,res)=>{
    const sql =  'select * from users where id=?';
    db.query(sql,req.user.id,(err,results)=>{
        if(err) return res.cc(err)
        if(results.length !== 1) return res.cc('获取用户信息失败!')

        res.send({
            status:0,
            message:'获取成功',
            data:{...results[0],password:''}
        })
    })
} 
exports.updateuserinfo = (req,res)=>{
    const sql = 'update users set ? where id=?';
    db.query(sql,[req.body,req.body.id],(err,results)=>{
        if(err)return res.cc(err.message);
        if(results.affectedRows !== 1)return res.cc('更新失败');
        res.cc('更新成功');
    })
}
exports.updateuserpwd = (req,res)=>{
    const sql = 'select * from users where id=?'
    db.query(sql,req.user.id,(err,results)=>{
        if(err)return res.cc(err)
        if(results.length !==1)return res.cc('用户不存在')
        //判断提交的旧密码是否正确
        const compareResult = bcrypt.compareSync(req.body,oldPwd,results[0].password )
        if(!compareResult)return res.cc('密码错误');
        const sql = 'update users set password=? where id=?'
        const newPwd = bcrypt.hashSync(req.body.newPwd,10)
        db.query(sql,[newPwd,req.body.id],(err,results)=>{
            if(err)return res.cc(err)
            if(results.affectedRows !==1)return res.cc('更新密码失败')
        })
        res.cc('更新成功')
    })
}
exports.updateAvatar = (req,res)=>{
    const sql = 'update users set user_pic=? where id=?'
    db.query(sql,[req.body.avatar,req.user.id],(err,results)=>{
        if(err) return res.cc(err);
        if(results.affectedRows !==1)return res.cc('更新失败')
        res.cc('更新成功')
    })
}