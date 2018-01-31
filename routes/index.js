
const mongoose = require('mongoose');

const express = require('express');
const router = express.Router();

const isAdmin = (req, res, next) => {
  // если в сессии текущего пользователя есть пометка о том, что он является
  // администратором
  if (req.session.isAdmin) {
    //то всё хорошо :)
    return next();
  }
  //если нет, то перебросить пользователя на главную страницу сайта
  res.redirect('/');
};

router.get('/', function (req, res) {
  let obj = {
    title: 'ITlink'
  };
  Object.assign(obj, req.app.locals.settings);
  const Model = mongoose.model('news');
  Model
    .find()
    .then(items => {
      // обрабатываем шаблон и отправляем его в браузер передаем в шаблон список
      // записей в блоге
      Object.assign(obj, {items: items});
      res.render('pages/index', obj);
    });
});

router.get('/main', isAdmin, function (req, res) {
  res.redirect('/');
});

router.post('/addpost', isAdmin, (req, res) => {
  // if (!req.body.text) return;
  
  const Model = mongoose.model('news');
  
  // var exists = Model.findOne({$and: [{ author: req.body.author}, {body: req.body.text }]});
  // console.log(exists);
    
  let item = new Model({author: req.body.author, date: new Date(req.body.date), body: req.body.text});
  item.save().then(
    //обрабатываем и отправляем ответ в браузер
    (i) => {
      return res.json({status: 'Success'});
    }, e => {
      //если есть ошибки, то получаем их список и так же передаем в шаблон
    const error = Object
        .keys(e.errors)
        .map(key => e.errors[key].message)
        .join(', ');

      //обрабатываем шаблон и отправляем его в браузер
    res.json({
      status: 'Error: ' + error
    });
  });
});

module.exports = router;