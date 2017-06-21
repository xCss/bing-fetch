var request = require('request');
var qs = require('querystring');
require('babel-polyfill');
var BASE_LINK = 'http://www.bing.com/HPImageArchive.aspx';
var GLOBAL_LINK = 'http://global.bing.com/HPImageArchive.aspx';
var STORY_LINK = 'http://cn.bing.com/cnhp/coverstory/';
var default_config = {
    format: 'js',
    idx: 0,
    n: 1,
    mkt: 'zh-cn',
    mbl: 1
};
const fetchPicture = async(params) => {
    var options = {
        method: 'GET',
        uri: GLOBAL_LINK + '?' + qs.stringify(default_config),
        headers: {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36'
        }
    }
    var ret = await requestServer(options);
}





module.exports = {
    fetchPicture: function() {

    },
    fetchPictures: function() {},
    fetchStory: function() {},
}

function requestServer(options) {
    return new Pormise((resolve, reject) => {
        request(options, (err, ret, body) => {
            if (!err && ret.statusCode === 200) {
                resolve(JSON.parse(body))
            } else {
                reject(err)
            }
        })
    })
}