import fileUpload from './upload';
import prepareSend from './prepareSend';

const formAddCourse = document.querySelector('#add-course');
const fileSelect = document.querySelector('#file-select'); 

// this hack to prevent double data in db
$( "#add-btn" ).unbind( "click" );
fileSelect.addEventListener('change', function (e) { prepareSendFile(e); });
formAddCourse.addEventListener('submit', prepareSendCourse);

// function handleFileSelect(evt) {
//   var f = evt.target.files[0];
//     var reader = new FileReader();
//           reader.onload = (function(theFile) {
//       return function(e) {          
//         $("#img-holder").attr("style","background-image:url("+e.target.result+")");
//         localStorage.setItem('img', e.target.result);
//       };
//     })(f);
//     reader.readAsDataURL(f);    
// }

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
      resultContainer.innerHTML = data.status;
      $("#img-holder").attr("style",`background-image:url("${data.url}")`);
      // formUpload.reset();
    });
  }

function prepareSendCourse(e) {    
  e.preventDefault();   
  let pic = $("#img-holder").css("background-image").replace(/url\((?:\"|\')?(.+)(?:\"|\')?\)/, '$1');
  let start = formAddCourse.start.value || new Date();
  let end = formAddCourse.end.value || new Date();

  let data = {
    picture: pic,
    dateStart: start,
    dateEnd: end,
    name: formAddCourse.text.value
  };
  
  prepareSend('/courses/addcourse', formAddCourse, data);
}