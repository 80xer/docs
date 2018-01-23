var http = require('http');
var url = require('url');

function start(route, handle) {
    function onRequest(req, res) {
        var pathname = url.parse(req.url).pathname;
        console.log(pathname + ' 라우트 리퀘스트를 받았다.');
        route(handle, pathname, res);
    }

    http.createServer(onRequest).listen(8080);
    console.log('server has started.');
}

module.exports.start = start;