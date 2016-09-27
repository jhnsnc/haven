// Handles slide transitions

/**
 * Variables
 */
var currentSlide;
var pendingTimeouts = [];
var colorTween;

var bgGradTop = document.getElementById('bg-grad-top');
var bgGradBot = document.getElementById('bg-grad-bot');
var starGrad1 = document.getElementById('star-grad-1');
var starGrad2 = document.getElementById('star-grad-2');
var starGrad3 = document.getElementById('star-grad-3');
var starGrad4 = document.getElementById('star-grad-4');

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

function setBgColor(topColor, botColor) {
  bgGradTop.setAttribute('stop-color', topColor);
  bgGradBot.setAttribute('stop-color', botColor);
}

function setStarColor(starColor1, starColor2, starColor3, starColor4) {
  starGrad1.setAttribute('stop-color', starColor1);
  starGrad2.setAttribute('stop-color', starColor2);
  starGrad3.setAttribute('stop-color', starColor3);
  starGrad4.setAttribute('stop-color', starColor4);
}

/**
 * Functions
 */
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

function setSlide(slideIdx) {
  if (currentSlide === slideIdx) {
    return; // this slide was already active, no need to change
  }

  console.log('transitioning to slide '+slideIdx);

  // clean up pending transitions
  pendingTimeouts.forEach(window.clearTimeout);

  // hide current slide content
  if (currentSlide) {
    slides[currentSlide-1].classList.remove('active');
    [].slice.apply(slides[currentSlide-1].querySelectorAll('span,em')).forEach(fadeOutContent);
  }

  // show new slide content
  slides[slideIdx-1].classList.add('active');
  [].slice.apply(slides[slideIdx-1].querySelectorAll('span,em')).forEach(function(el, i) {
    pendingTimeouts.push(
      window.setTimeout(fadeInContent, 2500 * i + 1500, el)
    );
  });

  // update nav links
  navLinks.forEach(function(navLink) {
    if (parseInt(navLink.dataset.slide,10) === slideIdx) {
      navLink.classList.add('active');
    } else {
      navLink.classList.remove('active');
    }
  });

  // update background
  changeBgColor(Math.floor(Math.random() * slideColors.length));

  // update index
  currentSlide = slideIdx;
}

function changeBgColor(colorSetIdx) {
  if (colorTween) {
    window.cancelAnimationFrame(colorTween.id);
  }

  var white = { r: 255, g: 255, b: 255 };
  colorTween = {
    iTop: hexStringToRgb(bgGradTop.getAttribute('stop-color')),
    iBot: hexStringToRgb(bgGradBot.getAttribute('stop-color')),
    fTop: hexStringToRgb(slideColors[colorSetIdx].top),
    fBot: hexStringToRgb(slideColors[colorSetIdx].bottom),
    iStarGrad1: hexStringToRgb(starGrad1.getAttribute('stop-color')),
    iStarGrad2: hexStringToRgb(starGrad2.getAttribute('stop-color')),
    iStarGrad3: hexStringToRgb(starGrad3.getAttribute('stop-color')),
    iStarGrad4: hexStringToRgb(starGrad4.getAttribute('stop-color')),
    fStarGrad1: mixComponentColors( hexStringToRgb(slideColors[colorSetIdx].stars), white, 0.50),
    fStarGrad2: mixComponentColors( hexStringToRgb(slideColors[colorSetIdx].stars), white, 0.45),
    fStarGrad3: mixComponentColors( hexStringToRgb(slideColors[colorSetIdx].stars), white, 0.30),
    fStarGrad4: hexStringToRgb(slideColors[colorSetIdx].stars),
    duration: 2000
  };

  function stepTween(ts) {
    // timing
    if (!colorTween.startTime) {
      colorTween.startTime = ts;
    }
    var progress = Math.min((ts - colorTween.startTime) / colorTween.duration, 1.0);
    progress = easeOutSine(progress);

    // update
    setBgColor(
      rgbToHexString( mixComponentColors(colorTween.iTop, colorTween.fTop, progress) ),
      rgbToHexString( mixComponentColors(colorTween.iBot, colorTween.fBot, progress) )
    );
    setStarColor(
      rgbToHexString( mixComponentColors(colorTween.iStarGrad1, colorTween.fStarGrad1, progress) ),
      rgbToHexString( mixComponentColors(colorTween.iStarGrad2, colorTween.fStarGrad2, progress) ),
      rgbToHexString( mixComponentColors(colorTween.iStarGrad3, colorTween.fStarGrad3, progress) ),
      rgbToHexString( mixComponentColors(colorTween.iStarGrad4, colorTween.fStarGrad4, progress) )
    );

    // continue or exit
    if (progress < 1.0) {
      colorTween.id = window.requestAnimationFrame(stepTween);
    } else {
      colorTween = null;
    }
  };

  // start tween
  colorTween.id = window.requestAnimationFrame(stepTween);
}

function handleNavigationLinkClick(evt) {
  evt.preventDefault();
  setSlide(parseInt(this.dataset.slide,10));
}

function handleNavigationKeypress(evt) {
  switch(evt.key || evt.keyCode) {
    // previous slide
    case 8:  case 'Backspace':
    case 37: case 'ArrowLeft':
    case 38: case 'ArrowUp':
    case 33: case 'PageUp':
      prevSlide();
      break;
    // next slide
    case 13: case 'Enter':
    case 32: case ' ': // spacebar
    case 40: case 'ArrowDown':
    case 39: case 'ArrowRight':
    case 34: case 'PageDown':
      nextSlide();
      break;
    // jump to first slide
    case 36: case 'Home':
      setSlide(1);
      break;
    // jump to last slide
    case 35: case 'End':
      setSlide(slides.length);
      break;
  }
}

/**
 * Make it so, number one
 */
navLinks.forEach(function(navLink) {
  navLink.addEventListener('click', handleNavigationLinkClick);
});
document.querySelector('.btn-prev-slide').addEventListener('click', prevSlide);
document.querySelector('.btn-next-slide').addEventListener('click', nextSlide);
window.addEventListener('keydown', handleNavigationKeypress);
document.querySelector('.btn-begin').addEventListener('click', nextSlide);

document.querySelector('.btn-more-info').addEventListener('click', function() {
  window.location.pathname = '/about';
});


setBgColor('#121318','#121318'); //start with a black screen

setSlide(1);
