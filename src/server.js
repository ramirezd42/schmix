import 'babel/polyfill';
import path from 'path';
import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import routes from './routes';
import createLocation from 'history/lib/createLocation';
import { match } from 'react-router';
import Html from './common/components/Html';
import bodyParser from 'body-parser';

const DEBUG = process.env.NODE_ENV !== 'production';
const PKG_VERSION = process.env.npm_package_version;
const PORT = process.env.PORT || 8080;
const server = global.server = express();

server.set('port', (process.env.PORT || PORT));

server.use(bodyParser.json());

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  next();
});

// server.use(require('./server/api/users'));

server.use(express.static(path.join(__dirname, 'public')));
//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------

// The top-level React component + HTML template for it

// This is fired every time the server side receives a request
server.get('*', (req, res, next) => {
  try {
    const statusCode = 200;

    const data = {
      title: '',
      description: '',
      css: '',
      body: '',
      debug: DEBUG, // eslint-disable-line no-undef
      version: PKG_VERSION
    };
    const css = [];
    const location = createLocation(req.url);
    // const history = createHistory(req.url);

    match({ routes, location }, (error, redirectLocation, renderProps) => {
      if (redirectLocation) {
        res.redirect(301, redirectLocation.pathname + redirectLocation.search);
      } else if (error) {
        res.status(500).send(error.message);
      } else if (renderProps === null) {
        res.status(404).send('Not found');
      } else {
        data.title = 'DME';
        // data.body = renderToString(<RoutingContext history={history}
        //                                            location={location} {...renderProps}/>);
        data.css = css.join('');
        const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
        res.status(statusCode).send(`<!doctype html>\n${html}`);
      }
    });
  } catch (err) {
    next(err);
  }
});

//
// Launch the server
// -----------------------------------------------------------------------------

server.listen(server.get('port'), (error) => {
  if (error) {
    console.error(error); // eslint-disable-line no-console
  } else {
    console.info(`The server is running at http://localhost:${server.get('port')}`); // eslint-disable-line no-console
    if (process.send) {
      process.send('online');
    }
  }
});
