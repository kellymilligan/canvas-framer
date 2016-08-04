#HTML app to generate print-resolution artwork from Canvas graphics at common paper sizes (A0 - A4)

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

