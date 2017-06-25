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

/**
 * 公共请求
 * @param {Object} config 
 */
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

/**
 * 抓取壁纸信息
 * @param {Object} config 
 */
const fetchPicture = (config) => {
    options['uri'] = (config.mkt === 'zh-cn' ? BASE_LINK : GLOBAL_LINK) + '?' + qs.stringify(config);
    return requestServer(options);
}


/**
 * 抓取壁纸故事
 * @param {Object} config 
 */
const fetchStory = (config) => {
    options['uri'] = STORY_LINK + '?' + qs.stringify(config)
    return requestServer(options);
}

/**
 * 转换对象
 * @param {String} mkt 
 * @param {Object} analysis 
 */
const convert = (mkt, analysis) => {
    let ret = {}
    if (mkt === 'zh-cn') {
        let images = analysis[0].images[0]
        let story = analysis[1]
        ret = {
            "title": story.title,
            "attribute": story.attribute,
            "description": story.para1,
            "copyright": images.copyright,
            "copyrightlink": images.copyrightlink,
            "startdate": images.startdate,
            "enddate": images.enddate,
            "fullstartdate": images.fullstartdate,
            "url": `http://www.bing.com${images.url}`,
            "urlbase": images.urlbase,
            "hsh": images.hsh,
            "longitude": story.Longitude,
            "latitude": story.Latitude,
            "city": story.City,
            "country": story.Country,
            "continent": story.Continent,
            "filename": getFileName(images.urlbase),
            "mkt": mkt,
            "wp": images.wp
        }
    } else {
        let images = analysis.images[0]
        ret = {
            "startdate": images.startdate,
            "enddate": images.enddate,
            "fullstartdate": images.fullstartdate,
            "url": `http://www.bing.com/${images.url}`,
            "urlbase": images.urlbase,
            "hsh": images.hsh,
            "copyright": images.copyright,
            "copyrightlink": images.copyrightlink,
            "filename": getFileName(images.urlbase),
            "mkt": mkt,
            "wp": images.wp
        }
    }
    return ret
}

/**
 * 得到文件名
 * @param {String} urlbase 
 */
const getFileName = (urlbase) => {
    let str = urlbase.substring(urlbase.lastIndexOf('/') + 1, urlbase.length)
    return str.split('_')[0]
}




module.exports = {
    fetchPicture,
    fetchStory,
    convert,
    getFileName
}