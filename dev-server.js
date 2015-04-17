var express = require('express');
var cors = require('cors');

var server = express();

server.use(cors());

server.use(express.static('.'));

server.listen(+process.env.PORT || 8888);

livereload = require('livereload');
server = livereload.createServer();
server.watch(__dirname);
