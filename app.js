'use strict';

/**
 * Dependencies
 */

const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');

const consolidate = require('consolidate');
const dust = require('dustjs-linkedin');
const dustHelpers = require('dustjs-helpers'); // no config needed--adds self to dustjs-linkedin

const serveFavicon = require('serve-favicon');
const serveStatic = require('serve-static');

const morgan = require('morgan');
const logger = require('winston');

/**
 * Core Config / Middleware
 */

const app = express();
app.set('port', process.env.PORT || 3000);

app.set('views', __dirname + '/views');
app.engine('dust', consolidate.dust);
app.set('view engine', 'dust');

app.use(compression());
app.use(bodyParser.json());

app.use(serveFavicon(__dirname + '/client-src/favicon.png'));
app.use(serveStatic(__dirname + '/public'))

// Setup Basic Logging
app.use(morgan('common')); // automatic HTTP logs

/**
 * Top-Level Routing
 */
const routes = require('./routes');

app.get('/', routes.main);
app.get('/text', routes.textOnly);

/**
 * Global Error Handler
 */
app.use((err, req, res, next) => {
  if (err) {
    logger.error(`Error processing ${err.url}: ${err.message}`);
    if (err.stack) {
      logger.error(err.stack);
    }
  }
  if (!res.headersSent) {
    res.status(500).send('Internal Error');
  }
});

/**
 * Start Server
 */
app.listen(app.get('port'), () => {
  logger.info(`Server now listening on port ${app.get('port')}`);
});
