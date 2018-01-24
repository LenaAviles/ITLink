const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  let obj = {
    title: 'ITlink'
  };
  Object.assign(obj, req.app.locals.settings);
  res.render('pages/index', obj);
});

router.get('/main', function (req, res) {
  let obj = {
    title: 'ITlink'
  };
  Object.assign(obj, req.app.locals.settings);
  res.render('pages/index', obj);
});

module.exports = router;