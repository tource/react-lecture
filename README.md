# 리액트 프로젝트 생성

## 1. 프로젝트 생성법

- 단계 1. 반드시 프로젝트 폴더 만들어준다.
- 단계 2. 프로젝트명은 반드시 소문자로 구성
- 단계 3. npx 는 소스를 다운받지 않고 임시저장공간에서 처리하고 삭제
  : 개인 학습용 프로젝트( JS 진행 )
  `npx create-react-app ./`

  : 협업 및 현장 개발 프로젝트 (TS 권장)
  `npx create-react-app ./ --template typescript`

## 2. 기본 작업 순서

### 2.1. /public 폴더에 www 폴더 생성 후 퍼블리싱 작업 권장

: /public/www/image 폴더
: /public/www/css 폴더
: /public/www/js 폴더
: /public/www/asset 폴더
: /public/www/index.html

### 2.2. React JS 버전 또는 TS 버전 작업

- JS 주의 사항
  : 일반 js 파일은 소문자.js
  : 리액트(컴포넌트) js 파일은 Pascal형태.js
  : 간헐적으로 컴포넌트를 Pascal형태.jsx 로 된 파일도 인정

- TS 주의 사항(반드시 확장자 구분)
  : 일반 ts 파일은 소문자.ts
  : 리액트(컴포넌트) ts 파일은 Pascal형태.tsx

- 만약 리액트에서 활용하는 파일이라면 모두 /src 폴더 내에 배치한다.

## 3. 프로젝트 구조 및 파일의 이해

### 3.1. node_modules 폴더

- 다운로드 받은 js 파일들이 저장되는 장소
- 용량이 엄청 큽니다.
- npm install 라이브러리 실행시 node_modules 에 저장됨.
- yarn install 라이브러리 실행시 node_modules 에 저장됨.
- 정말 주의해야 하는 것은 npm / yarn 을 혼합해서 사용하면 안됨.
- node_modules 는 용량이 커서 깃허브 또는 파일로 전달하지 않음.
- 프로젝트를 공유하는 경우는 node_modules 는 `npm install` 로 대체
- 실수로 소스가 문제시는 node_modules 폴더 및 package-lock.json 삭제
- package.json 은 npm 설치의 기준이 되므로 절대 삭제 금지

### 3.2. public 폴더

- `npm run build` 명령시 public 폴더는 그대로 저장됨.
- `npm run build` 명령시 src 폴더는 압축해서 저장됨.
  : src 폴더 안쪽의 내용은 webpack(압축,최적화) 의 대상이 됩니다.
  : src 폴더 안쪽의 js 파일은 최신 버전이므로 Babel 을 통해 이전 버전으로 수정
- favicon.ico (즐겨찾기, 웹브라우저 아이콘)
  : https://realfavicongenerator.net/
- index.html
  : 최초 웹브라우저 실행 파일
  : 파일명 수정 금지
- logo~.png 은 바로가기 및 휴대폰에 바탕화면 저장시 활용
  : 파일명은 동일하게 유지하는게 편하다.
- manifest.json 은 모바일 기기에 실행에 대한 정보
  : 아래는 수정을 좀 해요
  ```json
  "short_name": "React App",
  "name": "Create React App Sample"
  ```
- robots.txt
  : 네이버, 구글 검색엔진에 노출되는 정보 및 범위 기재
  : 네이버 서치 어드바이저, 구글 검색 등록시 진행

- 없지만 있어야 하는 파일이 sitemap.xml 입니다.

### 3.3. src 폴더

- webpack(번들링 도구) 과 babel(번역도구) 에 대상이 됩니다.
- App.css
  : App 컴포넌트 css
- App.test.tsx
  : TDD 에 활용되는 파일(Test Driven Develope)
  : 테스트주도개발 방식에 활용되는 파일
  : 처음에는 삭제의 대상파일
- App.tsx
  : 첫화면용 컴포넌트파일
- index.css
  : 앱 전체에 css 기본 파일
- index.tsx
  : 첫화면용 파일
  : 파일명은 index.js 로 변경은 가능함.
- logo.svg
  : 삭제
- react-app-env.d.ts
  : 리액트 프로젝트에서 타입스크립트 쓰는 경우 필수 파일
- reportWebVitals.ts
  : 구글에서 성능의 상태를 시각적으로 보여줌.
  : 삭제
- setupTests.ts
  : TDD 셋팅
  : 삭제

### 3.4. src 폴더/기타파일

#### 3.4.1. `.gitignore`

- 깃허브에 업로드 금지내용 작성

#### 3.4.2. package-lock.json

- node_modules 내부의 각 파일들이 연결되는 의존성 내용 기재
- 새로 설치 즉 `npm install` 시 삭제 추천

#### 3.4.3. README.md

- md 확장자는 markdonw 의 줄임말
- markdown 문법으로 작성된 문서
- 설명서/안내서 파일

#### 3.4.4. package.json

- 프로젝트 환경 설정 파일
- dependencies 항목은 build 시 소스에 포함되는 js
- devDependencies 항목은 build 시 소스에 포함안됨
- scripts 항목은 npm 또는 yarn 실행시 간단한 명령어

#### 3.4.5. tsconfig.json

- 타입스크립트의 실행 환경 설정

## 4. 파일 정리 (추천)

### 4.1. public/index.html 수정 권장

- 주석 제거
- lang 속성 변경
- title 내용 수정

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>리액트 학습</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```

### 4.2. src/index.tsx 수정 권장

- reportWebVitals 제거
- reportWebVitals(); 제거
- React.StrictMode 제거

  ```tsx
  import React from "react";
  import ReactDOM from "react-dom/client";
  import "./index.css";
  import App from "./App";

  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
  );
  root.render(
    <>
      <App />
    </>,
  );
  ```

### 4.3. src/ 파일 제거 (권장)

- App.test.tsx 삭제
- logo.svg 삭제
- reportWebVitals.ts 삭제
- setupTests.ts 삭제

### 4.4. test 를 위해서 App.tsx 수정

```tsx
import React from "react";
import "./App.css";

function App() {
  return <>안녕하세요.</>;
}

export default App;
```

### 4.5. test 를 위해서 App.css 수정

- 내용만 삭제

### 4.6. test 를 위해서

- index.tsx
  : 확장자를 js 로 수정

  ```js
  import React from "react";
  import ReactDOM from "react-dom/client";
  import "./index.css";
  import App from "./App";
  // ts 에서는 데이터 종류를 구별한다.
  // as 는 강제로 타입지정
  // const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

  // js 버전
  const root = ReactDOM.createRoot(document.getElementById("root"));

  root.render(
    <>
      <App />
    </>,
  );
  ```

- App.tsx
  : 확장자를 js 로 수정

### 4.7. package.json 에서 불필요 라이브러리 제거

- dependencies 항목에서 TDD 라이브러 제거

```json
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "@types/jest": "^27.5.2",
```

- package.json 최종 내용

```json
{
  "name": "react-lecture",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@types/node": "^16.18.97",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-scripts": "5.0.1",
    "typescript": "^4.9.5",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": ["react-app", "react-app/jest"]
  },
  "browserslist": {
    "production": [">0.2%", "not dead", "not op_mini all"],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "@typescript-eslint/eslint-plugin": "^7.11.0",
    "@typescript-eslint/parser": "^7.11.0",
    "eslint": "^8.57.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-react": "^7.34.2",
    "prettier": "^3.2.5"
  }
}
```

### 4.8. test

- `npm run start`

## 5. 코딩 컨벤션 셋팅

### 5.1. ESLint

- 코딩 규칙, 에러 및 가이드 역할
- 추후 rules 항목을 팀에 맞게 설정
- 전제 조건은 VSCode 에 eslint 플러그인 설치후
- 아주 중요함, TypeScript 최신버전이 React 에 지원되지 않는다.
  : `npm install eslint-plugin-react@latest --save-dev`
  : `npm install eslint@8 --save-dev`
  : `npm install @typescript-eslint/parser@^7.11.0 --save-dev`
  : `npm install @typescript-eslint/eslint-plugin --save-dev`

- 아래의 구문은 사용하지 않는게 좋을 거 같아요.
  : 버전문제, 파일 생성 문제
  : `npx eslint --init`

- `.eslintrc.js` 파일 생성

  ```js
  module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react/recommended",
    ],
    overrides: [
      {
        env: {
          node: true,
        },
        files: [".eslintrc.{js,cjs}"],
        parserOptions: {
          sourceType: "script",
        },
      },
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: ["@typescript-eslint", "react"],
    rules: {},
  };
  ```

### 5.2. Prettier

- 문서포맷 설정
- `npm install --save-dev --exact prettier`
- `.prettierrc.json` 파일 생성
  ```json
  {
    "singleQuote": false,
    "semi": true,
    "useTabs": false,
    "tabWidth": 2,
    "trailingComma": "all",
    "printWidth": 80,
    "arrowParens": "avoid",
    "endOfLine": "auto"
  }
  ```

### 5.3. ESLint 에 Prettier 설정

- `npm install eslint-config-prettier --save-dev`
- `.eslintrc.js` 파일 내용 수정

  ```js
  module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react/recommended",
      "prettier",
    ],
    overrides: [
      {
        env: {
          node: true,
        },
        files: [".eslintrc.{js,cjs}"],
        parserOptions: {
          sourceType: "script",
        },
      },
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: ["@typescript-eslint", "react"],
    rules: {},
  };
  ```

### 5.4. test

- `App.js`
  : eslint 잘되는지 테스트
  : prettier 잘되는지 테스트

- .eslintre.js 에 rules 를 추가

  ```js
  module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react/recommended",
      "prettier",
    ],
    overrides: [
      {
        env: {
          node: true,
        },
        files: [".eslintrc.{js,cjs}"],
        parserOptions: {
          sourceType: "script",
        },
      },
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: ["@typescript-eslint", "react"],
    rules: {
      "react/react-in-jsx-scope": "off",
    },
  };
  ```

## 6. 필수 라이브러리 설치

### 6.1. dependencies 에 설치

- `npm install 라이브러리명`
- `npm install 라이브러리명@버전`

### 6.2.devDependencies 에 설치

- `npm install 라이브러리명 --save-dev`
- `npm install 라이브러리명@버전 --save-dev`

### 6.3.라이브러리 설치시 TS 버전을 확인필요

- https://www.npmjs.com/
- 라이브러리 검색시 TS 아이콘이 있는지 본다.
  : 만약 TS 아이콘이 없으면 @types/d.ts 파일을 고민해야 한다.
- 라이브러리 검색 후 Weekly Downloads 숫자를 본다.
- 예) emotion, axios 등

### 6.4.데이터 연동을 위한 라이브러리 설치

- axios 를 선택
- https://axios-http.com/kr/docs/api_intro
- `npm install axios`
- `npm install @types/axios`

### 6.5.css-in-js 연동을 위한 라이브러리 설치

- styled components
  : https://styled-components.com/

- emotion
  : https://emotion.sh/docs/introduction
  : `npm install @emotion/react @emotion/styled`

### 6.6.Router를 위한 라이브러리 설치

- Router 란 주소 즉, Path 를 말함.
- https://reactrouter.com/en/main
- 주의 사항
  : 리액트 버전에 따라서 다르다.
  : react-router-dom 버전에 따라서 다르다.
- `npm install react-router-dom`
- `npm install @types/react-router-dom`

### 6.7.슬라이드를 위한 라이브러리 설치(선택)

- Swiper
  : https://swiperjs.com/react
  : `npm install swiper`

- Slick(별도 TS 지원 필요)
  : https://kenwheeler.github.io/slick/
  : `npm install react-slick slick-carousel`

### 6.8.딩벳아이콘을 위한 라이브러리 설치(선택)

- fontawesome
  : https://fontawesome.com/
  : `npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons @fortawesome/fontawesome-svg-core`
- react-icons
  : https://react-icons.github.io/react-icons/
  : `npm install react-icons`
