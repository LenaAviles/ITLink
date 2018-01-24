var myModule = (function () {

    var init = function () {
        _setUpListeners();
    };

    var _setUpListeners = function () {
        $('#main-button').on('click', _mainPage);
        $('.login-form').on('submit', _login);
    };

    var _mainPage = function () {
        window._logined = false;         
        location.href = "main.html";        
    };

    var _login = function (ev) {        
        ev.preventDefault();
        var form = $(this),            
            data = form.serialize();

        console.log(data);
        console.log(form);
        window._logined = true;         
        location.href = "main.html";
    };
    
    return {
        init: init
    };
})();

myModule.init();