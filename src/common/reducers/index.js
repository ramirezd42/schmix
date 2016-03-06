import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';
import landingPage from '../../containers/LandingPage/LandingPage.reducers.js';
import { delayReducer as delay } from '../components/effects/Delay/Delay.reducers';
import channelStrip from '../../common/components/ChannelStrip/reducers';

const rootReducer = combineReducers({
  router,
  delay,
  landingPage,
  channelStrip
});

export default rootReducer;
