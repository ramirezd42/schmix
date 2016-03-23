export default function positionToRadians(elem, x, y) {
  const elemRect = elem.getBoundingClientRect();
  const a = { x: x - elemRect.left, y: y - elemRect.top };
  const b = { x: elem.offsetWidth / 2, y: elem.offsetHeight / 2 };
  return Math.atan2(b.y - a.y, b.x - a.x);
}
