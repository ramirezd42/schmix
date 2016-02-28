export const SOURCE_NODE_SET = 'SOURCE_NODE_SET';
const initialState = {
  sourceNode: 'file'
};

export default function landingPage(state = initialState, action) {
  switch (action.type) {
    case SOURCE_NODE_SET:
      return Object.assign({}, state, {
        sourceNode: action.payload.value
      });
      break; // eslint-disable-line no-unreachable
    default:
      return state;
  }
}
