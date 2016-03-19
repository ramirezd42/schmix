import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Schmix from './containers/Schmix';

export default (
  <Route path="/" component={App}>
    <IndexRoute name="Schmix" component={Schmix} />
  </Route>
);
