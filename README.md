## schmix

This project is an ongoing experiment. My goal with this project is to develop a simplistic Digital Audio Workstation (*think protools for babies*) using the web audio API and eventually add support for integrating natively hosted audio plugins via another project of mine, [vst-js](http://github.com/ramirezd42/vst-js).

## Getting Started
The app currently exists as a an **electron** wrapper around a **React/Redux** web application. I don't currently have any pre-built binaries available, but you can get the app running on your local machine by following the steps below:

### Install NPM dependencies
Navigate to a working copy of this repo and run `npm install` to grab all of the npm dependencies.

### Building/Running the Production Build
To get the production build running simply run `npm start`

### Building/Running the Development Build
To run the development build which includes Hot Module Reloading:
* Serve up the dev build via **webpack-dev-server** by running `npm run serve`
* Start the app and point it to the served copy by running `npm run start:dev`

## Warning
This project is still very much in its infancy, don't actually use it for anything!

Currently the only supported feature is creating channel strips from files and adjusting their gain, pain, and mute controls. More to come!

## Comments/Feedback
This project is a learning experience for me. If you have any questions, comments, feedbacks, criticisms, whatever, open up an issue and let me hear it.

## License
MIT
