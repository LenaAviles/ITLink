(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var flip = document.querySelector('#flip');
var registerButton = document.querySelector('#registration');

var login = true;

registerButton.addEventListener('click', function () {
    flip.classList.toggle('flip');
    login = !login;
    if (login) registerButton.innerHTML = "Registration";else {
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

},{}]},{},[1])

//# sourceMappingURL=maps/login.js.map
