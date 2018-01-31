import fileUpload from './upload';
import prepareSend from './prepareSend';

const formAddCourse = document.querySelector('#add-course');
const fileSelect = document.querySelector('#file-select');
const addNew = document.querySelector('#add-new');

// this hack to prevent double data in db
$( "#add-btn" ).unbind( "click" );
$("#img-holder").attr('data-content','Upload picture');
fileSelect.addEventListener('change', function (e) { handleFileSelect(e);  prepareSendFile(e); });
formAddCourse.addEventListener('submit', prepareSendCourse);
formAddCourse.addEventListener('reset', (e) => { formAddCourse.style.display = "none"; });
addNew.addEventListener('click', (e) => { e.preventDefault(); formAddCourse.style.display = "block"; });

function handleFileSelect(evt) {
  var f = evt.target.files[0];
    var reader = new FileReader();
          reader.onload = (function(theFile) {
      return function(e) {          
        $("#img-holder").attr("style","background-image: url("+e.target.result+");");
        $("#img-holder").attr('data-content','');
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
      .querySelector('#desc')
      .value || 'course';
  
    formData.append('photo', file, file.name);
    formData.append('name', name);
  
    resultContainer.innerHTML = 'Uploading...';
    fileUpload('/courses/upload', formData, function (data) {      
      resultContainer.innerHTML = data.status;
      $("#img-holder").attr("style",`background-image:url("${data.url}");`);
      $("#img-holder").attr('data-content','');
      // formUpload.reset();
    });
  }

function prepareSendCourse(e) {    
  e.preventDefault();
  let link = $("#img-holder").css("background-image").trim();   
  let pic = link.substring(5, link.length - 2);  
  let start = formAddCourse.start.value || new Date();
  let end = formAddCourse.end.value || new Date();  

  let data = {
    picture: pic,
    dateStart: start,
    dateEnd: end,
    name: formAddCourse.name.value,
    desc: formAddCourse.desc.value
  };
  
  prepareSend('/courses/addcourse', formAddCourse, data);
  location.reload();
}