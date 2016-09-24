'use strict';

/**
 * Dependencies
 */

const logger = require('winston');
const contentGenerator = require('./content-generator');

/**
 * Handlers
 */

// TODO: split handlers out to separate files when things get more complicated
const mainHandler = (req, res) => {
  // TODO: populate relevant data here

  res.render('main.dust', {
    slide1Content: contentGenerator.getSlideContent(1),
    slide2Content: contentGenerator.getSlideContent(2),
    slide3Content: contentGenerator.getSlideContent(3),
    slide4Content: contentGenerator.getSlideContent(4),
    slide5Content: contentGenerator.getSlideContent(5),
    slide6Content: contentGenerator.getSlideContent(6),
    slide7Content: contentGenerator.getSlideContent(7),
  })
};

/**
 * Export
 */

module.exports = {
  main: mainHandler,
};
