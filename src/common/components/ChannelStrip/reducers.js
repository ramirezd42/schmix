/* eslint-disable no-unreachable */
export const SET_GAIN = 'SET_GAIN';
export const SET_PAN = 'SET_PAN';
export const SET_MUTE = 'SET_MUTE';

const initialState = {
  gain: 0.5,
  pan: 0,
  mute: false
};

export default function channelStrip(state = initialState, action) {
  switch (action.type) {
    case SET_GAIN:
      return Object.assign({}, state, {
        gain: action.payload.value
      });
      break;
    case SET_PAN:
      return Object.assign({}, state, {
        pan: action.payload.value
      });
      break;
    case SET_MUTE:
      return Object.assign({}, state, {
        mute: action.payload.value
      });
      break;
    default:
      return state;
  }
}
