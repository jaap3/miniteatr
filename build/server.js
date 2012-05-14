// server
'use strict';

var connect = require('connect'),
    webmake = require('webmake'),
    app = connect();

app.use('/demo.js', function (request, response) {
    webmake(__dirname + '/../demo.js', {'sourceMap': true}, function (err, src) {
        if (err) {
            response.writeHead(500, {'Content-Type': 'text/plain'});
            response.end(err, 'utf-8');
        } else {
            response.writeHead(200, {'Content-Type': 'application/javascript'});
            response.end(src, 'utf-8');
       }
    });
});
app.use(connect.static(__dirname + '/../'));

app.listen(process.env.PORT);
