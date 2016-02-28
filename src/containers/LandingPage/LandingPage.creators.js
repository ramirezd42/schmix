import { SOURCE_NODE_SET } from './LandingPage.reducers';

export function setSourceNode(value) {
  return { type: SOURCE_NODE_SET, payload: { value } };
}
