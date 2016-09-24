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
