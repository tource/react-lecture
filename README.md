# Recoil 적용

- `npm install recoil`

## 1. RecoilRoot 적용

- index.js

```js
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
// js 버전
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </BrowserRouter>,
);
```

## 2. atom 들을 생성

- /src/atoms/userAtom.js 생성

```js
import { atom } from "recoil";

// 사용자 인증정보(FB : uid, email, token 들)
export const recoil_UserCurrent = atom({
  key: "userCurrentState",
  default: null,
});
// 사용자의 DB 상에 저장된 정보
// {email:"", name:"", imageUrl:"http~"}
export const recoil_UserData = atom({
  key: "userDataState",
  default: null,
});
```

## 3. atom 활용

- /hooks/useAuth.js
