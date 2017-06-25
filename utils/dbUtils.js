var mysql = require('mysql');
// 获取数据库配置
var config = require('../configs/config').mysql_dev;
// 使用连接池
var pool = mysql.createPool(config);



const execute = (sql) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) {
                reject(err)
            }
            conn.query(sql, (err, ret) => {
                conn.release();
                if (err) {
                    reject(err)
                }
                resolve(ret)
            })
        })
    })
}

/**
 * 插入数据
 * @param {String} table 
 * @param {Object} params 
 */
const set = (table, params) => {
    var keys = [];
    var vals = [];
    for (var i in params) {
        keys.push(i);
        vals.push(params[i]);
    }
    let sql = `insert into ${table}(${keys.join(',')}) values("${vals.join('","')}")`
    return execute(sql)
}

/**
 * 查询数据
 * @param {String} table 
 * @param {Object} params 
 * @param {String} sql 
 */
const get = (table, params, sql) => {
    if (!!sql) {
        return execute(sql)
    } else {
        sql = 'select * from ' + table
        let condition = []
        for (var i in params) {
            condition.push(`${i}="${params[i]}"`)
        }
        if (condition.length > 0) {
            sql += ' where ' + condition.join(' and ')
        }
        return execute(sql)
    }
}

const update = (table, params, conditions) => {
    let sql = `update ${table} set `;
    let param = []
    for (let i in params) {
        param.push(`${i}="${params[i]}"`)
    }
    if (param.length > 0) {
        sql += param.join(',')
    }
    let condition = []
    for (let k in conditions) {
        condition.push(`${k}="${params[k]}"`)
    }
    if (condition.length > 0) {
        sql += ' where ' + condition.join(' and ')
    }
    return execute(sql)
}

module.exports = {
    set,
    get,
    update,
    execute
}