const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  let obj = {
    title: 'Courses'
  };
  Object.assign(obj, req.app.locals.settings);
  res.render('pages/courses', obj);
});


module.exports = router;