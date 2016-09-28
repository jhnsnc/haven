var spotifyEmbed = document.querySelector('.spotify-embed');

var insertSpotifyEmbed = function() {
  spotifyEmbed.querySelector('svg').remove();

  // create iframe element
  var iframe = document.createElement('iframe');
  iframe.src = spotifyEmbed.dataset.spotifyEmbed;
  iframe.setAttribute('width', 250);
  iframe.setAttribute('height', 80);
  iframe.setAttribute('frameborder', 0);
  iframe.setAttribute('allowtransparency', true);

  // add it
  spotifyEmbed.appendChild(iframe);
};

/**
 * Get it goin'
 */
spotifyEmbed.addEventListener('click', insertSpotifyEmbed);