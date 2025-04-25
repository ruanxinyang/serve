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
    let sqlStr = `select user_id from users where token=?`;
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
module.exports.getMenu = (req, res, next) => {
    const data = req.body;

    // 获取所有表
    const callback = async () => {
        try {
            const { params } = data;
            res.send({
                status: 200,
                message: '获取成功',
                "menus": [
                      {
                        "ID": 1,
                        "CreatedAt": "2024-07-31T11:25:31.499+08:00",
                        "UpdatedAt": "2024-07-31T11:25:31.499+08:00",
                        "parentId": 0,
                        "path": "dashboard",
                        "name": "dashboard",
                        "hidden": false,
                        "component": "view/dashboard/index.vue",
                        "sort": 1,
                        "meta": {
                          "activeName": "",
                          "keepAlive": false,
                          "defaultMenu": false,
                          "title": "仪表盘",
                          "icon": "odometer",
                          "closeTab": false
                        },
                        "authoritys": null,
                        "menuBtn": null,
                        "menuId": 1,
                        "children": null,
                        "parameters": [],
                        "btns": null
                      },
                      {
                        "ID": 3,
                        "CreatedAt": "2024-07-31T11:25:31.499+08:00",
                        "UpdatedAt": "2024-07-31T11:25:31.499+08:00",
                        "parentId": 0,
                        "path": "admin",
                        "name": "superAdmin",
                        "hidden": false,
                        "component": "view/superAdmin/index.vue",
                        "sort": 3,
                        "meta": {
                          "activeName": "",
                          "keepAlive": false,
                          "defaultMenu": false,
                          "title": "超级管理员",
                          "icon": "user",
                          "closeTab": false
                        },
                        "authoritys": null,
                        "menuBtn": null,
                        "menuId": 3,
                        "children": [
                          {
                            "ID": 4,
                            "CreatedAt": "2024-07-31T11:25:31.499+08:00",
                            "UpdatedAt": "2024-07-31T11:25:31.499+08:00",
                            "parentId": 3,
                            "path": "authority",
                            "name": "authority",
                            "hidden": false,
                            "component": "view/superAdmin/authority/authority.vue",
                            "sort": 1,
                            "meta": {
                              "activeName": "",
                              "keepAlive": false,
                              "defaultMenu": false,
                              "title": "角色管理",
                              "icon": "avatar",
                              "closeTab": false
                            },
                            "authoritys": null,
                            "menuBtn": null,
                            "menuId": 4,
                            "children": null,
                            "parameters": [],
                            "btns": null
                          },
                          {
                            "ID": 5,
                            "CreatedAt": "2024-07-31T11:25:31.499+08:00",
                            "UpdatedAt": "2024-07-31T11:25:31.499+08:00",
                            "parentId": 3,
                            "path": "menu",
                            "name": "menu",
                            "hidden": false,
                            "component": "view/superAdmin/menu/menu.vue",
                            "sort": 2,
                            "meta": {
                              "activeName": "",
                              "keepAlive": true,
                              "defaultMenu": false,
                              "title": "菜单管理",
                              "icon": "tickets",
                              "closeTab": false
                            },
                            "authoritys": null,
                            "menuBtn": null,
                            "menuId": 5,
                            "children": null,
                            "parameters": [],
                            "btns": null
                          },
                          {
                            "ID": 6,
                            "CreatedAt": "2024-07-31T11:25:31.499+08:00",
                            "UpdatedAt": "2024-07-31T11:25:31.499+08:00",
                            "parentId": 3,
                            "path": "api",
                            "name": "api",
                            "hidden": false,
                            "component": "view/superAdmin/api/api.vue",
                            "sort": 3,
                            "meta": {
                              "activeName": "",
                              "keepAlive": true,
                              "defaultMenu": false,
                              "title": "api管理",
                              "icon": "platform",
                              "closeTab": false
                            },
                            "authoritys": null,
                            "menuBtn": null,
                            "menuId": 6,
                            "children": null,
                            "parameters": [],
                            "btns": null
                          },
                          {
                            "ID": 7,
                            "CreatedAt": "2024-07-31T11:25:31.499+08:00",
                            "UpdatedAt": "2024-07-31T11:25:31.499+08:00",
                            "parentId": 3,
                            "path": "user",
                            "name": "user",
                            "hidden": false,
                            "component": "view/superAdmin/user/user.vue",
                            "sort": 4,
                            "meta": {
                              "activeName": "",
                              "keepAlive": false,
                              "defaultMenu": false,
                              "title": "用户管理",
                              "icon": "coordinate",
                              "closeTab": false
                            },
                            "authoritys": null,
                            "menuBtn": null,
                            "menuId": 7,
                            "children": null,
                            "parameters": [],
                            "btns": null
                          },
                          {
                            "ID": 8,
                            "CreatedAt": "2024-07-31T11:25:31.499+08:00",
                            "UpdatedAt": "2024-07-31T11:25:31.499+08:00",
                            "parentId": 3,
                            "path": "dictionary",
                            "name": "dictionary",
                            "hidden": false,
                            "component": "view/superAdmin/dictionary/sysDictionary.vue",
                            "sort": 5,
                            "meta": {
                              "activeName": "",
                              "keepAlive": false,
                              "defaultMenu": false,
                              "title": "字典管理",
                              "icon": "notebook",
                              "closeTab": false
                            },
                            "authoritys": null,
                            "menuBtn": null,
                            "menuId": 8,
                            "children": null,
                            "parameters": [],
                            "btns": null
                          },
                          {
                            "ID": 9,
                            "CreatedAt": "2024-07-31T11:25:31.499+08:00",
                            "UpdatedAt": "2024-07-31T11:25:31.499+08:00",
                            "parentId": 3,
                            "path": "operation",
                            "name": "operation",
                            "hidden": false,
                            "component": "view/superAdmin/operation/sysOperationRecord.vue",
                            "sort": 6,
                            "meta": {
                              "activeName": "",
                              "keepAlive": false,
                              "defaultMenu": false,
                              "title": "操作历史",
                              "icon": "pie-chart",
                              "closeTab": false
                            },
                            "authoritys": null,
                            "menuBtn": null,
                            "menuId": 9,
                            "children": null,
                            "parameters": [],
                            "btns": null
                          }
                        ],
                        "parameters": [],
                        "btns": null
                      },
                      {
                        "ID": 10,
                        "CreatedAt": "2024-07-31T11:25:31.499+08:00",
                        "UpdatedAt": "2024-07-31T11:25:31.499+08:00",
                        "parentId": 0,
                        "path": "person",
                        "name": "person",
                        "hidden": true,
                        "component": "view/person/person.vue",
                        "sort": 4,
                        "meta": {
                          "activeName": "",
                          "keepAlive": false,
                          "defaultMenu": false,
                          "title": "个人信息",
                          "icon": "message",
                          "closeTab": false
                        },
                        "authoritys": null,
                        "menuBtn": null,
                        "menuId": 10,
                        "children": null,
                        "parameters": [],
                        "btns": null
                      },
                      {
                        "ID": 15,
                        "CreatedAt": "2024-07-31T11:25:31.499+08:00",
                        "UpdatedAt": "2024-07-31T11:25:31.499+08:00",
                        "parentId": 0,
                        "path": "systemTools",
                        "name": "systemTools",
                        "hidden": false,
                        "component": "view/systemTools/index.vue",
                        "sort": 5,
                        "meta": {
                          "activeName": "",
                          "keepAlive": false,
                          "defaultMenu": false,
                          "title": "系统工具",
                          "icon": "tools",
                          "closeTab": false
                        },
                        "authoritys": null,
                        "menuBtn": null,
                        "menuId": 15,
                        "children": [
                          {
                            "ID": 20,
                            "CreatedAt": "2024-07-31T11:25:31.499+08:00",
                            "UpdatedAt": "2024-07-31T11:25:31.499+08:00",
                            "parentId": 15,
                            "path": "autoCodeEdit/:id",
                            "name": "autoCodeEdit",
                            "hidden": true,
                            "component": "view/systemTools/autoCode/index.vue",
                            "sort": 0,
                            "meta": {
                              "activeName": "",
                              "keepAlive": false,
                              "defaultMenu": false,
                              "title": "自动化代码-${id}",
                              "icon": "magic-stick",
                              "closeTab": false
                            },
                            "authoritys": null,
                            "menuBtn": null,
                            "menuId": 20,
                            "children": null,
                            "parameters": [],
                            "btns": null
                          },
                          {
                            "ID": 21,
                            "CreatedAt": "2024-07-31T11:25:31.499+08:00",
                            "UpdatedAt": "2024-07-31T11:25:31.499+08:00",
                            "parentId": 15,
                            "path": "autoPkg",
                            "name": "autoPkg",
                            "hidden": false,
                            "component": "view/systemTools/autoPkg/autoPkg.vue",
                            "sort": 0,
                            "meta": {
                              "activeName": "",
                              "keepAlive": false,
                              "defaultMenu": false,
                              "title": "模板配置",
                              "icon": "folder",
                              "closeTab": false
                            },
                            "authoritys": null,
                            "menuBtn": null,
                            "menuId": 21,
                            "children": null,
                            "parameters": [],
                            "btns": null
                          },
                          {
                            "ID": 16,
                            "CreatedAt": "2024-07-31T11:25:31.499+08:00",
                            "UpdatedAt": "2024-07-31T11:25:31.499+08:00",
                            "parentId": 15,
                            "path": "autoCode",
                            "name": "autoCode",
                            "hidden": false,
                            "component": "view/systemTools/autoCode/index.vue",
                            "sort": 1,
                            "meta": {
                              "activeName": "",
                              "keepAlive": true,
                              "defaultMenu": false,
                              "title": "代码生成器",
                              "icon": "cpu",
                              "closeTab": false
                            },
                            "authoritys": null,
                            "menuBtn": null,
                            "menuId": 16,
                            "children": null,
                            "parameters": [],
                            "btns": null
                          },
                          {
                            "ID": 19,
                            "CreatedAt": "2024-07-31T11:25:31.499+08:00",
                            "UpdatedAt": "2024-07-31T11:25:31.499+08:00",
                            "parentId": 15,
                            "path": "autoCodeAdmin",
                            "name": "autoCodeAdmin",
                            "hidden": false,
                            "component": "view/systemTools/autoCodeAdmin/index.vue",
                            "sort": 2,
                            "meta": {
                              "activeName": "",
                              "keepAlive": false,
                              "defaultMenu": false,
                              "title": "自动化代码管理",
                              "icon": "magic-stick",
                              "closeTab": false
                            },
                            "authoritys": null,
                            "menuBtn": null,
                            "menuId": 19,
                            "children": null,
                            "parameters": [],
                            "btns": null
                          },
                          {
                            "ID": 17,
                            "CreatedAt": "2024-07-31T11:25:31.499+08:00",
                            "UpdatedAt": "2024-07-31T11:25:31.499+08:00",
                            "parentId": 15,
                            "path": "formCreate",
                            "name": "formCreate",
                            "hidden": false,
                            "component": "view/systemTools/formCreate/index.vue",
                            "sort": 3,
                            "meta": {
                              "activeName": "",
                              "keepAlive": true,
                              "defaultMenu": false,
                              "title": "表单生成器",
                              "icon": "magic-stick",
                              "closeTab": false
                            },
                            "authoritys": null,
                            "menuBtn": null,
                            "menuId": 17,
                            "children": null,
                            "parameters": [],
                            "btns": null
                          },
                          {
                            "ID": 29,
                            "CreatedAt": "2024-07-31T11:25:31.499+08:00",
                            "UpdatedAt": "2024-07-31T11:25:31.499+08:00",
                            "parentId": 15,
                            "path": "exportTemplate",
                            "name": "exportTemplate",
                            "hidden": false,
                            "component": "view/systemTools/exportTemplate/exportTemplate.vue",
                            "sort": 5,
                            "meta": {
                              "activeName": "",
                              "keepAlive": false,
                              "defaultMenu": false,
                              "title": "表格模板",
                              "icon": "reading",
                              "closeTab": false
                            },
                            "authoritys": null,
                            "menuBtn": null,
                            "menuId": 29,
                            "children": null,
                            "parameters": [],
                            "btns": null
                          }
                        ],
                        "parameters": [],
                        "btns": null
                      },
                      {
                        "ID": 24,
                        "CreatedAt": "2024-07-31T11:25:31.499+08:00",
                        "UpdatedAt": "2024-07-31T11:25:31.499+08:00",
                        "parentId": 0,
                        "path": "plugin",
                        "name": "plugin",
                        "hidden": false,
                        "component": "view/routerHolder.vue",
                        "sort": 6,
                        "meta": {
                          "activeName": "",
                          "keepAlive": false,
                          "defaultMenu": false,
                          "title": "插件系统",
                          "icon": "cherry",
                          "closeTab": false
                        },
                        "authoritys": null,
                        "menuBtn": null,
                        "menuId": 24,
                        "children": [
                          {
                            "ID": 25,
                            "CreatedAt": "2024-07-31T11:25:31.499+08:00",
                            "UpdatedAt": "2024-07-31T11:25:31.499+08:00",
                            "parentId": 24,
                            "path": "https://plugin.gin-vue-admin.com/",
                            "name": "https://plugin.gin-vue-admin.com/",
                            "hidden": false,
                            "component": "https://plugin.gin-vue-admin.com/",
                            "sort": 0,
                            "meta": {
                              "activeName": "",
                              "keepAlive": false,
                              "defaultMenu": false,
                              "title": "插件市场",
                              "icon": "shop",
                              "closeTab": false
                            },
                            "authoritys": null,
                            "menuBtn": null,
                            "menuId": 25,
                            "children": null,
                            "parameters": [],
                            "btns": null
                          },
                          {
                            "ID": 26,
                            "CreatedAt": "2024-07-31T11:25:31.499+08:00",
                            "UpdatedAt": "2024-07-31T11:25:31.499+08:00",
                            "parentId": 24,
                            "path": "installPlugin",
                            "name": "installPlugin",
                            "hidden": false,
                            "component": "view/systemTools/installPlugin/index.vue",
                            "sort": 1,
                            "meta": {
                              "activeName": "",
                              "keepAlive": false,
                              "defaultMenu": false,
                              "title": "插件安装",
                              "icon": "box",
                              "closeTab": false
                            },
                            "authoritys": null,
                            "menuBtn": null,
                            "menuId": 26,
                            "children": null,
                            "parameters": [],
                            "btns": null
                          },
                          {
                            "ID": 27,
                            "CreatedAt": "2024-07-31T11:25:31.499+08:00",
                            "UpdatedAt": "2024-07-31T11:25:31.499+08:00",
                            "parentId": 24,
                            "path": "pubPlug",
                            "name": "pubPlug",
                            "hidden": false,
                            "component": "view/systemTools/pubPlug/pubPlug.vue",
                            "sort": 3,
                            "meta": {
                              "activeName": "",
                              "keepAlive": false,
                              "defaultMenu": false,
                              "title": "打包插件",
                              "icon": "files",
                              "closeTab": false
                            },
                            "authoritys": null,
                            "menuBtn": null,
                            "menuId": 27,
                            "children": null,
                            "parameters": [],
                            "btns": null
                          },
                          {
                            "ID": 30,
                            "CreatedAt": "2024-07-31T11:25:31.499+08:00",
                            "UpdatedAt": "2024-07-31T11:25:31.499+08:00",
                            "parentId": 24,
                            "path": "anInfo",
                            "name": "anInfo",
                            "hidden": false,
                            "component": "plugin/announcement/view/info.vue",
                            "sort": 5,
                            "meta": {
                              "activeName": "",
                              "keepAlive": false,
                              "defaultMenu": false,
                              "title": "公告管理[示例]",
                              "icon": "scaleToOriginal",
                              "closeTab": false
                            },
                            "authoritys": null,
                            "menuBtn": null,
                            "menuId": 30,
                            "children": null,
                            "parameters": [],
                            "btns": null
                          }
                        ],
                        "parameters": [],
                        "btns": null
                      },
                      {
                        "ID": 11,
                        "CreatedAt": "2024-07-31T11:25:31.499+08:00",
                        "UpdatedAt": "2024-07-31T11:25:31.499+08:00",
                        "parentId": 0,
                        "path": "example",
                        "name": "example",
                        "hidden": false,
                        "component": "view/example/index.vue",
                        "sort": 7,
                        "meta": {
                          "activeName": "",
                          "keepAlive": false,
                          "defaultMenu": false,
                          "title": "示例文件",
                          "icon": "management",
                          "closeTab": false
                        },
                        "authoritys": null,
                        "menuBtn": null,
                        "menuId": 11,
                        "children": [
                          {
                            "ID": 12,
                            "CreatedAt": "2024-07-31T11:25:31.499+08:00",
                            "UpdatedAt": "2024-07-31T11:25:31.499+08:00",
                            "parentId": 11,
                            "path": "upload",
                            "name": "upload",
                            "hidden": false,
                            "component": "view/example/upload/upload.vue",
                            "sort": 5,
                            "meta": {
                              "activeName": "",
                              "keepAlive": false,
                              "defaultMenu": false,
                              "title": "媒体库（上传下载）",
                              "icon": "upload",
                              "closeTab": false
                            },
                            "authoritys": null,
                            "menuBtn": null,
                            "menuId": 12,
                            "children": null,
                            "parameters": [],
                            "btns": null
                          },
                          {
                            "ID": 13,
                            "CreatedAt": "2024-07-31T11:25:31.499+08:00",
                            "UpdatedAt": "2024-07-31T11:25:31.499+08:00",
                            "parentId": 11,
                            "path": "breakpoint",
                            "name": "breakpoint",
                            "hidden": false,
                            "component": "view/example/breakpoint/breakpoint.vue",
                            "sort": 6,
                            "meta": {
                              "activeName": "",
                              "keepAlive": false,
                              "defaultMenu": false,
                              "title": "断点续传",
                              "icon": "upload-filled",
                              "closeTab": false
                            },
                            "authoritys": null,
                            "menuBtn": null,
                            "menuId": 13,
                            "children": null,
                            "parameters": [],
                            "btns": null
                          },
                          {
                            "ID": 14,
                            "CreatedAt": "2024-07-31T11:25:31.499+08:00",
                            "UpdatedAt": "2024-07-31T11:25:31.499+08:00",
                            "parentId": 11,
                            "path": "customer",
                            "name": "customer",
                            "hidden": false,
                            "component": "view/example/customer/customer.vue",
                            "sort": 7,
                            "meta": {
                              "activeName": "",
                              "keepAlive": false,
                              "defaultMenu": false,
                              "title": "客户列表（资源示例）",
                              "icon": "avatar",
                              "closeTab": false
                            },
                            "authoritys": null,
                            "menuBtn": null,
                            "menuId": 14,
                            "children": null,
                            "parameters": [],
                            "btns": null
                          }
                        ],
                        "parameters": [],
                        "btns": null
                      },
                      {
                        "ID": 23,
                        "CreatedAt": "2024-07-31T11:25:31.499+08:00",
                        "UpdatedAt": "2024-07-31T11:25:31.499+08:00",
                        "parentId": 0,
                        "path": "state",
                        "name": "state",
                        "hidden": false,
                        "component": "view/system/state.vue",
                        "sort": 8,
                        "meta": {
                          "activeName": "",
                          "keepAlive": false,
                          "defaultMenu": false,
                          "title": "服务器状态",
                          "icon": "cloudy",
                          "closeTab": false
                        },
                        "authoritys": null,
                        "menuBtn": null,
                        "menuId": 23,
                        "children": null,
                        "parameters": [],
                        "btns": null
                      },
                      {
                        "ID": 2,
                        "CreatedAt": "2024-07-31T11:25:31.499+08:00",
                        "UpdatedAt": "2024-07-31T11:25:31.499+08:00",
                        "parentId": 0,
                        "path": "about",
                        "name": "about",
                        "hidden": false,
                        "component": "view/about/index.vue",
                        "sort": 9,
                        "meta": {
                          "activeName": "",
                          "keepAlive": false,
                          "defaultMenu": false,
                          "title": "关于我们",
                          "icon": "info-filled",
                          "closeTab": false
                        },
                        "authoritys": null,
                        "menuBtn": null,
                        "menuId": 2,
                        "children": null,
                        "parameters": [],
                        "btns": null
                      }
                    ]

            })
        } catch (err) {
            next(err)
        }
    };

    checkToken(req.headers.token, callback, res);
}