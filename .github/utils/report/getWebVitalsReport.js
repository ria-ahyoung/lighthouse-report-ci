import fs from "fs";

import { WEB_VITALS_METRICS } from "./DATA.js";
import getScoreBadge from "./getScoreBadge.js";

import { calculateAverage, calculateAverageWithUnit} from '../calculate/index.js'
import { formatCategory } from "../format/index.js";

export default function getWebVitalsReport(data) {
  const performanceData = getAggregatedData(data);
  
  const detail = [
    "| Scale | Web Vitals | Value |",
    "| --- | --- | --- |",
    ...getTableContent(performanceData),
  ].join("\n");

  console.log('**📃 Web Vitals Summary :**\n');
  console.log(detail + '\n');
};

function getAggregatedData(data) {
  const aggregatedData = {};

  data.forEach((result) => {
    const { jsonPath } = result;
    const { audits } = JSON.parse(fs.readFileSync(jsonPath));

    WEB_VITALS_METRICS.forEach((value) => {
      const displayValue = audits[value].displayValue;
      const scores = audits[value].score;

      if (!aggregatedData[value]) {
        aggregatedData[value] = { scores: [], values: [] };
      }

      aggregatedData[value].scores.push(scores);
      aggregatedData[value].values.push(displayValue);
    });
  });

  return aggregatedData;
}

function getTableContent(performanceData) {
  return WEB_VITALS_METRICS.map((value) =>{
    const scoreBadge = getScoreBadge(calculateAverage(performanceData[value]['scores']) * 100);
    const scorePercent = calculateAverageWithUnit(performanceData[value]['values']);
    const formattedCategory = formatCategory(value);
    return `| ${scoreBadge} | ${formattedCategory} | ${scorePercent} |`;
  });
}