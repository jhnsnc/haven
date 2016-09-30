var spotifyEmbed = document.querySelector('.s-e');

var insertSpotifyEmbed = function() {
  spotifyEmbed.querySelector('svg').remove();

  // create iframe element
  var iframe = document.createElement('iframe');
  iframe.src = 'https://embed.spotify.com/?uri=spotify:' + (isMobile() ? spotifyEmbed.dataset.playlist : spotifyEmbed.dataset.tracks);
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
