// Handles slide transitions

/**
 * Variables
 */
var currentSlide;
var pendingTimeouts = [];
var bgTween;

/**
 * Utility Functions
 */
function fadeInContent(el) {
  el.classList.remove('out');
  el.classList.add('in');
}

function fadeOutContent(el) {
  el.classList.add('out');
  el.classList.remove('in');
}

function rgbToHexString(r, g, b) {
  //magic: start with 1000000 then bitshift components onto it, then strip leading '1'
  return '#' + ((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1);
}

function hexStringToRgb(hexString) {
  //magic: match hex pattern, break out components, and convert each to decimal
  var componentStrings = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexString);
  return {
    r: parseInt(componentStrings[1], 16),
    g: parseInt(componentStrings[2], 16),
    b: parseInt(componentStrings[3], 16)
  };
}

function changeBgColor(colorSetIdx) {
  if (bgTween) {
    window.cancelAnimationFrame(bgTween.id);
  }

  bgTween = {
    iTop: hexStringToRgb(document.getElementById('bg-grad-top').getAttribute('stop-color')),
    iBot: hexStringToRgb(document.getElementById('bg-grad-bot').getAttribute('stop-color')),
    fTop: hexStringToRgb(slideColors[colorSetIdx].top),
    fBot: hexStringToRgb(slideColors[colorSetIdx].bottom),
    duration: 2000
  };

  function stepTween(ts) {
    // timing
    if (!bgTween.startTime) {
      bgTween.startTime = ts;
    }
    var progress = Math.min((ts - bgTween.startTime) / bgTween.duration, 1.0);
    progress = easeOutSine(progress);

    // update
    setBgColor(
      rgbToHexString(
        Math.floor(bgTween.iTop.r + (progress * (bgTween.fTop.r - bgTween.iTop.r))),
        Math.floor(bgTween.iTop.g + (progress * (bgTween.fTop.g - bgTween.iTop.g))),
        Math.floor(bgTween.iTop.b + (progress * (bgTween.fTop.b - bgTween.iTop.b)))
      ),
      rgbToHexString(
        Math.floor(bgTween.iBot.r + (progress * (bgTween.fBot.r - bgTween.iBot.r))),
        Math.floor(bgTween.iBot.g + (progress * (bgTween.fBot.g - bgTween.iBot.g))),
        Math.floor(bgTween.iBot.b + (progress * (bgTween.fBot.b - bgTween.iBot.b)))
      )
    );

    // continue or exit
    if (progress < 1.0) {
      bgTween.id = window.requestAnimationFrame(stepTween);
    } else {
      bgTween = null;
    }
  };

  // start tween
  bgTween.id = window.requestAnimationFrame(stepTween);
}

function setBgColor(topColor, botColor) {
  document.getElementById('bg-grad-top').setAttribute('stop-color', topColor);
  document.getElementById('bg-grad-bot').setAttribute('stop-color', botColor);
}

/**
 * Functions
 */
function setSlide(slideIdx) {
  // clean up pending transitions
  pendingTimeouts.forEach(window.clearTimeout);

  // hide current slide content
  [].slice.apply(slides[currentSlide-1].querySelectorAll('span,em')).forEach(fadeOutContent);

  // show new slide content
  [].slice.apply(slides[slideIdx-1].querySelectorAll('span,em')).forEach(function(el, i) {
    pendingTimeouts.push(
      window.setTimeout(fadeInContent, 2500 * i + 1500, el)
    );
  });

  // update background
  changeBgColor(Math.floor(Math.random() * slideColors.length));

  // update index
  currentSlide = slideIdx;
}

function nextSlide() {
  if (currentSlide < 7) {
    setSlide(currentSlide + 1);
  }
}

function prevSlide() {
  if (currentSlide > 1) {
    setSlide(currentSlide - 1);
  }
}

/**
 * Make it so, number one
 */
document.body.addEventListener('click', nextSlide);

currentSlide = 1;
setSlide(currentSlide);
