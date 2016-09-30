var setupStarfield = function() {
  var i, star;

  var starfield = document.querySelector('.sf');

  var originalStar = document.getElementById('star');

  var stars = [];
  for (i = 0; i < 150; i += 1) {
    star = originalStar.cloneNode(true);
    star.removeAttribute('id');
    starfield.appendChild(star);
    stars.push({ el: star });
  }

  function tweenStar(star, startingProgress) {
    if (star.tween) {
      window.cancelAnimationFrame(star.tween.id);
    }

    star.tween = { //ix, fx, iy, fy, startTime, id, duration
      duration: 13000
    };

    //randomize scale, starting radius, and angle
    var s = (Math.random() * 0.5) + 0.25; // 0.25 - 0.75
    var r = (Math.random() * 150) + 10; // 10 - 160
    var a = Math.random();
    a = (Math.cos(a * 4 * Math.PI) + 1) * (a >= 0.25 && a < 0.75 ? -0.5 : 0.5) * Math.PI; // -pi to pi (weighted towards -pi,0,pi)
    star.tween.ix = Math.cos(a) * r + 200;
    star.tween.iy = Math.sin(a) * r + 150;

    r += 20 + (50 * Math.random() * (1 / s)); //calc ending radius (86 - 220)
    star.tween.fx = Math.cos(a) * r + 200;
    star.tween.fy = Math.sin(a) * r + 150;

    star.el.setAttribute('r', s * 4);

    function stepStarTween(ts) {
      // timing
      if (!star.tween.startTime) {
        if (startingProgress) {
          star.tween.startTime = Math.floor(ts - (startingProgress * star.tween.duration));
        } else {
          star.tween.startTime = ts;
        }
      }
      var progress = Math.min((ts - star.tween.startTime) / star.tween.duration, 1.0);
      var easeInSineProgess = easeInSine(progress);

      // update
      star.el.setAttribute('cx', star.tween.ix + (easeInSineProgess * (star.tween.fx - star.tween.ix)));
      star.el.setAttribute('cy', star.tween.iy + (easeInSineProgess * (star.tween.fy - star.tween.iy)));
      if (progress <= 0.22) {
        star.el.setAttribute('opacity', easeOutSine(progress / 0.22));
      } else if (progress >= 0.78) {
        star.el.setAttribute('opacity', easeInSine((1.0 - progress) / 0.22));
      } else {
        star.el.setAttribute('opacity', 1.0);
      }

      // continue or exit
      if (progress < 1.0) {
        star.tween.id = window.requestAnimationFrame(stepStarTween);
      } else {
        star.tween = null;
        setTimeout(tweenStar, 1 + Math.floor(Math.random() * 1300), star); // restart
      }
    }

    // console.log(`star: x (${star.tween.ix} -> ${star.tween.fx}), y (${star.tween.iy} -> ${star.tween.fy}), s (${s*4}), start (${star.tween.startTime}) now (${Date.now()})`)
    star.tween.id = window.requestAnimationFrame(stepStarTween);
  }

  //start animating each star
  stars.forEach(function(star) {
    tweenStar(star, Math.random());
  });
};

/**
 * Make it so, number one
 */
if (!isMobile()) {
  setupStarfield();
}
