var request = require('request');
var qs = require('querystring');
var BASE_LINK = 'http://www.bing.com/HPImageArchive.aspx';
var GLOBAL_LINK = 'http://global.bing.com/HPImageArchive.aspx';
var STORY_LINK = 'http://cn.bing.com/cnhp/coverstory/';
var BING_MARKETS = ["ar-xa", "bg-bg", "cs-cz", "da-dk", "de-at", "de-ch", "de-de", "el-gr", "en-a", "en-ca", "en-gb", "en-id", "en-ie", "en-in", "en-my", "en-nz", "en-ph", "en-sg", "en-us", "en-xa", "en-za", "es-ar", "es-cl", "es-es", "es-mx", "es-us", "es-xl", "et-ee", "fi-fi", "fr-be", "fr-ca", "fr-ch", "fr-fr", "he-il", "hr-hr", "hu-h", "it-it", "ja-jp", "ko-kr", "lt-lt", "lv-lv", "nb-no", "nl-be", "nl-nl", "pl-pl", "pt-br", "pt-pt", "ro-ro", "ru-r", "sk-sk", "sl-sl", "sv-se", "th-th", "tr-tr", "uk-ua", "zh-cn", "zh-hk", "zh-tw"];
let options = {
    method: 'GET',
    uri: '',
    headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36'
    }
}

const requestServer = (config) => {
    return new Promise((resolve, reject) => {
        request(config, (err, ret, body) => {
            if (!err && ret.statusCode === 200) {
                resolve(JSON.parse(body))
            } else {
                reject(err)
            }
        })
    })
}

const fetchPicture = (config) => {
    options['uri'] = (config.mkt === 'zh-cn' ? BASE_LINK : GLOBAL_LINK) + '?' + qs.stringify(config);
    return requestServer(options);
}

const fetchStory = (config) => {
    options['uri'] = STORY_LINK + '?' + qs.stringify(config)
    return requestServer(options);
}


module.exports = {
    fetchPicture,
    fetchStory
}