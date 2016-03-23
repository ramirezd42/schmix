import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';
// import { delayReducer as delay } from '../components/effects/Delay/Delay.reducers';
import tracks from '../containers/Schmix/reducers.js';

const rootReducer = combineReducers({
  router,
  // delay,
  tracks
});

export default rootReducer;
