var express = require('express');
var router = express.Router();

var v1Router = require('./v1.0');
var v2Router = require('./v2.0');

router.use('/v1.0', v1Router);
router.use('/v2.0', v2Router);


module.exports = router;
