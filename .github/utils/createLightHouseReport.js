import fs from "fs";

import { REPORT_FILE_PATH } from "./report/static.js";
import { getWebVitalsReport, getAuditsReport } from "./report/index.js";

export default async function createLightHouseReport() {
  const results = JSON.parse(fs.readFileSync(REPORT_FILE_PATH));

  console.log('### Lighthouse Performance Report');
  console.log(`> Lighthouse 성능 측정 자동화 리포트 (측정 횟수 : \`${results.length}\`)\n`);

  getAuditsReport(results);
  getWebVitalsReport(results);
}

await createLightHouseReport();
