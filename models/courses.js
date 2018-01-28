'use strict';

const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  CoursesSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Please, describe the course']
    },
    picture: {
      type: String
    }
  });

//просим mongoose сохранить модель для ее дальнейшего использования
mongoose.model('courses', CoursesSchema);