Node Project Template
=====================

Use this to get started with a basic Node project that will need to serve front-end assets and handle non-trivial logic in its request handlers.

This repo gets you:

- basic Express setup
- minimal logging (HTTP logs via `morgan`, general-purpose logger via `winston`)
- a catch-all error handler
- simple request/response compression and JSON parsing
- Dust view rendering engine
- Gulp build for Sass/JS with sourcemaps
- static files and favicon served from `/public`
- project settings (see `package.json`, `.editorconfig`, `.gitignore`)

How to Use
----------

After cloning this repo, verify that the project works for you locally. Start by installing dependencies, building front-end assets, and starting the server:

```bash
npm install
gulp build
npm run start
```

Now you should be able to see the "Hello World" at http://localhost:3000 and see some activity in your terminal.

Before beginning your project, make sure to:

1. change project name, description, repository url, and author in `package.json`
1. change `<title>` and add meta tags to main view
1. change the `client-src/favicon.png`
1. update this `README.md`
1. change your git remote (`git remote remove origin`, `git remote add origin <your_new_repo_url>`)

Troubleshooting
---------------

This project assumes you are running Node >=4.0. If you have trouble running the project, check your version of Node with `node -v`.

If you see an error about the `public/` directory not existing while trying to start the server, you probably forgot to run `gulp build` first. This is needed to build the front-end assets.

If you see an error about the `public/` directory not existing while trying to run your `gulp build`, then try creating the directory manually (`mkdir public`).
