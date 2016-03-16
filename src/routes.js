import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import LandingPage from './containers/LandingPage';
import Mixer from './containers/Mixer';

export default (
  <Route path="/" component={App}>
    <IndexRoute name="LandingPage" component={LandingPage} />
    <Route path="mixer" name="Mixer" component={Mixer} />
  </Route>
);
