'use strict';

const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  NewsSchema = new Schema({
    author: {
      type: String,
      required: [true, 'Укажите заголовок статьи']
    },
    text: {
      type: String,
      required: [true, 'Укажите содержимое статьи']
    },
    date: {
      type: Date, 
      default: Date.now,
      required: [true, 'Укажите дату публикации']
    }
  });

//просим mongoose сохранить модель для ее дальнейшего использования
mongoose.model('news', NewsSchema);