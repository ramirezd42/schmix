import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import LandingPage from './containers/LandingPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute name="LandingPage" component={LandingPage} />
  </Route>
);
