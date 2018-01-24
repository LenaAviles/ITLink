const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  let obj = {
    title: 'Login'
  };
  Object.assign(obj, req.app.locals.settings);
  res.render('pages/login', obj);
});

router.post('/', function (req, res) {
  //   //требуем наличия имени, обратной почты и текста
  // if (!req.body.name || !req.body.email || !req.body.text) {
  //   //если что-либо не указано - сообщаем об этом
  //   return res.json({status: 'Укажите данные!'});
  // }

  let obj = {
    title: 'ITlink'
  };
  Object.assign(obj, req.app.locals.settings);
  res.render('pages/index', obj);
});


module.exports = router;