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
    selectedSpotifyTracks.push(Math.floor(Math.random() * spotifyTrackList.tracks.length));
  }
  const uniqueTracks = {};
  selectedSpotifyTracks = selectedSpotifyTracks.filter((trackIndex) => {
    return uniqueTracks.hasOwnProperty(trackIndex) ? false : (uniqueTracks[trackIndex] = true);
  });

  selectedSpotifyTracks = selectedSpotifyTracks.map(trackIndex => spotifyTrackList.tracks[trackIndex]);

  res.render('main.dust', {
    slide1Content: contentGenerator.getSlideContent(1),
    slide2Content: contentGenerator.getSlideContent(2),
    slide3Content: contentGenerator.getSlideContent(3),
    slide4Content: contentGenerator.getSlideContent(4),
    slide5Content: contentGenerator.getSlideContent(5),
    slide6Content: contentGenerator.getSlideContent(6),
    defaultGradientTop: colors.top,
    defaultGradientBot: colors.bottom,
    spotifyTrackSetTitle: encodeURIComponent('Relaxation and Meditation'),
    selectedSpotifyTracks: selectedSpotifyTracks.join(','),
    selectedSpotifyPlaylist: spotifyTrackList.playlists[Math.floor(Math.random() * spotifyTrackList.playlists.length)],
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
  })
};

const aboutHandler = (req, res) => {
  const colors = getRandomSlideColors();

  const tweetText = 'I tried meditating today.\nMaybe this site can help you try it too.';
  const thisAppUrl = 'http://another-am-test.azurewebsites.net/';
  const twitterIntentLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(thisAppUrl)}&hashtags=mindfulness`;

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
