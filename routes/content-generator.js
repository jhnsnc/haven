'use strict';

/**
 * Dependencies
 */

const logger = require('winston');
const tracery = require('tracery-grammar');

/**
 * Setup
 */

// Special characters: ‘ ’ (squo) “ ” (dquo) – (en) — (em)
const grammar = tracery.createGrammar({
  'greeting_exclamation': ['Howdy','Greetings','Hello','🙏','Namaste','Welcome','Hi','Good day, friend'],
  'greeting_followup': [
    'I’m glad you’re here', 'I was hoping you would come to visit', 'Good to see you', 'I’ve been waiting for you', // warm greeting
    'You’re in the right place', 'Life has brought you here for a reason', 'I had a feeling I would be seeing you', // reassurance
    'Let’s make your day a little bit better', 'Let’s take some time for you', 'Let’s share a moment together', // purpose
  ],

  'slide_greeting': ['<em>#greeting_exclamation# </em><span>#greeting_followup#</span>'],
  'slide_breathing': ['<span>Focus on your breathing </span><span>Slowly in through the nose </span><span>and out through the mouth</span>'],
  'slide_stillness': ['<span>Turn your mind to the sensation of gravity tugging at your body </span><span>Feel how it presses you into your seat</span>'],
  'slide_topic_intro': ['<span>Let’s focus on your body </span><span>Calm your mind and listen for your heartbeat</span>'],
  'slide_topic_meditation_A': ['<span>Follow your pulse down your arms </span><span>Gently touch your fingertips together while you focus</span>'],
  'slide_topic_meditation_B': ['<span>Notice where your muscles feel tight and where they feel relaxed </span><span>Don’t try to change it–just observe</span>'],
  'slide_grounding': ['<span>Bring your thoughts back to your breathing </span><span>Place your feet down and press them firmly against the ground</span>'],
});

grammar.addModifiers(tracery.baseEngModifiers);

const getSlideContent = (slideNum) => {
  switch(slideNum) {
    case 1:
      return grammar.flatten('#slide_greeting#');
      break;
    case 2:
      return grammar.flatten('#slide_breathing#');
      break;
    case 3:
      return grammar.flatten('#slide_stillness#');
      break;
    case 4:
      return grammar.flatten('#slide_topic_intro#');
      break;
    case 5:
      return grammar.flatten('#slide_topic_meditation_A#');
      break;
    case 6:
      return grammar.flatten('#slide_topic_meditation_B#');
      break;
    case 7:
      return grammar.flatten('#slide_grounding#');
      break;
  }
};


/**
 * Export
 */

module.exports = {
  getSlideContent,
};
