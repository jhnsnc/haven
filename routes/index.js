'use strict';

/**
 * Dependencies
 */

const logger = require('winston');
const contentGenerator = require('./content-generator');
const spotifyTrackList = require('./spotify-track-list');
const slideColors = require('../client-src/js/slide-colors');

/**
 * Handlers
 */

const mainHandler = (req, res) => {
  const colors = getRandomSlideColors();

  let selectedSpotifyTracks = [];

  let i;
  for (i = 0; i < 25; i += 1) { // random track indices
    selectedSpotifyTracks.push(Math.floor(Math.random() * spotifyTrackList.length));
  }
  const uniqueTracks = {};
  selectedSpotifyTracks = selectedSpotifyTracks.filter((trackIndex) => {
    return uniqueTracks.hasOwnProperty(trackIndex) ? false : (uniqueTracks[trackIndex] = true);
  });

  selectedSpotifyTracks = selectedSpotifyTracks.map(trackIndex => spotifyTrackList[trackIndex]);

  res.render('main.dust', {
    slide1Content: contentGenerator.getSlideContent(1),
    slide2Content: contentGenerator.getSlideContent(2),
    slide3Content: contentGenerator.getSlideContent(3),
    slide4Content: contentGenerator.getSlideContent(4),
    slide5Content: contentGenerator.getSlideContent(5),
    slide6Content: contentGenerator.getSlideContent(6),
    slide7Content: contentGenerator.getSlideContent(7),
    defaultGradientTop: colors.top,
    defaultGradientBot: colors.bottom,
    spotifyTrackListTitle: encodeURIComponent('Random Meditation Tracks'),
    selectedSpotifyTracks: selectedSpotifyTracks.join(','),
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

const aboutHandler = (req, res) => {
  const colors = getRandomSlideColors();

  const tweetText = 'I gained a little extra focus and clarity today with the help of this website.\n';
  const thisAppUrl = 'http://another-am-test.azurewebsites.net/';
  const twitterIntentLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(thisAppUrl)}&hashtags=meditation,mindfulness`;

  res.render('about.dust', {
    defaultGradientTop: colors.top,
    defaultGradientBot: colors.bottom,
    twitterIntentLink,
  });
};

/**
 * Utils
 */

const getRandomSlideColors = () => {
  return slideColors[Math.floor(Math.random() * slideColors.length)];
};

/**
 * Export
 */

module.exports = {
  main: mainHandler,
  textOnly: textOnlyHandler,
  about: aboutHandler,
};
