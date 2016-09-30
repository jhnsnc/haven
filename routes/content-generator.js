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
  // 1
  'slide_greeting': ['<em>#slide_greeting_1.capitalize# </em><span>#slide_greeting_2.capitalize#</span>'],
  'slide_greeting_1': ['howdy','greetings','hello','🙏','namaste','welcome','hi','good day, friend', 'good to see you'],
  'slide_greeting_2': [
    'I’m glad you’re here', 'I was hoping you would come to visit', // warm greeting
    'you’re in the right place', 'I had a feeling I would be seeing you', 'you arrived at just the right time', 'the world can wait a few more minutes', // reassurance
    'let’s make your day a little bit better', 'let’s take some time for you', 'let’s change your day for the better',
    'need a moment away from the troubles of the world?', 'how about we relax for a few minutes?', // purpose
    'follow me', // mysterious
  ],
  // 2
  'slide_breathing': ['<span>#slide_breathing_1.capitalize# </span><span>#slide_breathing_2.capitalize# </span><span>#slide_breathing_3.capitalize#</span>'],
  'slide_breathing_1': ['#transition_begin# focusing on breathing.'],
  'slide_breathing_2': ['find a comfortable place sitting down in a chair or on the ground.'],
  'slide_breathing_3': ['take slow, deep breaths in through your nose and out through your mouth.'],
  // 3
  'slide_stillness': ['<span>#slide_stillness_1.capitalize# </span><span>#slide_stillness_2.capitalize# </span><span>#slide_stillness_3.capitalize#</span>'],
  'slide_stillness_1': ['#verb_continue# taking slow, deep breaths.'],
  'slide_stillness_2': ['without moving, you are becoming more aware of every part of your body.'],
  'slide_stillness_3': ['#verb_contemplate# how your body reacts to the gentle tug of gravity.'],
  // 3
  'slide_topic_meditation_A': ['<span>#slide_topic_meditation_A_1.capitalize# </span><span>#slide_topic_meditation_A_2.capitalize# </span><span>#slide_topic_meditation_A_3.capitalize#</span>'],
  'slide_topic_meditation_A_1': ['#transition_then# focus your attention on your heartbeat.'],
  'slide_topic_meditation_A_2': ['feel your heart beating steadily against your chest, even and consistent.'],
  'slide_topic_meditation_A_3': ['#verb_follow# your pulse as it #verb_travels# down your arm all the way to your fingertips.'],
  // 5
  'slide_topic_meditation_B': ['<span>#slide_topic_meditation_B_1.capitalize# </span><span>#slide_topic_meditation_B_2.capitalize# </span><span>#slide_topic_meditation_B_3.capitalize#</span>'],
  'slide_topic_meditation_B_1': ['as thoughts #verb_surface#, #verb_permit# your mind to #verb_retain# #noun_serenity#'],
  'slide_topic_meditation_B_2': ['pass each thought before you, recognize them, and allow them to drift away'],
  'slide_topic_meditation_B_3': ['you feel you mind #verb_empty# as all problems and worries #verb_escape#'],
  // 6
  'slide_grounding': ['<span>#slide_grounding_1.capitalize# </span><span>#slide_grounding_2.capitalize# </span><span>#slide_grounding_3.capitalize#</span>'],
  'slide_grounding_1': ['#transition_then# you again #verb_realize# the sensation of your hands and feet'],
  'slide_grounding_2': ['feel your #noun_limbs# #adv_slowly# awaken with #adj_fresh# #noun_energy#'],
  'slide_grounding_3': ['#verb_take_time# as you need to feel fully present and aware of your surroundings before standing up and continuing your day'],

  // tranistions
  'transition_begin': ['we begin meditating by', 'begin your meditation with'],
  'transition_then': ['now', 'next,'],

  // verbs
  'verb_continue': ['continue', 'keep'],
  'verb_contemplate': ['accept', 'contemplate', 'think about', 'focus on'],
  'verb_follow': ['follow', 'trace'],
  'verb_travels': ['travels', 'echoes', 'flows'],
  'verb_surface': ['bubble up', 'surface', 'arise'],
  'verb_permit': ['allow', 'permit'],
  'verb_retain': ['retain', 'maintain', 'hold onto', 'keep', 'react with'],
  'verb_empty': ['empty', 'open up', 'drift freely'],
  'verb_escape': ['go away', 'release their hold', 'escape', 'disappear', 'release themselves'],
  'verb_realize': ['become aware of', 'realize', 'notice', 'feel'],
  'verb_take_time': ['take as much time', 'spend as long'],

  // nouns
  'noun_serenity': ['serenity', 'calm', 'focus'],
  'noun_limbs': ['muscles', 'limbs', 'body'],
  'noun_energy': ['energy', 'force', 'vigor'],

  // adjectives
  'adj_fresh': ['new', 'fresh', 'renewed'],

  // adverbs
  'adv_slowly': ['slowly', 'gradually'],
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
      return grammar.flatten('#slide_topic_meditation_A#');
      break;
    case 5:
      return grammar.flatten('#slide_topic_meditation_B#');
      break;
    case 6:
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
