import Immutable from 'immutable';
export const ADD_TRACK = 'ADD_TRACK';

export const SET_GAIN = 'SET_GAIN';
export const SET_PAN = 'SET_PAN';
export const SET_MUTE = 'SET_MUTE';

const initialTrackState = Immutable.Map({
  gain: 0.5,
  pan: 0,
  mute: false
});

const track = (state, action) => {
  switch (action.type) {
    case ADD_TRACK:
      return initialTrackState;
    case SET_GAIN:
      return state.set('gain', action.payload.value);
    case SET_PAN:
      return state.set('pan', action.payload.value);
    case SET_MUTE:
      return state.set('mute', action.payload.value);
    default:
      return state;
  }
};

const initialState = Immutable.List([]);

export default function tracks(state = initialState, action) {
  switch (action.type) {
    case ADD_TRACK:
      return state.push(track(undefined, action));
    case SET_GAIN:
    case SET_PAN:
    case SET_MUTE:
      return state.set(
        action.payload.index,
        track(state.get(action.payload.index), action)
      );
    default:
      return state;
  }
}
