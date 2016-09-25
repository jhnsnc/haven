'use strict';

/**
 * Dependencies
 */

const logger = require('winston');
const contentGenerator = require('./content-generator');

/**
 * Handlers
 */

const mainHandler = (req, res) => {
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

const textOnlyHandler = (req, res) => {
  res.render('text-only.dust', {
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
  textOnly: textOnlyHandler,
};
