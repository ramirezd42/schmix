import * as actions from './Delay.actions' ;
export function setBypass(value) {
  return { type: actions.SET_BYPASS, payload: { value } };
}

export function setFeedback(value) {
  return { type: actions.SET_FEEDBACK, payload: { value } };
}

export function setDelayAmount(value) {
  return { type: actions.SET_DELAY_AMOUNT, payload: { value } };
}
