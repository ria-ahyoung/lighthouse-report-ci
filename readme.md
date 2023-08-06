# Lighthouse Report CI 

LightHouse 리포팅 결과를 바탕으로 PR 코멘트를 생성해주는 자동화 코드입니다.

CI 파이프라인에 구축하여 전체 사이트 성능에 미치는 영향을 자동으로 리포팅될 수 있도록 적용되어 있습니다. <br />

<img alt="image" src="https://github.com/ria-ahyoung/Tech-Lab/assets/136766625/59ff24b1-dc1d-4c02-96dc-cc43a37c207e">



### Result

- 프로젝트에서 `Lighthouse CI`를 활용하여 웹 사이트의 성능을 평가하고 실행된 결과의 평균값을 산출합니다.

- 아래 예시는 다섯 번 실행한 결과의 평균값에 대한 보고서입니다. Lighthouse CI로 통계된 결과를 포맷팅한 내용입니다.


<img width="793" alt="image" src="https://github.com/ria-ahyoung/lighthouse-report-ci/assets/136766625/885b5e4c-6ac9-4064-a583-8176e7935bc1">



- 각 결과에 대한 세부 내용은 표 형태로 표시됩니다.
  - `Web Vitals Summary` 는 웹 사이트의 **핵심 성능 지표**
  - `Categories Summary` 는 **성능, 접근성, 최적화, SEO, PWA** 관련 항목들의 평가 점수를 나타냅니다.
 
- `IS_SHOW_DETAIL` [값 설정](https://github.com/ria-ahyoung/lighthouse-report-ci/blob/main/.github/utils/report/static.js#L1)을 통해 세부 결과 표기가 가능합니다.

  <img width="657" alt="image" src="https://github.com/ria-ahyoung/lighthouse-report-ci/assets/136766625/1c846bbd-f5f1-4ca1-bc96-137f7374881b">


- lighthouse [설정 파일](https://github.com/ria-ahyoung/lighthouse-report-ci/blob/main/.lighthouserc.js#L7)에 명시된 `numberOfRuns` 횟수만큼 실행한 데이터 결과를 집계하여 반환합니다.

### Quick Start

1. `LHCI` [Token 발급](https://github.com/apps/lighthouse-ci) 
  
    ```
    Set Secret Name :
      LHCI_GITHUB_APP_TOKEN
    ```


3. Setup `package.json` [scripts](https://github.com/ria-ahyoung/lighthouse-report-ci/blob/main/package.json#L9-L10) (in root)

    ```js
    "scripts": {
      "start": "프로젝트 실행에 필요한 script 작성",
      "build": "프로젝트 빌드에 필요한 script 작성",
    }
    ```


3. Setup [LightHouse config](https://github.com/ria-ahyoung/lighthouse-report-ci/blob/main/.lighthouserc.js) file (`.lighthouserc.js`)

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

4. Modify [Web Vitals Result Metrics](https://github.com/ria-ahyoung/lighthouse-report-ci/blob/main/.github/utils/report/DATA.js#L1-L8)

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

### Reference
 - [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
 - [How to set up continuous integration and deployment for your React app](https://medium.com/free-code-camp/how-to-set-up-continuous-integration-and-deployment-for-your-react-app-d09ae4525250)
 - [Lighthouse CI를 알아보고 Github Actions에 적용하기](https://fe-developers.kakaoent.com/2022/220602-lighthouse-with-github-actions/)