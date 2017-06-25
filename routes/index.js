var express = require('express');
var router = express.Router();
var bing = require('../utils/bingUtils.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    //res.render('index', { title: 'Express' });
    //var rt = []
    let config = {
        ids: 0,
        n: 1,
        format: 'js',
        mkt: 'zh-cn'
    }
    if (config.mkt == 'zh-cn') {
        let tasks = [bing.fetchPicture(config), bing.fetchStory()];
        Promise.all(tasks).then(ret => {
            return bing.convert('zh-cn', ret)
        }).then(ret => {
            res.send(ret)
        })
    } else {
        bing.fetchPicture(config).then(ret => {
            return bing.convert(config.mkt, ret)
        }).then(ret => {
            res.send(ret)
        })
    }


});
module.exports = router;