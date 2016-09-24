// Handles slide transitions

var currentSlide;
var pendingTimeouts = [];

function fadeInContent(el) {
  el.classList.remove('out');
  el.classList.add('in');
}

function fadeOutContent(el) {
  el.classList.add('out');
  el.classList.remove('in');
}

function setSlide(slideIdx) {
  // clean up pending transitions
  pendingTimeouts.forEach(window.clearTimeout);

  // hide current slide content
  [].slice.apply(slides[currentSlide-1].querySelectorAll('span,em')).forEach(fadeOutContent);

  // show new slide content
  [].slice.apply(slides[slideIdx-1].querySelectorAll('span,em')).forEach(function(el, i) {
    pendingTimeouts.push(
      window.setTimeout(fadeInContent, 2500 * i + (!(slideIdx-1) ? 0 : 2000), el)
    );
  });

  // update background
  // TODO: add actual logic here
  bg.dataset.bg = Math.floor(Math.random() * 27) + 1;

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

// Make it so, number one

document.body.addEventListener('click', nextSlide);

currentSlide = 1;
setSlide(currentSlide);
