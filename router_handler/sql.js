//在这里定义和用户相关的路由处理函数,供router/user.js模块使用

const bcrypt = require('bcryptjs');
const db = require('../db/index');
const jwt = require('jsonwebtoken')
const config = require('../config')
const uuid = require('uuid');
const checkToken = (token, callback, res) => {
    if (!token) {
        return res.send({ status: 404, message: '暂无权限' })
    }
    let sqlStr = `select username,phone from users where token=?`;
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
        const sql = `select * from action_sql where s_is_del = 1 and sql_name LIKE CONCAT('%','${data.sql_name || ''}','%') order by s_create_time desc LIMIT ${data.pageSize} OFFSET ${data.page}`
        const totalSql = `select count(*) as total from action_sql where s_is_del = 1 and sql_name LIKE CONCAT('%','${data.sql_name || ''}','%')`

        db.query(sql, data.sql_name, (err2, results2) => {
            if (err2) {
                return res.send({ status: 404, message: err2 })
            }
            const list = results2;
            db.query(totalSql, data.sql_name, (err3, results3) => {
                if (err3) {
                    return res.send({ status: 404, message: err3 })
                }
                return res.send({ status: 200, data: { intList: list, total: results3[0].total } })
            })
        })
    }
    checkToken(data.token, select, res)
}
module.exports.addSql = (req, res) => {
    //获取客户端提供的用户数据
    const data = req.body
    const select = (results) => {
        const id = uuid.v7()
        if (!data.sql_name || !data.sql_content) {
            return res.send({ status: 404, data: '参数不能为空' })
        }
        if(data.sql_id){
            const sql2 = `UPDATE action_sql SET sql_name = '${data.sql_name}', sql_content = '${data.sql_content}',s_update_by='${results[0].phone}' WHERE sql_id = '${data.sql_id}';`
            db.query(sql2, (err2, results2) => {
                if (err2) {
                    return res.send({ status: 404, data: err2.message })
                }
                return res.send({ status: 200, data: results2 })
            })
        }else{
            const sql = `INSERT INTO action_sql (sql_name,sql_id,s_create_by,sql_content) VALUES ('${data.sql_name}','${id}','${results[0].phone}','${data.sql_content}');`
            db.query(sql, (err2, results2) => {
                if (err2) {
                    return res.send({ status: 404, data: err2 })
                }
                return res.send({ status: 200, data: { sql_id: id } })
            })
        }
    }
    checkToken(data.token, select, res)
}
module.exports.deleteSql = (req, res) => {
    //获取客户端提供的用户数据
    const data = req.body
    const select = (results) => {
        const sql = `UPDATE action_sql SET s_is_del = 0, s_update_by='${results[0].phone}' WHERE sql_id = '${data.sql_id}';`
        db.query(sql, (err2, results2) => {
            if (err2) {
                return res.send({ status: 404, message: err2.message })
            }
            return res.send({ status: 200, data: results2 })
        })
    }
    checkToken(data.token, select, res)
}
module.exports.tables = (req, res) => {
    const data = req.body;
    // 获取所有表
    const callback = () => {
        db.query('SHOW TABLES', (err, tables) => {
            if (err) throw err;

            const tablePromises = tables.map((table) => {
                const tableName = table['Tables_in_dev'];
                return new Promise((resolve) => {
                    // 获取每个表的字段及备注
                    db.query(`SHOW FULL COLUMNS FROM ${tableName}`, (err, fields) => {
                        if (err) throw err;

                        // 提取字段信息
                        const fieldDetails = fields.map(field => ({
                            value: field.Field,
                            label: field.Comment || field.Field, // 如果没有备注，则显示'无备注'
                            type: field.Type
                        }));
                        resolve({ table: tableName, fields: fieldDetails }); // 修改为包含字段详情
                    });
                });
            });

            Promise.all(tablePromises).then((results) => {
                return res.send({ status: 200, data: results })
            }).catch(err => {
                return res.send({ status: 404, data: err })
            });
        });
    };

    checkToken(data.token, callback, res);
}
module.exports.fetchTable = (req, res) => {
    const data = req.body;    
    if (!data.tableName || !data.params) {
        return res.send({ status: 404, data: '参数不合法' })
    }
    // 获取所有表
    const callback = async () => {
        const { params } = data;
        const newArr = params.map((item)=>{
            if(item && item.fieldValue && item.fieldName){
                return `${item.fieldName} = '${item.fieldValue}'`
            }
        }).join(' AND ');
        let sql = `select * from ${data.tableName} LIMIT ${data.pageSize} OFFSET ${data.page}`
        if(params && params.length > 0 && newArr && newArr.length > 0){
            sql = `select * from ${data.tableName} where ${newArr} LIMIT ${data.pageSize} OFFSET ${data.page}`
        }
        let totalSql = `select count(*) as total from ${data.tableName}`
        if(params && params.length > 0 && newArr && newArr.length > 0){
            totalSql = `select count(*) as total from ${data.tableName} where ${newArr}`
        }
        db.query(sql, data.sql_name, (err2, results2) => {
            if (err2) {
                return res.send({ status: 404, data: err2 })
            }
            const list = results2;
            db.query(totalSql, data.sql_name, (err3, results3) => {
                if (err3) {
                    return res.send({ status: 404, data: err3 })
                }
                return res.send({ status: 200, data: { intList: list, total: results3[0].total } })
            })
        })
    };

    checkToken(data.token, callback, res);
}