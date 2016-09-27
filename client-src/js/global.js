/**
 * DOM Elements
 */

var slides = [].slice.call(document.querySelectorAll('.slide'));
var bg = document.querySelector('.bg');
var navLinks = [].slice.call(document.querySelectorAll('footer nav a'));

/**
 * Utilities
 */

// David Walsh debounce
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

// simplified Penner easing
function easeOutSine(progress) {
  return Math.sin(progress * (Math.PI/2));
}
function easeInSine(progress) {
  return -1 * Math.cos(progress * (Math.PI/2)) + 1;
}

function rgbToHexString(r, g, b) {
  // allow function to accept a componentized object instead of just 3 integers
  if (typeof g === 'undefined') { // not particularly safe, but it's succinct; I'll be careful
    b = r.b;
    g = r.g;
    r = r.r;
  }
  // magic: start with 1000000 then bitshift components onto it, then strip leading '1'
  return '#' + ((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1);
}

function mixComponentColors(colorA, colorB, mixPerc) {
  return {
    r: Math.floor(colorA.r + (mixPerc * (colorB.r - colorA.r))),
    g: Math.floor(colorA.g + (mixPerc * (colorB.g - colorA.g))),
    b: Math.floor(colorA.b + (mixPerc * (colorB.b - colorA.b)))
  }
}

function hexStringToRgb(hexString) {
  // magic: match hex pattern, break out components, and convert each to decimal
  var componentStrings = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexString);
  return {
    r: parseInt(componentStrings[1], 16),
    g: parseInt(componentStrings[2], 16),
    b: parseInt(componentStrings[3], 16)
  };
}

/**
 * JS Flag
 */

document.body.classList.remove('no-js');
document.body.classList.add('js');
