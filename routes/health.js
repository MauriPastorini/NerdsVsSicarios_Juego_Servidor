var express = require('express');
var router = express.Router();

router.get('/ping', function(req, res){
  res.json({message: 'Pong'});
});

module.exports = router;
