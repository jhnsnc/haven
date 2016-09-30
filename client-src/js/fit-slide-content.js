// Resizes text for each slide to fit tight inside the container

function fitSlideContent(slide, targetHeight) {
  console.log('fitting slide content in ' + targetHeight + ' pixels', slide);

  var slideContent = slide.querySelector('p');
  var slideButtons = [].slice.apply(slide.querySelectorAll('.b-b, .b-m-i'));

  // HACK - force refresh after resize
  var slideContentPieces = [].slice.apply(slideContent.querySelectorAll('span,em'));
  slideContentPieces.forEach(function(el) {
    el.classList.remove('out');
    el.classList.remove('in');
  });

  var low = 0;
  var high = 0;
  var iterations = 0;
  var getBestFontSize = function(fontSize) {
    // early exit
    iterations += 1;
    if (iterations >= 20) {
      return low;
    }

    // check if font size fits
    slideContent.style.fontSize = fontSize + 'px';
    slideButtons.forEach(function(btn) {
      btn.style.fontSize = fontSize + 'px';
    })
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

  var bestFontSize = getBestFontSize(64);
  slideContent.style.fontSize = bestFontSize + 'px';
  slideButtons.forEach(function(btn) {
    btn.style.fontSize = bestFontSize + 'px';
  });

  // HACK - force refresh after resize
  if(currentSlide === parseInt(slide.dataset.s, 10)) {
    slideContentPieces.forEach(fadeInContent);
  }
}

function fitAllSlides() {
  slides.forEach(function(slide, idx) {
    slide.classList.add('sz'); // sizing
    fitSlideContent(slide, window.innerHeight - 150); // hard-coding 150 as slide top/bottom padding (10 + 140)
    slide.classList.remove('sz');
  });
}

// Make it so, number one

window.addEventListener('resize', debounce(fitAllSlides, 50));
fitAllSlides();
