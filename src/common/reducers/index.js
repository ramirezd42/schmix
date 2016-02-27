import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';
import landingPage from '../../containers/LandingPage/LandingPage.reducers.js';
import { delayReducer as delay } from '../components/effects/Delay/Delay.reducers';

const rootReducer = combineReducers({
  router,
  delay,
  landingPage
});

export default rootReducer;
