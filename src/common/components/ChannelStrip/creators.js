import { SET_PAN, SET_GAIN, SET_MUTE } from './reducers';

export function setPan(value) {
  return { type: SET_PAN, payload: { value } };
}

export function setGain(value) {
  return { type: SET_GAIN, payload: { value } };
}

export function setMute(value) {
  return { type: SET_MUTE, payload: { value } };
}
