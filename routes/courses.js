const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const config = require('../config.json');
const mongoose = require('mongoose');

router.get('/', function (req, res) {
  let obj = {
    title: 'Courses'
  };
  Object.assign(obj, req.app.locals.settings);
  const Model = mongoose.model('courses');
  Model
    .find()
    .then(items => {
      // обрабатываем шаблон и отправляем его в браузер передаем в шаблон список
      // записей в блоге
      Object.assign(obj, {items: items});
      res.render('pages/courses', obj);
    });
});

router.post('/upload', function (req, res) {
  let form = new formidable.IncomingForm();
  form.uploadDir = path.join(process.cwd(), config.upload);
  form.parse(req, function(err, fields, files) {
    if (err) {
      return res.json({status: 'Unable to load picture'});
    }
    if (!fields.name) {
      fs.unlink(files.photo.path);
      return res.json({status: 'Please provide description'});
    }
    //если ошибок нет, то создаем новую picture и передаем в нее поле из формы
    const Model = mongoose.model('pic');

    fs.rename(files.photo.path, path.join(config.upload, files.photo.name), function (err) {
      if (err) {
        fs.unlink(path.join(config.upload, files.photo.name));
        fs.rename(files.photo.path, files.photo.name);
      }
      let dir = config
        .public_upload
        .substr(config.public_upload.indexOf('/'));
      let imgPath = path.join(dir,files.photo.name).replace(/\\/g, "/");
      const item = new Model({name: fields.name, picture: imgPath});
      item
        .save()
        .then(
            i => res.json({ "status": {status: 'The picture has beeen uploaded succesfully', "url": imgPath} }),
            e => res.json({status: e.message})
        );
      // const item = new Model({name: fields.name});
      // item
      //   .save()
      //   .then(pic => {
      //     Model.update({ _id: pic._id }, { $set: { picture: path.join(dir, files.photo.name)}}).then(
      //       i => res.json({status: 'Картинка успешно загружена'}),
      //       e => res.json({status: e.message})
      //       );
      //   });
    });
  });
});

router.post('/addcourse', (req, res) => {  
  
  const Model = mongoose.model('courses');
      
  let item = new Model({
    name: req.body.name, 
    desc: req.body.desc,
    dateStart: new Date(req.body.dateStart), 
    dateEnd: new Date(req.body.dateEnd), 
    picture: req.body.picture});
    
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