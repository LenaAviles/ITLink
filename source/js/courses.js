import fileUpload from './upload';

const formAddCourse = document.querySelector('#add-course');
const fileSelect = document.querySelector('#file-select'); 

fileSelect.addEventListener('change', function (e) { handleFileSelect(e); prepareSendFile(e); });
formAddCourse.addEventListener('submit', prepareSendFile);

function handleFileSelect(evt) {
  var f = evt.target.files[0];
    var reader = new FileReader();
          reader.onload = (function(theFile) {
      return function(e) {          
        $("#img-holder").attr("style","background-image:url("+e.target.result+")");
        localStorage.setItem('img', e.target.result);
      };
    })(f);
    reader.readAsDataURL(f);    
}

function prepareSendFile(e) {
    e.preventDefault();
    let resultContainer = formAddCourse.querySelector('.status');
    let formData = new FormData();
    let file = document
      .querySelector('#file-select')
      .files[0];
    let name = document
      .querySelector('#course-desc')
      .value || 'course';
  
    formData.append('photo', file, file.name);
    formData.append('name', name);
  
    resultContainer.innerHTML = 'Uploading...';
    fileUpload('/courses/upload', formData, function (data) {
      resultContainer.innerHTML = data;
      // formUpload.reset();
    });
  }