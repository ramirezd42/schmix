// convert degree to a value based on max and min values for the knob
export default function degreesToValue(degrees, minDegrees, maxDegrees, minValue, maxValue) {
  const degreePct = (degrees - minDegrees) / (maxDegrees - minDegrees);
  return (maxValue - minValue) * degreePct + minValue;
}
