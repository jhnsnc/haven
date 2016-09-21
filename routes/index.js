'use strict';

/**
 * Dependencies
 */

const logger = require('winston');

/**
 * Handlers
 */

// TODO: split handlers out to separate files when things get more complicated
const mainHandler = (req, res) => {
  // TODO: populate relevant data here

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
