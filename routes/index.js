var express = require('express');
var router = express.Router();
var bing = require('../utils/Bing.js');
var BING_MARKETS = ["ar-xa", "bg-bg", "cs-cz", "da-dk", "de-at", "de-ch", "de-de", "el-gr", "en-a", "en-ca", "en-gb", "en-id", "en-ie", "en-in", "en-my", "en-nz", "en-ph", "en-sg", "en-us", "en-xa", "en-za", "es-ar", "es-cl", "es-es", "es-mx", "es-us", "es-xl", "et-ee", "fi-fi", "fr-be", "fr-ca", "fr-ch", "fr-fr", "he-il", "hr-hr", "hu-h", "it-it", "ja-jp", "ko-kr", "lt-lt", "lv-lv", "nb-no", "nl-be", "nl-nl", "pl-pl", "pt-br", "pt-pt", "ro-ro", "ru-r", "sk-sk", "sl-sl", "sv-se", "th-th", "tr-tr", "uk-ua", "zh-cn", "zh-hk", "zh-tw"];

/* GET home page. */
router.get('/', function(req, res, next) {
    //res.render('index', { title: 'Express' });
    var rt = []
    bing.fetchPicture().then(ret => {
        rt.push(ret)
    }).finally(() => {
        res.send(rt)
    });
});
module.exports = router;