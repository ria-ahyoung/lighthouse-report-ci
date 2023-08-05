export default function formatNumber(num) {
  return num % 1 === 0 ? num : num.toFixed(1);
}
