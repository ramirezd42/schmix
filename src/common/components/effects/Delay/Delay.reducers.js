import { SET_BYPASS, SET_FEEDBACK, SET_DELAY_AMOUNT } from './Delay.actions';

const initialState = {
  bypass: false,
  feedback: 80,
  delayAmount: 500
};

export function delayReducer(state = initialState, action) {
  switch (action.type) {
    case SET_BYPASS:
      return Object.assign({}, state, {
        bypass: action.payload.value
      });
      break; // eslint-disable-line no-unreachable
    case SET_FEEDBACK:
      return Object.assign({}, state, {
        feedback: action.payload.value
      });
      break; // eslint-disable-line no-unreachable
    case SET_DELAY_AMOUNT:
      return Object.assign({}, state, {
        delayAmount: action.payload.value
      });
      break; // eslint-disable-line no-unreachable
    default:
      return state;
  }
}
