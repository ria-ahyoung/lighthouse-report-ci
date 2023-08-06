import getScoreBadge from "./getScoreBadge.js";
import formatCategory from "../format/formatCategory.js";

export default function getAuditsReport(data) {
  const averageObj = {};
  const AuditList = Object.keys(data[0].summary);

  AuditList.forEach((key) => {
    const sum = data.reduce((acc, item) => acc + item.summary[key], 0);
    averageObj[key] = (sum / data.length).toFixed(2);
  });

  const AuditsResult = [
    "| Scale | Category | Score |",
    "| --- | --- | --- |",
    ...getTableContent(averageObj),
  ].join("\n");

  console.log('**💡 Categories Summary :**\n');
  console.log(AuditsResult + '\n');
}

function getTableContent(averageObj) {
  return Object.entries(averageObj).map(([category, scoreValue]) => {
    const scorePercent = Math.round(scoreValue * 100);
    const scoreBadge = getScoreBadge(scorePercent);
    const formattedCategory = formatCategory(category);
    return `| ${scoreBadge} | ${formattedCategory} | ${scorePercent} |`;
  });
}