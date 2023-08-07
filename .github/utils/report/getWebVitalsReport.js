import fs from "fs";

import getScoreBadge from "./getScoreBadge.js";
import { IS_SHOW_DETAIL, WEB_VITALS_METRICS } from "./static.js";

import { formatCategory } from "../format/index.js";
import { calculateAverage, calculateAverageWithUnit } from '../calculate/index.js'

export default function getWebVitalsReport(data) {
  const averageObj = getAggregatedData(data);
  
  getAverageContent(averageObj);
  IS_SHOW_DETAIL && getTotalContent(averageObj, data.length);
};

function getAverageContent(averageObj) {
  const performanceResult = [
    "| Scale | Web Vitals | `Average` |",
    "| --- | --- | --- |",
    ...getTableContent(averageObj),
  ].join("\n");

  console.log('**📃 Web Vitals Summary :**\n');
  console.log(performanceResult + '\n');
}

function getTotalContent(averageObj, length) {
  const performanceKeys = Object.keys(averageObj);

  const detailResult = performanceKeys.map((category) => {
    const values = averageObj[category]['values'];
    const averageBadge = getScoreBadge(calculateAverage(averageObj[category]['scores']) * 100);
    return `| ${averageBadge} | **${formatCategory(category)}** | ${values.join(' | ')} |`;
  })

  const tableHeaders = Array.from({ length }, (_, index) => `Value ${index + 1}`);
  const tableDivider = Array.from({ length }, () => ` ---- `);

  console.log('<details><summary>Detail Results</summary>\n');
  console.log(`| Scale | Category | ${tableHeaders.join(' | ')} |`);
  console.log(`| ---- | ---- | ${tableDivider.join(' | ')} |`);
  console.log(detailResult.join('\n') + '\n');
  console.log('</details>\n');
}

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

function getTableContent(averageObj) {
  return WEB_VITALS_METRICS.map((value) =>{
    const scoreBadge = getScoreBadge(calculateAverage(averageObj[value]['scores']) * 100);
    const scorePercent = calculateAverageWithUnit(averageObj[value]['values']);
    const formattedCategory = formatCategory(value);
    return `| ${scoreBadge} | **${formattedCategory}** | ${scorePercent} |`;
  });
}