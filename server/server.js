const express = require('express');
const http = require('http');
const path = require('path');
const logger = require('morgan');
const apiRouter = require('./routes/api');

const relativePathToStaticFiles = '../web/dist/web';

const app = express();
const PORT = 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// enable cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
})

// This is for proxies
app.set('trust proxy', 'loopback');

// this will find the built angular application
app.use(express.static(path.join(__dirname, relativePathToStaticFiles)));

// this will handle API routes
app.use('/api', apiRouter()());

// If we get here we will assume that the request is for the angular app
app.use('/', (req, res, next) => { 
  res.sendFile(path.join(__dirname, `${relativePathToStaticFiles}/index.html`));
});

// error handler
app.use((err, req, res, next) => {
  var status = 500;
  var message = "Server Error";
  if (!!err) {
    status = err.status || status;
    message = err.message || message;
  }
  var error = {
    status: status,
    message: message
  };
  res.status(status).json(error);
});

// create the server
var port = process.env.PORT || '3000';
app.set('port', port);
var server = http.createServer(app);

// start the server
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  var message = `Listening on ${bind}`;
  console.info(message)
}
