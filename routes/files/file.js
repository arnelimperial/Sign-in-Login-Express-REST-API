var express = require('express');
var router = express.Router();

router.get('/', (req, res, next)=>{
    
    res.render('index', {title: 'Express REST API(Users Registration and Login)'})
  
  });

module.exports = router;