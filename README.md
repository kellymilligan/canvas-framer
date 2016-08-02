#Simple and frameworkless visual development template

## Features
- Frameworkless, only `jQuery` and `lodash` as required dependencies
- OLOO style inheritance
- Base object for common variables and hierarchy management
- Dead simple build and live-reload setup using `webpack` and `webpack-dev-server`
- Basic SCSS scaffold, including normalize and critical CSS
- Example modules for new children, matrix transforms, THREE.js, full-page shaders (THREE.js), and 2D canvas.

## Install and usage

Ensure you've got [node/npm](https://nodejs.org/en/) installed.

####1.
Install `webpack` and `webpack-dev-server` globally
`npm install webpack -g`
`npm install webpack-dev-server -g`

####2.
Run `npm install` 

####3. 
Run `webpack-dev-server --progress --colors`

####4.
Go to `http://localhost:8080/webpack-dev-server/app/` in your browser

### Serving inline:
You may want to serve the app inline, without the `webpack-dev-server` app frame (e.g. to see url changes correctly). You can do this by adding the `--inline` flag.

Run `webpack-dev-server --progress --colors --inline`

Go to `http://localhost:8080/app/` in your browser

### Serving on network:
You may want to serve the app so that it can be accessed at your local network IP (e.g. for device testing). Use the `--host` flag and your local network IP address:

Run `webpack-dev-server --progress --colors --inline --host 192.168.X.XXX`

Go to `http://192.168.X.XXX:8080/app/` on your own browser or other devices 


###To create a minified bundle:
Run `webpack -p --config ./webpack.production.config.js`, which will create bundle.min.js alongside the normal bundle.js file. 

##NOTES:
- The animation frame calls can sometimes throw console errors during hot reloading, but it's nothing to worry about.
- In the webpack reporting you'll see a warning "the request of a dependency is an expression", which comes up every build. This is due to module style Sylvester is written in. There should be a way around this with webpack aliasing or loaders, but I haven't figured it out yet.

##Features to add:
- Improve build system to output minified `/dist` folder as a sibling to the main `app` folder. 
