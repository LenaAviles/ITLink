(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _upload = require('./upload');

var _upload2 = _interopRequireDefault(_upload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formAddCourse = document.querySelector('#add-course');
var fileSelect = document.querySelector('#file-select');

fileSelect.addEventListener('change', function (e) {
  handleFileSelect(e);prepareSendFile(e);
});
formAddCourse.addEventListener('submit', prepareSendFile);

function handleFileSelect(evt) {
  var f = evt.target.files[0];
  var reader = new FileReader();
  reader.onload = function (theFile) {
    return function (e) {
      $("#img-holder").attr("style", "background-image:url(" + e.target.result + ")");
      localStorage.setItem('img', e.target.result);
    };
  }(f);
  reader.readAsDataURL(f);
}

function prepareSendFile(e) {
  e.preventDefault();
  var resultContainer = formAddCourse.querySelector('.status');
  var formData = new FormData();
  var file = document.querySelector('#file-select').files[0];
  var name = document.querySelector('#course-desc').value || 'course';

  formData.append('photo', file, file.name);
  formData.append('name', name);

  resultContainer.innerHTML = 'Uploading...';
  (0, _upload2.default)('/courses/upload', formData, function (data) {
    resultContainer.innerHTML = data;
    // formUpload.reset();
  });
}

},{"./upload":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (url, data, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);

  xhr.onload = function (e) {
    var result = JSON.parse(xhr.responseText);
    cb(result.status);
  };

  xhr.send(data);
};

},{}]},{},[1])

//# sourceMappingURL=maps/courses.js.map
