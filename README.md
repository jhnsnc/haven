Haven
=====

Overview
--------

Haven is a simple web app for helping you get started with meditation.

If that sounds strange or foreign to you, don’t worry! Meditation is simply about taking time for yourself and giving yourself permission to be still, calm, and thoughtfully focused.

Of course, meditation can involve mantras, yoga poses, and so on, but this app focuses on simpler, more accessible meditation. If you’re like most people, you could use a little more clarity and focus in your life, so take 5 minutes and let Haven guide you through a simple meditation session. It’s one of the simplest things you can do to improve your mental health.

Technical Details
-----------------

Features:

- content remains usable with JavaScript disabled
- keyboard navigation (arrow keys, spacebar/backspace, page up/down)
- optional Spotify embed available for easy access to relaxing music (requires Spotify app/account on your device, loads controller in an iframe)
- relaxing colorshifting background and particle effect
- clean, manually optimized SVG graphics
- particle effects get shut off on mobile devices to save battery
- limited HTTP requests (4 or fewer)
- tiny download size (under 10k)

No client-side libraries were used for this project. The few functions that were borrowed from blogs/articles/etc are noted as such in the source. Note that there is very little error handling or sanity checks in the client-side JS. This is because of the tight size limitations--not because it is a good idea (it's not a good idea).

Server-side, many common Node tools were used: gulp for client build (Sass, uglify, autoprefixer, etc), express for HTTP server, dust for template rendering, and so on. You may also notice that the content is semi-randomized (this is most easily noticed on the initial view). The [tracery-grammar](https://www.npmjs.com/package/tracery-grammar) Node module (based on [Tracery.js](https://github.com/galaxykate/tracery/)) was used to compose the content from smaller clips. I had originally intended the content to be more significantly randomized, but a compressed development timeline necessitated paring it down to only minor variations.

Contribution
------------

I would welcome any comments, suggestions, or contributions. You can submit an issue here, find [me on Twitter](https://twitter.com/jhnsnc), or simple fork this repo and make a pull request with your changes. I am particularly interested in contributions of better content. Currently, the guidance text is very simple and perhaps a more experienced meditation practitioner or a meditation instructor would have better ideas for how to structure a session for beginners.

Setup
-----

You will need Node v4 or higher to run this app. You can check your Node version from the terminal with `node -v`.

First install the dependencies via npm then launch the app:

```
npm install
node app.js
```

The front-end files are already included in this repo in the `/public` folder (for easier deployment with Azure IIS). In order to rebuild client-side resources, we use the tool `gulp`. If you don't have it, you can install the gulp CLI with this command for convenience:

```
npm install -g gulp
```

Here are the gulp tasks defined for this project:

```
gulp clean # wipes the public directory
gulp build # builds assets for a development environment (verbose, includes sourcemaps)
gulp deploy # builds aseets for a production environment (strips comments and logs, minimizes file size)
gulp watch # build assets and rebuilds when source files change
```


Additional Info
---------------

Haven was submitted to the ["10k Apart" contest](https://a-k-apart.com/) on Sept 30, 2016.
