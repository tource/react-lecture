# Firebase

- https://firebase.google.com/?hl=ko

## 1. 프로젝트 관련 활용 npm

- react-router-dom
- react-icon
- tailwind
- firebase
- recoil

## 2. 배포

- firebase Hosting

## 3. 기능

- 회원 기능
  : Authentication(이메일필수)
  : Storage(이미지 저장)
  : 닉네임, 이메일, 비밀번호, 사용자이미지
  : CRUD

- 할일 기능
  : Cloud Firestore
  : Storage(이미지 저장)
  : 제목, 내용, 이미지, 날짜
  : CRUD

## 4. 프로젝트 생성

- Go to console 메뉴 선택
- Firebase 프로젝트 시작하기 또는 프로젝트 추가 선택
- 프로젝트 만들기 > Google 애널리틱스 제외 > 생성
- 프로젝트 설정 1.
  : Authentication (이메일/비밀번호 선택)
  : Cloud Storage 설정 (테스트모드 > Cloud Storage 위치 northeast3)
  : Cloud Firestore
  : Hosting
- 프로젝트 설정 2.
  : 프로젝트에 앱 설정
  : 웹 앱에 Firebase 추가 (닉네임: 나의 할일)
  : 아래 키는 외부 즉, gitHub 에 오픈되면 안됨.

```js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "XXXXXXXXXXXXXXXXXXX",
  authDomain: "XXXXXXXXXXXXXXXXXXX",
  projectId: "XXXXXXXXXXXXXXXXXXX",
  storageBucket: "XXXXXXXXXXXXXXXXXXX",
  messagingSenderId: "XXXXXXXXXXXXXXXXXXX",
  appId: "XXXXXXXXXXXXXXXXXXX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
```

## 5. firebase 설치

- `npm i firebase`

## 6. 기본 firebase 작업

- fb 연동을 위한 API 키 파일 생성
  : /src/firebaseConfig.js 생성
  : 기본 KEY 파악하기 (프로젝트설정>SDK 확인)

  ```js
  import firebase from "firebase/compat/app";
  // 인증
  import "firebase/compat/auth";
  // DB
  import "firebase/compat/firestore";
  // 파일공간
  import "firebase/compat/storage";
  // API 키
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
  };
  // 기본 Key 셋팅
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();
  const storage = firebase.storage();
  export { auth, db, storage };
  ```

  : .env 파일 생성 또는 내용 추가

  ```js
  REACT_APP_FIREBASE_API_KEY = XXXXXXXXXXXX;
  REACT_APP_FIREBASE_AUTH_DOMAIN = XXXXXXXXXXXX;
  REACT_APP_FIREBASE_PROJECT_ID = XXXXXXXXXXXX;
  REACT_APP_FIREBASE_STORAGE_BUCKET = XXXXXXXXXXXX;
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID = XXXXXXXXXXXX;
  REACT_APP_FIREBASE_APP_ID = XXXXXXXXXXXX;
  ```

  : .gitignore 파일 내용 확인

  ```txt
  # See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

  # dependencies
  /node_modules
  /.pnp
  .pnp.js

  # testing
  /coverage

  # production
  /build

  # misc
  .DS_Store
  .env.local
  .env.development.local
  .env.test.local
  .env.production.local

  npm-debug.log*
  yarn-debug.log*
  yarn-error.log*

  .env
  ```

## 7. 기본 폴더 작업

- /src/components 폴더
- /src/hooks 폴더
- /src/atoms 폴더

## 8. 기본 파일 작업

### 8.1. 회원가입 및 로그인, 정보수정 관련

- /src/components/Login.js 파일생성
- /src/components/Profile.js 파일생성
- /src/components/EditProfile.js 파일생성

### 8.2. 상단메뉴관련

- /src/components/Navbar.js 파일생성

### 8.3. 할일 관련 파일

- /src/components/Todo.js

### 8.4. 로그인 상태 체크 라우터 파일

: 첫 화면은 로그인 보여줌
: 로그인이 되면 라우터 이동시킴

- /src/components/ProtectedRoute.js

### 8.5. hooks 를 이용해서 자주 사용할 기능은 모아둔다.

: hook 은 리액트 컴포넌트에서 활용할 함수 모음
: hook 의 장점은 하나의 기능을 만들고 여러 컴포넌트에서 활용가능
: hook 을 함수로 만들면 기능 업데이트가 수월하다.
: 파일명은 use 로 시작해야 리액트에서 체크한다.

- /src/hooks/useAuth.js

```js
const useAuth = () => {};
export default useAuth;
```

## 9. 라우터 설정

- /src/App.js

```js
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import Navbar from "./components/Navbar";
import Todo from "./components/Todo";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/edit-profile" element={<EditProfile />}></Route>
        <Route path="/todo" element={<Todo />}></Route>
        <Route path="*" element={<h1>경로가 잘못되었습니다.</h1>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
```

## 10. FB 에 배포하기

- firebase-tools 설치
  : `npm install -g firebase-tools`

- 로그인하기
  : `firebase login` (터미널)
  : Allow Firebase to collect CLI and Emulator Suite usage and error reporting information? (Y/n)
  : Y
  : Success CLI 확인

- 초기화
  : `firebase init`
  : Are you ready to proceed? (Y/n)
  : Y
  : Which Firebase features do you want to set up for this directory? Press Space to select features, then Enter to confirm your choices. (Press <space> to select, <a> to toggle all, <i> to invert
  selection, and <enter> to proceed)
  : 키보드 상하방향키 이동후 Hosting 항목 Space 바를 선택
  : (\*) Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys
  : Please select an option: (Use arrow keys)
  : Use an existing project
  : 프로젝트 항목 선택
  : 아래는 주의하세요. (리액트에서 npm run build 하시면 build 폴더에 배포)
  : What do you want to use as your public directory? (public)
  : 반드시 build 라고 작성해서 엔터키 입력해야 합니다.
  : Configure as a single-page app (rewrite all urls to /index.html)? (y/N)
  : Y 엔터
  : Set up automatic builds and deploys with GitHub? (y/N)
  : N 엔터
  : firebase.json 과 .firebaserc 파일 생성 확인
  : `npm run build`
  : `firebase deploy`
