const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;

const server = http.createServer(app); //this is responsible for return reponses I think

server.listen(port);
