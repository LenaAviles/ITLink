
import prepareSend from './prepareSend';

document.getElementById("current-date").innerHTML = Date();//.toString().split(' ').splice(1,3).join(' ');

const formAddNews = document.querySelector('#add-news');

// this hack to prevent double data in db
$( "#save-button" ).unbind( "click" );
formAddNews.addEventListener('submit', prepareSendPost);

function prepareSendPost(e) {    
    e.preventDefault(); 
        
    let data = {
      author: 'Lena Ricabal Aviles',
      date: new Date(),
      text: formAddNews.text.value
    };
    
    prepareSend('/addpost', formAddNews, data);
    location.reload();
  }