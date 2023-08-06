# Lighthouse Report CI 

LightHouse 리포팅 결과를 바탕으로 PR 코멘트를 생성해주는 자동화 코드입니다.

CI 파이프라인에 구축하여 전체 사이트 성능에 미치는 영향을 자동으로 리포팅될 수 있도록 적용되어 있습니다. <br />

<img alt="image" src="https://github.com/ria-ahyoung/Tech-Lab/assets/136766625/59ff24b1-dc1d-4c02-96dc-cc43a37c207e">



### Result

- 프로젝트에서 `Lighthouse CI`를 활용하여 웹 사이트의 성능을 평가하고 실행된 결과의 평균값을 산출합니다.

- 아래 예시는 다섯 번 실행한 결과의 평균값에 대한 보고서입니다. Lighthouse CI로 통계된 결과를 포맷팅한 내용입니다.

<img width="700" alt="image" src="https://github.com/ria-ahyoung/Tech-Lab/assets/136766625/c6011e55-bd8c-44dd-9825-eb3b0466d100">


- 각 결과에 대한 세부 내용은 표 형태로 표시됩니다.
  - `Web Vitals Summary` 는 웹 사이트의 **핵심 성능 지표**
  - `Categories Summary` 는 **성능, 접근성, 최적화, SEO, PWA** 관련 항목들의 평가 점수를 나타냅니다.
 

- lighthouse 설정 파일에 명시된 `numberOfRuns` 횟수만큼 실행하여 데이터 결과를 집계하여 반환합니다.

### Quick Start

1. `LHCI` [Token 발급](https://github.com/apps/lighthouse-ci) 
  
    ```
    Set Secret Name :
      LHCI_GITHUB_APP_TOKEN
    ```


3. Setup `package.json` scripts (in root)

    ```js
    "scripts": {
      "start": "프로젝트 실행에 필요한 script 작성",
      "build": "프로젝트 빌드에 필요한 script 작성",
    }
    ```


3. Setup LightHouse config file (`.lighthouserc.js`)

    ```js
    module.exports = {
      ci: {
        collect: {
          staticDistDir: './build',
          startServerCommand: 'yarn start',
          url: ['http://localhost:3000'],
          numberOfRuns: 3,                // LightHouse 성능 측정 횟수
        },
        // ...
      },
    };
    ```

4. Modify Web Vitals Result Metric

    ```js 
    export const WEB_VITALS_METRICS = [
      // 리포트 결과 중 추가 혹은 제거하고 싶은 항목 수정
      "first-contentful-paint",
      "first-meaningful-paint",
      "speed-index",
      "total-blocking-time",
      "largest-contentful-paint",
      "cumulative-layout-shift",
    ];
    ```