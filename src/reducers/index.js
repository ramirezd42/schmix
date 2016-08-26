import { combineReducers } from 'redux';
// import { delayReducer as delay } from '../components/effects/Delay/Delay.reducers';
import tracks from '../containers/Schmix/reducers.js';

const rootReducer = combineReducers({
  // delay,
  tracks
});

export default rootReducer;
