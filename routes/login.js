const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const crypto = require('crypto');

router.get('/', function (req, res) {
  let obj = {
    title: 'Login'
  };
  Object.assign(obj, req.app.locals.settings);
  res.render('pages/login', obj);
});

router.post('/', function (req, res) {
    //требуем наличия имени, обратной почты и текста
  if (!req.body.login || !req.body.password) {
    //если что-либо не указано - сообщаем об этом
    return res.json({status: 'Provide login and password'});
  }

  //получаем модель пользователя и шифруем введенный пароль
  const Model = mongoose.model('user'),
    password = crypto
      .createHash('md5')
      .update(req.body.password)
      .digest('hex');
  //пытаемся найти пользователя с указанным логином и паролем
  Model
    .findOne({login: req.body.login, password: password})
    .then(item => {
      //если такой пользователь не найден - сообщаем об этом
      if (!item) {
        res.json({status: 'Login or password is wrong'});
      } else {
        // если найден, то делаем пометку об этом в сессии пользователя, который сделал
        // запрос
        req.session.isAdmin = true;
        res.json({status: 'Login successfull'});
      }
    });
});


module.exports = router;