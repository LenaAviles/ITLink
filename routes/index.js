// import { Mongoose } from 'mongoose';
const mongoose = require('mongoose');

const express = require('express');
const router = express.Router();

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

router.get('/main', function (req, res) {
  res.redirect('/');
});

router.post('/addpost', (req, res) => {
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