/**
 * DOM Elements
 */

var slides = [].slice.call(document.querySelectorAll('.s'));
var bg = document.querySelector('.bg');
var navLinks = [].slice.call(document.querySelectorAll('nav a.n-l')); // nav-links

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
  var componentStrings;
  componentStrings = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexString);
  if (componentStrings && componentStrings.length >= 4) {
    return {
      r: parseInt(componentStrings[1], 16),
      g: parseInt(componentStrings[2], 16),
      b: parseInt(componentStrings[3], 16)
    };
  }

  componentStrings = /rgb[a]*\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/gi.exec(hexString.replace(/\s*/gi,''));
  return {
    r: parseInt(componentStrings[1], 10),
    g: parseInt(componentStrings[2], 10),
    b: parseInt(componentStrings[3], 10),
  };
}

// detect mobile browsers
// yes, I know this is bad, but Spotify on mobile won't handle randomized tracksets, so I need to know when to fallback to static playlists
// from http://detectmobilebrowsers.com/
function isMobile() {
  return (function(a){
    return !!/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4));
  })(navigator.userAgent||navigator.vendor||window.opera);
}

/**
 * JS Flag
 */

document.body.classList.remove('no-js');
document.body.classList.add('js');
