'use strict';

const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  CoursesSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Please, describe the course']
    },
    dateStart: {
      type: Date,
      required: [true, 'Please, provide the start date']
    },
    dateEnd: {
      type: Date,
      required: [true, 'Please, provide the end date']
    },
    picture: {
      type: String,
      required: [true, 'Please, provide the picture']
    }
  });

//просим mongoose сохранить модель для ее дальнейшего использования
mongoose.model('courses', CoursesSchema);