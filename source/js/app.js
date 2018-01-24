// const http = require('http');
// http.createServer(function(req,res) {
//     res.writeHead(200, {'Content-Type': 'text/plain' });
//     res.end('Hello World!');
// }).listen(8000)

// console.log('Server is started on localhost:8000; press Ctrl+C to exit...');
var _logined = false;

if (!_logined) {
    $('#main-sidebar').hide();
    var main = $('#main-content');
    main.width(main.parent().width());
}

