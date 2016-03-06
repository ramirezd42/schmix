import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import LandingPage from './containers/LandingPage';
import ChannelStrip from './common/components/ChannelStrip';

export default (
  <Route path="/" component={App}>
    <IndexRoute name="LandingPage" component={LandingPage} />
    <Route path="channel-strip" name="ChannelStrip" component={ChannelStrip} />
  </Route>
);
