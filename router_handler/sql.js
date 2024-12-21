//在这里定义和用户相关的路由处理函数,供router/user.js模块使用

const bcrypt = require('bcryptjs');
const db = require('../db/index');
const jwt = require('jsonwebtoken')
const config = require('../config')
const uuid = require('uuid');
const checkToken = (token, callback,res) => {
    if (!token) {
        return res.send({ status: 404, message: '暂无权限' })
    }
    let sqlStr = `select username from users where token=?`;
    db.query(sqlStr, token, (err, results) => {
        if (err) {
            return res.send({ status: 404, message: err })
        }
        if (results.length <= 0) {
            return res.send({ status: 404, message: '暂无权限' })
        } else {
            callback(results)
        }
    })
}
module.exports.sqlList = (req, res) => {
    //获取客户端提供的用户数据
    const data = req.body
    const select = () => {
    const sql = `select * from action_sql where s_is_del = 1 and sql_name LIKE CONCAT('%','${data.sql_name||''}','%') LIMIT ${data.pageSize} OFFSET ${data.page}`
    const totalSql = `select count(*) as total from action_sql where s_is_del = 1 and sql_name LIKE CONCAT('%','${data.sql_name||''}','%')`
    
        db.query(sql,data.sql_name, (err2, results2) => {
            if (err2) {
                return res.send({ status: 404, message: err2 })
            }
            const list = results2;
            db.query(totalSql,data.sql_name, (err3, results3) => {
                if(err3){
                    return res.send({ status: 404, message: err3 })
                }
                return res.send({ status: 200, data: {intList: list, total: results3[0].total} })
            })
        })
    }
    checkToken(data.token, select, res)
}
module.exports.editSql = (req, res) => {
    //获取客户端提供的用户数据
    const data = req.body
    const select = (results) => {
    const sql = `UPDATE action_sql SET sql_name = '${data.sql_name}', sql = '${data.sql}',s_update_by='${results[0].username}' WHERE sql_id = '${data.sql_id}';`
        db.query(sql, (err2, results2) => {
            if (err2) {
                return res.send({ status: 404, message: err2.message })
            }
            return res.send({ status: 200, data: results2 })
        })
    }
    checkToken(data.token, select, res)
}
module.exports.addSql = (req, res) => {
    //获取客户端提供的用户数据
    const data = req.body
    const select = (results) => {
        const id = uuid.v7()
    const sql = `INSERT INTO action_sql (sql_id,s_create_by) VALUES ('${id}','${results[0].username}');`
        db.query(sql, (err2, results2) => {
            if (err2) {
                return res.send({ status: 404, message: err2.message })
            }
            return res.send({ status: 200, data: {sql_id: id, message: '新增成功'} })
        })
    }
    checkToken(data.token, select, res)
}
module.exports.deleteSql = (req, res) => {
    //获取客户端提供的用户数据
    const data = req.body
    const select = (results) => {
    const sql = `UPDATE action_sql SET s_is_del = 0, s_update_by='${results[0].username}' WHERE sql_id = '${data.sql_id}';`
        db.query(sql, (err2, results2) => {
            if (err2) {
                return res.send({ status: 404, message: err2.message })
            }
            return res.send({ status: 200, data: results2 })
        })
    }
    checkToken(data.token, select, res)
}