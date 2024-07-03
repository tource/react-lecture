# Context 이해

- 컴포넌트는 useState
- 앱서비스는 Context API
- 하지만 불편해서 Redux-toolkit, Recoil 등
  : 이전 버전의 React 에서는 Context API 가 불편했다. 문법적으로
  : 문법적 및 유지보수를 위해서 앱 전체 상태관리도구 가 출현
  : Redux 가 가장 보편적으로 활용. 근데 어려웠다. 문법 및 활용
  : Redux-toolkit (RTK) 버전업 됨. 근데 어려웠다. 문법 및 활용
  : Recoil 이 편리하게 활용되면서 확대됨.

## 1. 적용단계

- /src/AppRoot.js 생성

```js
// 1. context 적용 1단계 ( createContext() )
// 2. context 적용 2단계 ( export 시키기 )
// 3. context 적용 3단계 (/src/context 폴더에 파일 생성 후 코드 이동)
// 4. context 적용 4단계 (미리 Provider 파일을 생성한다)
// - LoginProvider.js
// 5. context 적용 5단계 (파일관리 측면 createContex 이동)

import { useContext } from "react";
import { LoginContext, LoginProvider } from "./context/LoginProvider";

const AppRoot = () => {
  // 6. context 적용 6단계 : context 에 적용한  value를 컴포넌트(children) 에 활용
  const { userInfo, userLang, setUserInfo } = useContext(LoginContext);

  // 7. context 의 value 를 이용한 정보변경
  const handleClick = () => {
    setUserInfo("홍길동");
  };
  return (
    <LoginProvider>
      <div>
        <h1>사용자 : {userInfo}</h1>
        <h2>언어 : {userLang}</h2>
        <button
          onClick={() => {
            handleClick();
          }}
        >
          사용자 정보 변경
        </button>
      </div>
    </LoginProvider>
  );
};

export default AppRoot;
```

- /src/context/LoginProvider.js 생성

```js
import { createContext, useState } from "react";

// createContext 는 저장할 장소(공간)를 말함
export const LoginContext = createContext();
// 생성된 Context 를 어디에다가 적용할지 스코프(범위) 지정
// Provider 는 공급한다는 의미입니다. (Context 를 공급 )
export const LoginProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [userLang, setUserLang] = useState("ko");
  return (
    <LoginContext.Provider
      value={{ userInfo, userLang, setUserInfo, setUserLang }}
    >
      {/* 컴포넌트를 배치한다. */}
      {children}
    </LoginContext.Provider>
  );
};
```

## 2. ts 적용단계

- /src/AppRoot.tsx

```tsx
// 1. context 적용 1단계 ( createContext() )
// 2. context 적용 2단계 ( export 시키기 )
// 3. context 적용 3단계 (/src/context 폴더에 파일 생성 후 코드 이동)
// 4. context 적용 4단계 (미리 Provider 파일을 생성한다)
// - LoginProvider.js
// 5. context 적용 5단계 (파일관리 측면 createContex 이동)

import { useContext } from "react";
import { LoginContext, LoginProvider } from "./context/LoginProvider";

const AppRoot = () => {
  // 6. context 적용 6단계 : context 에 적용한  value를 컴포넌트(children) 에 활용
  const { userInfo, userLang, setUserInfo } = useContext(LoginContext);

  // 7. context 의 value 를 이용한 정보변경
  const handleClick = () => {
    setUserInfo("홍길동");
  };
  return (
    <LoginProvider>
      <div>
        <h1>사용자 : {userInfo}</h1>
        <h2>언어 : {userLang}</h2>
        <button
          onClick={() => {
            handleClick();
          }}
        >
          사용자 정보 변경
        </button>
      </div>
    </LoginProvider>
  );
};

export default AppRoot;
```

- /src/context/LoginProviderTs.tsx

```tsx
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

// 추후 export 할 자료 모양이므로
export interface UserInfo {
  id: string;
  age: number;
  isLogin: boolean;
}

interface LoginContextProps {
  userInfo: UserInfo | null;
  userLang: string | null;
  setUserInfo: Dispatch<SetStateAction<UserInfo | null>>;
  setUserLang: Dispatch<SetStateAction<string | null>>;
}

export const LoginContext = createContext<LoginContextProps | null>(null);

interface LoginProviderTsProps {
  children: React.ReactNode;
}

const LoginProviderTs: React.FC<LoginProviderTsProps> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [userLang, setUserLang] = useState<string | null>(null);
  //   setUserLang("ko");
  useEffect(() => {
    // 이자리에서 cookie 를 읽거나 localStorage, sessionStorage 읽기
    setUserLang("ko");
  }, []);

  return (
    <LoginContext.Provider
      value={{ userInfo, userLang, setUserInfo, setUserLang }}
    >
      {/* 컴포넌트를 배치한다. */}
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProviderTs;
```

## 3. 폴더 및 파일의 분리

- /src/context 폴더
  : LoginContextTs.tsx

```tsx
import { Dispatch, SetStateAction, createContext } from "react";
import { UserInfo } from "../types/UserInfo";

interface LoginContextProps {
  userInfo: UserInfo | null;
  userLang: string | null;
  setUserInfo: Dispatch<SetStateAction<UserInfo | null>>;
  setUserLang: Dispatch<SetStateAction<string | null>>;
}

export const LoginContext = createContext<LoginContextProps | null>(null);
```

- /src/provider 폴더
  : LoginProviderTs.tsx

```tsx
import { useEffect, useState } from "react";
import { LoginContext } from "../context/LoginContextTs";
import { UserInfo } from "../types/UserInfo";

interface LoginProviderTsProps {
  children: React.ReactNode;
}

const LoginProviderTs: React.FC<LoginProviderTsProps> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [userLang, setUserLang] = useState<string | null>(null);
  // setUserLang("ko");
  useEffect(() => {
    // 이자리에서 cookie 를 읽거나 localStorage, sessionStorage 읽기
    setUserLang("ko");
  }, []);

  return (
    <LoginContext.Provider
      value={{ userInfo, userLang, setUserInfo, setUserLang }}
    >
      {/_ 컴포넌트를 배치한다. _/}
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProviderTs;
```

- /src/types 폴더
  : UserInfo.ts

```ts
// 추후 export 할 자료 모양이므로
export interface UserInfo {
  id: string;
  age: number;
  isLogin: boolean;
}
```
