function route(handle, pathname, res) {
    console.log(pathname + '에 대한 라우트');
    if (typeof handle[pathname] === 'function') {
        handle[pathname](res);
    } else {
        console.log('no request handler for ' + pathname);
        res.writeHead(404, {'Content-Type':'text/plain'});
        res.write('404 not found');
        res.end();
    }
}

exports.route = route;