/**
 * Special note about this file:
 *   Yes, I know UA sniffing is generally a bad idea, but these checks are succinct (if imperfect) and we're bumping up against the 10k limit already.
 *   Many browsers left out with this app's approach could be made to work, but would require bloating our response size and/or using a polyfill
 */

function enableFooterDecorationFilter() {
  document.querySelector('.f-d g').setAttribute('filter', 'url(#ds)');
}

function enableNavLinkFilters() {
  navLinks.forEach(function(link) {
    link.querySelector('svg g').setAttribute('filter', 'url(#ds)');
  });
}

// Turn on SVG filters for browsers we have a high degree of confidence with
var ua = navigator.userAgent;
if (
  /chrome.+? edge/i.test(ua) // Edge
  || /chrome|crios|crmo/i.test(ua) // Chrome
  || /firefox|iceweasel|fxios/i.test(ua) // Firefox
  ) {
  enableFooterDecorationFilter();
  enableNavLinkFilters();
}
