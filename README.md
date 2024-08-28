# Vite 프로젝트 생성 및 초기화

- yarn / vite / typescript

## 1. 초기 환경 설정

- [yarn 참고](https://www.heropy.dev/p/ijqX9h)
  : `npm install -g yarn`
  : `yarn --version`

## 2. vite

- [vite 참고](https://vitejs.dev/)

- 프로젝트 생성 `yarn create vite ./`
  : 만약 에러시 `yarn global add create-vite`
  : React 선택
  : TypeScript 선택
  : 참고사항(SWC 란? https://fe-developers.kakaoent.com/2022/220217-learn-babel-terser-swc/)

- yarn berry 셋팅
  : Zero Install 방식
  : Pnp (Plug 'n' Play) 방식
  : yarn 의 최신버전(yarn 2 이후 버전을 말함)
  : `yarn set version berry` (berry 버전 확정)
  : .yarnrc.yml 파일 생성 (`nodeLinker: pnp`)

  : 참고 사항

  ```yml
  globalFolder: D:\diary
  nodeLinker: node-modules
  ```

  : 적용 사항

  ```yml
  nodeLinker: node-modules
  ```

: `yarn` 또는 `yarn install`

: `yarn dev` 실행 시 오류발생 원인은 vscode 에서 zip 파일 해석이 안되는 이유

- Git 관리
  : .gitignore

```txt
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Vite 파일
.vite
# Vite cache
vite_cache
# Zero-Installs
.yarn/*
!.yarn/cache
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/sdks
!.yarn/versions
```

## 3. esLint 및 Prettier 셋팅

- `yarn add eslint eslint-plugin-react @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react-hooks eslint-plugin-jsx-a11y eslint-plugin-import --dev`
- .eslintrc.cjs 생성
- 만약에 다른 eslint가 있다면 삭제

```js
module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "prettier",
  ],
  plugins: ["react", "@typescript-eslint", "react-hooks", "jsx-a11y", "import"],
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      typescript: {},
    },
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          ["parent", "sibling", "index"],
        ],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
  },
};
```

- `yarn add prettier eslint-config-prettier eslint-plugin-prettier --dev`
- .prettierrc 파일 생성

```txt
{
  "printWidth": 120,
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "arrowParens": "always"
}
```

- package.json 추가

```json
 "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext .ts,.tsx",
    "format": "prettier --write ."
  }
```

## 4. env 환경설정시 접두어 변경

- `REACT_APP_단어` ===> `VITE_단어`

- 만약 typeScript 가 아닌 경우의 참조법
  `process.env.REACT_APP_단어` 참조
  `import.meta.env.VITE_단어` 참조

- 만약 typeScript 인 경우의 참조법
  `process.env.REACT_APP_단어` 참조

- VITE 의 .env 파일

```js
VITE_FIREBASE_API_KEY = XXXXXXXXXXXXXXXXXX;
VITE_FIREBASE_AUTH_DOMAIN = XXXXXXXXXXXXXXXXX;
VITE_FIREBASE_PROJECT_ID = XXXXXXXXXXXXXXXXXX;
VITE_FIREBASE_STORAGE_BUCKET = XXXXXXXXXXXXXXXXXX;
VITE_FIREBASE_MESSAGING_SENDER_ID = XXXXXXXXXXXXXXXXXX;
VITE_FIREBASE_APP_ID = XXXXXXXXXXXXXXXXXX;
```

- VITE 및 typeScript 라면
  : vite-env.d.ts 파일 수정

  ```ts
  // src/vite-env.d.ts
  /// <reference types="vite/client" />
  interface ImportMetaEnv {
    readonly VITE_FIREBASE_API_KEY: string;
    readonly VITE_FIREBASE_AUTH_DOMAIN: string;
    readonly VITE_FIREBASE_PROJECT_ID: string;
    readonly VITE_FIREBASE_STORAGE_BUCKET: string;
    readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
    readonly VITE_FIREBASE_APP_ID: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  ```

- /src/firebaseConfig.ts 파일 생성

```ts
import firebase from "firebase/compat/app";
// 인증
import "firebase/compat/auth";
// DB
import "firebase/compat/firestore";
// 파일공간
import "firebase/compat/storage";
// FirebaseConfig 타입 정의
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}
const firebaseConfig: FirebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_ATH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
// 기본 Key 세팅
firebase.initializeApp(firebaseConfig);
const auth: firebase.auth.Auth = firebase.auth();
const db: firebase.firestore.Firestore = firebase.firestore();
const storage: firebase.storage.Storage = firebase.storage();
export { auth, db, storage };
```

- firebase-tools 설치
  : 아래 구문은 기존에 이미 설정함.
  : yarn 을 사용하지 말고 설정할 필요
  : `npm install -g firebase-tools`
  : `firebase init`
