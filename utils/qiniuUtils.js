const qiniu = require('qiniu');
const resolutions = require('../configs/config').resolutions;
// access_key and secret_key
qiniu.conf.ACCESS_KEY = process.env.qiniu_access_key;
qiniu.conf.SECRET_KEY = process.env.qiniu_secret_key;

const bucket = 'ioliu';

/**
 * 上传到七牛
 * @param {String} remoteLink 
 */
const fetchToQiniu = (remoteLink) => {
    let client = new qiniu.rs.Client();
    for (let i in resolutions) {
        let resolution = resolutions[i];
        let remoteURL = remoteLink.replace('1920x1080', resolution);
        let key = 'bing/' + remoteURL.substr(remoteURL.lastIndexOf('/') + 1, remoteURL.length);
        client.fetch(remoteURL, bucket, key, (err, ret) => {})
    }
    let temp_link = remoteLink.substr(remoteLink.lastIndexOf('/') + 1, remoteLink.length);
    return temp_link.substr(0, temp_link.lastIndexOf('_'));
}


module.exports = {
    fetchToQiniu
}