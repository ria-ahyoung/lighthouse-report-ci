import formatNumber from "../format/formatNumber.js";

export function calculateAverage(arr) {
  return arr.reduce((sum, num) => sum + num, 0) / arr.length;
}

export function calculateAverageWithUnit(arr) {
  const unit = arr[0].replace(/[0-9.]/g, ''); 
  const average = calculateAverage(arr.map((value) => parseFloat(value)))
  return formatNumber(average) + unit;
}
