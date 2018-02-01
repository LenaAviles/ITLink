const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', function (req, res) {
  let obj = {
    title: 'About'
  };
  Object.assign(obj, req.app.locals.settings);  
    
  let skills = JSON.parse(fs.readFileSync('content.json', 'utf8'));  

  Object.assign(obj, {skills: skills});
  res.render('pages/about', obj);
});


module.exports = router;