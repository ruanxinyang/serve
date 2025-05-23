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
    try {
        let sqlStr = `select phone,phone from users where token=?`;
        db.query(sqlStr, token, (err, results) => {
            if (err) {

                return res.send({ status: 404, message: err })
            }
            if (results.length <= 0) {
                console.log(results);
                
                return res.send({ status: 404, message: '暂无权限' })
            } else {
                callback(results)
            }
        })
    } catch (err) {
        return res.send({ status: 404, message: err })
    }
}
module.exports.regUser = (req, res) => {
    //获取客户端提供的用户数据
    const userinfo = req.body
    const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if (!userinfo.username || !userinfo.password) {
        return res.send({ status: 404, message: '用户名或者密码不能为空' })
    }
    let sqlStr = `select * from users where phone=?`;
    // db.query(sqlStr, userinfo.username, (err, results) => {
    //     if (err) {
    //         return res.send({ status: 404, message: err.message })
    //     }
    //     if (results.length > 0) {
    //         return res.send({ status: 404, message: '用户名被占用' })
    //     } else {
    //         //调用bcrpyt.hashSync()对密码进行加密
    //         userinfo.password = bcrypt.hashSync(userinfo.password, 10);
    //         let insertSql = 'insert into users set ?';
    //         db.query(insertSql, { user_id: uuid.v1(), username: userinfo.username, password: userinfo.password, phone: userinfo.username, ip: ip }, (err, results) => {
    //             if (err) {
    //                 return res.cc(err)
    //             }
    //             if (results.affectedRows !== 1) {
    //                 return res.send({ status: 404, message: '注册失败' })
    //             }
    //             res.send({ status: 0, message: '成功' })
    //         })
    //     }
    // })
    return res.send({ status: 404, message: '暂不支持注册，请联系管理员' })

}
exports.login = (req, res) => {
    const userinfo = req.body;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const sql = `select * from users where phone=?`;
    if (!userinfo.username || !userinfo.password) {
        return res.send({ status: 404, message: '用户名或者密码不能为空' })
    }
    const forwardedFor = req.headers['x-forwarded-for'];
    let clientIp;
    
    if (forwardedFor) {
        // 如果存在 X-Forwarded-For 字段，取第一个 IP 地址
        clientIp = forwardedFor.split(',')[0].trim();
    } else {
        // 如果不存在 X-Forwarded-For 字段，使用 req.socket.remoteAddress
        clientIp = req.socket.remoteAddress;
    }
    try {
        db.query(sql, userinfo.username, (err, results) => {
            if (err) {
                return res.cc(err)
            }
            if (results.length <= 0) return res.cc('账号或密码错误')
            //判断密码是否正确
            const compare = bcrypt.compareSync(userinfo.password, results[0].password.toString())

            if (!compare) return res.cc('密码错误')

            const user = { user_id: results[0].user_id, password: '', user_pic: '' }
            //对用户名的信息进行加密
            const tokenStr = jwt.sign(user, config.jwtSecreKey, { expiresIn: '10h' })
            const sql2 = `update users set token = '${tokenStr}', ip='${clientIp}' where phone = '${userinfo.username}'`;

            db.query(sql2, (err, results2) => {
                if (err) {
                    return res.cc(err)
                }
                if (results2.affectedRows !== 1) return res.cc('登录失败')                    
                res.send({
                    status: 200, message: '登录成功',
                    token: tokenStr,
                    userInfo: results[0]
                })
            })

        })
    } catch (err) {
    }

}
exports.exit = (req, res) => {
    const userinfo = req.body;
    const sql = `select * from users where phone= '${userinfo.username}'`;
    if (!userinfo.username || !userinfo.password) {
        return res.send({ status: 404, message: '用户不存在' })
    }
    db.query(sql, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        console.log(results);
        if (results.length !== 1) return res.cc('用户不存在')
        const sql2 = `update users set token = '' where phone = ${db.escape(userinfo.username)}`;

        db.query(sql2, (err, results) => {
            if (err) {
                return res.cc(err)
            }
            if (results.affectedRows !== 1) return res.cc('退出失败')
            res.send({ status: 200, message: '退出成功' })
        })
    })
}
exports.fetchUserInfo = (req, res) => {
    const data = req.body;
    if (!data.token) {
        return res.send({ status: 404, data: '参数不合法' })
    }
    try {
        const sql = `select avatar,phone,user_id,username from users where token = ?`;
        db.query(sql, data.token, (err, results) => {
            if (err) {
                return res.cc(err)
            }
            if (results.length <= 0) return res.cc('token过期')
                res.send({
                    status: 200,
                    data: results
                })

        })
    } catch (err) {
        return res.cc(err)
    }

}
exports.editUserInfo = (req, res) => {
    //获取客户端提供的用户数据
    const data = req.body
    const select = (results) => {
        if (!data.user_id || !data.username || !data.avatar) {
            return res.send({ status: 404, data: '参数不能为空' })
        }
        const sql2 = `UPDATE users SET username = '${data.username}', avatar = '${data.avatar}',s_update_by='${results[0].phone}' WHERE user_id = '${data.user_id}';`
        db.query(sql2, (err2, results2) => {
            if (err2) {
                return res.send({ status: 404, data: err2.message })
            }
            return res.send({ status: 200, data: results2 })
        })
    }
    checkToken(data.token, select, res)
}
exports.run = (req, res) => {
    const data = req.body;
    const callback = (results) => {
        try {
            const { actionNameEn, actionNameCn, orgCode, params } = data;
            if (!actionNameEn || !actionNameCn || !orgCode || !params || !Array.isArray(params)) {
                return res.cc('参数不合法')
            }
            const sql = `select * from action_sql where sql_id = '${actionNameEn}' and sql_name = '${actionNameCn}' and s_org_code = '${orgCode}' and s_is_del = 1`;
            const buildQuery = (template, params) => {
                // 将 params 转换为一个键值对对象
                const paramMap = Object.fromEntries(params.map(param => [param.key, param.value]));
                return template.replace(/{{(\w+)}}/g, (match, key) => {
                    // 返回 paramMap 中对应键的值，未找到时返回空字符串
                    return key in paramMap ? `'${paramMap[key]}'` : '';
                });
            }
            db.query(sql, (err, results) => {
                if (err) {
                    return res.cc(err)
                }
                if (results.length > 0) {
                    let query = buildQuery(results[0].sql_content, params);
                    db.query(query, (queryErr, queryResults) => {
                        if (queryErr) {
                            return res.cc(queryErr)
                        }
                        res.send({ status: 200, data: queryResults })
                    })
                } else { return res.cc(results) }
            })
        } catch (err) {
            return res.send({ status: 404, message: err })
        }
    }
    checkToken(data.token, callback, res)

}