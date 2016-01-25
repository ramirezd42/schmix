export default function valueToDegrees(value, minValue, maxValue, minDegrees, maxDegrees) {
  const valuePct = (value - minValue) / (maxValue - minValue);
  return (maxDegrees - minDegrees) * valuePct + minDegrees;
}
