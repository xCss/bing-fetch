var mysql = require('mysql');
// 获取数据库配置
var config = require('../configs/config').mysql_dev;
var objectAssign = require('object-assign');
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

module.exports = {
    execute
}