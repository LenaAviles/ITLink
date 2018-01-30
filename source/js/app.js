import prepareSend from './prepareSend';

const formLogin = document.querySelector('#login-form');

if (formLogin) {
  formLogin.addEventListener('submit', prepareSendLogin);
}

function prepareSendLogin(e) {
  e.preventDefault();
  let data = {
    login: formLogin.login.value,
    password: formLogin.password.value
  };
  
  prepareSend('/login', formLogin, data, function(data) {
    if (data === 'Login succeeded') {
      location.href = '/admin';
    }
  });
}


// var _logined = false;

// if (!_logined) {
//     $('#main-sidebar').hide();
//     var main = $('#main-content');
//     main.width(main.parent().width());
// }

