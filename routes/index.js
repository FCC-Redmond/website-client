'use strict';

var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
    res.sendFile(global.appRoot + '/index.html');
});

module.exports = router;