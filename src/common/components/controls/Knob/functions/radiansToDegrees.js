export default function radiansToDegrees(rad) {
  let deg = rad * 180 / Math.PI;
  // only use positive degrees if the angle is in the 4th quadrant of the unit circle
  if (deg < 0 && deg < -90) {
    deg += 360;
  }
  return deg;
}
