const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const logger = require('./common/logger');
const morgan = require('morgan');

const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const { assignReqId } = require('./common/utils');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

// Loggin incoming requests
morgan.token('id', req => req.id);
morgan.token('body', req => JSON.stringify(req.body));
morgan.token('query', req => JSON.stringify(req.query));
app.use(assignReqId);
app.use(
  morgan(':id :method :url :status :body :query - :response-time ms', {
    stream: logger.stream
  })
);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('*', (req, res) => {
  res.status(404).send('Page not found');
});

app.use((err, req, res) => {
  logger.error(err.message);
  res.status(500).send(err.message);
});

// UncaughtException & unhandledRejection handling done with winston in common/logger.js
// process.on('uncaughtException', err => {
//   logger.error(`Uncaught Exception: ${err.message}`);
// });

// process.on('unhandledRejection', reason => {
//   logger.error(`Unhandled Rejection: ${reason.message}`);
// });

module.exports = app;
