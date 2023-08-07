import { IS_SHOW_DETAIL } from "./static.js";
import getScoreBadge from "./getScoreBadge.js";
import formatCategory from "../format/formatCategory.js";

export default function getAuditsReport(data) {
  const averageObj = {};
  const auditKeys = Object.keys(data[0].summary);

  auditKeys.forEach((key) => {
    const sum = data.reduce((acc, item) => acc + item.summary[key], 0);
    averageObj[key] = (sum / data.length).toFixed(2);
  });

  getAverageContent(averageObj);
  IS_SHOW_DETAIL && getTotalContent(averageObj, auditKeys, data);
}

function getAverageContent(averageObj) {
  const AuditsResult = [
    "| Scale | Category | `Average` |",
    "| --- | --- | --- |",
    ...getTableContent(averageObj),
  ].join("\n");

  console.log('**💡 Categories Summary :**\n');
  console.log(AuditsResult + '\n');
}

function getTotalContent(averageObj, auditKeys, data) {
  const detailResult = auditKeys.map(category => {
    const scores = data.map(({ summary }) => Math.round(summary[category] * 100));
    const averageBadge = getScoreBadge(averageObj[category] * 100);
    return `| ${averageBadge} | **${formatCategory(category)}** | ${scores.join(' | ')} |`;
  }) 
  const scoreHeaders = data.map((_, index) => `Score ${index + 1}`)
  const tableDivider = data.map((_) => ` ---- `)

  console.log('<details><summary>Detail Results</summary>\n');
  console.log(`| Scale | Category | ${scoreHeaders.join(' | ')} |`);
  console.log(`| ---- | ---- | ${tableDivider.join(' | ')} |`);
  console.log(detailResult.join('\n') + '\n');
  console.log('</details>\n\n')
}


function getTableContent(averageObj) {
  return Object.entries(averageObj).map(([category, scoreValue]) => {
    const scorePercent = Math.round(scoreValue * 100);
    const scoreBadge = getScoreBadge(scorePercent);
    const formattedCategory = formatCategory(category);
    return `| ${scoreBadge} | **${formattedCategory}** | ${scorePercent} |`;
  });
}