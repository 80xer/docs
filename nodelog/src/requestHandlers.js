function view(res) {
    console.log('request handler called --> view');
    res.writeHead(200, {'Content-Type' : 'text/plain'});
    res.write("Hello View");
    res.end();
}
 
function create(res) {
    console.log('request handler called --> create');
    res.writeHead(200, {'Content-Type' : 'text/plain'});
    res.write('Hello Create');
    res.end();
}
 
var handle = {}; // javascript object has key:value pair.
handle['/'] = view;
handle['/view'] = view;
handle['/create'] = create;
 
exports.handle = handle;