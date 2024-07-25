# Recoil

- 장점
  : 참 사용하기가 쉽다. 마치 useState 처럼.
- 단점
  : 버전업 없다. 개발자 퇴사로 중지
- 제공 기능
  : 웹 서비스 전역 상태관리, 마치 Redux Toolkit 처럼
- https://recoiljs.org/ko/

## 1. 설치

- `npm install recoil`

## 2. 적용 단계

### 2.1. index.js 에 Provider 적용

```js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RecoilRoot } from "recoil";

// ts 에서는 데이터 종류를 구별한다.
// as 는 강제로 타입지정
// const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

// js 버전
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
);
```

## 2.2. atoms 만들기

- atom 은 전역 상태변수를 말함.
- /src/atoms 폴더 생성
- /src/atoms/counterState.js 폴더 생성

```js
import { atom } from "recoil";

// atom 만들기
export const counterState = atom({ key: "counterState", default: 0 });
```

## 2.3. atoms 활용하기

- /src/pages/Couter.js 생성

```js
import React from "react";
import { useRecoilState } from "recoil";
import { counterState } from "../atoms/counterState";

const Counter = () => {
  // atom 활용
  const [count, setCount] = useRecoilState(counterState);
  return (
    <div>
      <h1>atom 전역변수 숫자</h1>
      <h2>Counter: {count}</h2>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        증가
      </button>
      <button
        onClick={() => {
          setCount(count - 1);
        }}
      >
        감소
      </button>
    </div>
  );
};

export default Counter;
```

# 3. 회원로그인 만들기 및 적용

## 3.1. 회원로그인 정보 atom 만들기

- /src/atoms/formState.js 생성

```js
import { atom } from "recoil";

export const userNameStae = atom({ key: "userNameStae", default: "" });
export const userEmailStae = atom({ key: "userEmailStae", default: "" });
export const userPasswrdStae = atom({ key: "userPasswrdStae", default: "" });
```

- /src/pages/LoginForm.js 생성

```js
import React from "react";
import { useRecoilState } from "recoil";
import {
  userEmailStae,
  userNameStae,
  userPasswrdStae,
} from "../atoms/formState";

const LoginForm = () => {
  // atoms 활용
  const [userName, setUserName] = useRecoilState(userNameStae);
  const [userEmail, setUserEmail] = useRecoilState(userEmailStae);
  const [userPass, setUserPass] = useRecoilState(userPasswrdStae);

  const handleSubmit = e => {
    e.preventDefault();
    console.log("전송 : ", userName, userEmail, userPass);
  };
  return (
    <div>
      <h1>로그인입력폼</h1>
      <form
        onSubmit={e => {
          handleSubmit(e);
        }}
      >
        <div>
          <label>Name</label>
          <input
            type="text"
            value={userName}
            onChange={e => setUserName(e.target.value)}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={userEmail}
            onChange={e => setUserEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={userPass}
            onChange={e => setUserPass(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
```
