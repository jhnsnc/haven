// DOM elements
var slides = [].slice.call(document.querySelectorAll('.slide'));


// Utilities

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

// Resizes text for each slide to fit tight inside the container

function fitSlideContent(slide, targetHeight) {
  var slideContent = slide.querySelector('p');

  var low = 0;
  var high = 0;
  var getBestFontSize = function(fontSize) {
    // check if font size fits
    slideContent.style.fontSize = fontSize + 'px';
    if (slideContent.getBoundingClientRect().height <= targetHeight) {
      low = fontSize;
    } else {
      high = fontSize;
    }

    // check for exit condition
    if (!low) {
      return getBestFontSize(Math.floor(fontSize / 2));
    } else if (!high) {
      return getBestFontSize(fontSize * 2);
    } else {
      if (high - low > 1) {
        return getBestFontSize(Math.floor((high - low) / 2) + low);
      } else {
        return low; // exit!
      }
    }
  }
  slideContent.style.fontSize = getBestFontSize(50) + 'px';
}

function fitAllSlides() {
  slides.forEach(function(slide, idx) {
    fitSlideContent(slide, window.innerHeight * (idx ? 0.7 : 0.4));
  });
}

// Make it so, number one

window.addEventListener('resize', debounce(fitAllSlides, 50));
fitAllSlides();

//# sourceMappingURL=maps/app.js.map
