var express = require('express');
var router = express.Router();

// Display the main page with a redirect
router.get('/', function(req, res, next) {
  res.redirect("/books")
});

module.exports = router;