const flip = document.querySelector('#flip');
const registerButton = document.querySelector('#registration');

var login = true;

registerButton.addEventListener('click', function () {
    flip.classList.toggle('flip');
    login = !login;
    if (login) registerButton.innerHTML = "Registration";
    else {
        registerButton.innerHTML = "Login";        
    }
});
// var myModule = (function () {

//     var init = function () {
//         _setUpListeners();
//     };

//     var _setUpListeners = function () {
//         $('#main-button').on('click', _mainPage);
//         $('.login-form').on('submit', _login);
//     };

//     var _mainPage = function () {
//         window._logined = false;         
//         location.href = "main.html";        
//     };

//     var _login = function (ev) {        
//         ev.preventDefault();
//         var form = $(this),            
//             data = form.serialize();

//         console.log(data);
//         console.log(form);
//         window._logined = true;         
//         location.href = "main.html";
//     };
    
//     return {
//         init: init
//     };
// })();

// myModule.init();