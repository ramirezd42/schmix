import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';
import { delayReducer as delay } from '../components/effects/Delay/Delay.reducers';

const rootReducer = combineReducers({
  router,
  delay
});

export default rootReducer;
