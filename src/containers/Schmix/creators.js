import { ADD_TRACK, SET_PAN, SET_GAIN, SET_MUTE } from './reducers';

export function addTrack() {
  return { type: ADD_TRACK };
}

export function setPan(index, value) {
  return { type: SET_PAN, payload: { index, value } };
}

export function setGain(index, value) {
  return { type: SET_GAIN, payload: { index, value } };
}

export function setMute(index, value) {
  return { type: SET_MUTE, payload: { index, value } };
}
