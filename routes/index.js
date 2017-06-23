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
    let tasks = [bing.fetchPicture(config), bing.fetchStory()];
    Promise.all(tasks).then(ret => {
        res.send(ret)
    })
});
module.exports = router;