'use strict';

/**
 * Dependencies
 */

const logger = require('winston');

/**
 * Handlers
 */

const mainHandler = (req, res) => {
  const rand = Math.floor(Math.random() * 100000) + 1;

  logger.info(`Handling request on main endpoint. Lucky number is ${rand}`);

  res.render('main.dust', {
    rand,
  })
};


/**
 * Export
 */

module.exports = {
  main: mainHandler,
};
