export const SOURCE_NODE_SET = 'SOURCE_NODE_SET';

export function setSourceNode(value) {
  return { type: SOURCE_NODE_SET, payload: { value } };
}
