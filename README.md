# Custom Hook

## 1. Hook 이란

- 리액트 컴포넌트에서 state 와 lifecycle 를 사용할 수 있도록 도와주는 함수
- state 는 일반적으로 useState 를 말함.
- lifecycle 은 일반적으로 useEffect 를 말함.
- 리액트에 기본적으로 포함된 use 류의 함수들을 통해 제공한다.
- 컴포넌트가 화면에 보이기 위한 각 단계에서 자동으로 실행되도록 지원함.
- 이름은 반드시 use를 붙여준다. (리액트의 코드 관례)

## 2. 커스텀훅 이란

- 각 컴포넌트에 동일하게 활용할 기능을 만들 수 있다.
- 개발자가 직접 만들어준 Hook 으로 반드시 이름에 use 를 붙여서 생성하여야 한다.
- use 를 붙이지 않으면 리액트의 기본적 Hook 기능을 첨부해 주지 않는다.
- 컴포넌트에 여러번 재 사용할 기능을 만들어 둔다는 개념. (구조화)
- 리액트의 기본 use Hook들을 모아서 관리한다.

## 3. 다양한 커스텀 훅 만들어보기

- 기본적 폴더 구조
  : `/src/hooks` 생성 권장

### 3.1. axios 호출 및 결과, 오류 등의 리턴용 Hook

- `src/hooks/useAxios.js`

```js
// 일반적으로 모든 개발자는 axios 호출시, 주소와 자료를 전달할 것이다.
// get 또는 post, put, delete 등을 전달할 것이다.
// 우리회사 개발시에는 직접 사용하지 말고 custom Hook 을 만들어서
// 코딩 컨벤션을 하겠다는 의도로 제작

// 사용자
// const {data, loading, error} = useAxios("/api/member/1", null, "get");
// const {data, loading, error} = useAxios("/api/user", {user:"kim"}, "post");

import axios from "axios";
import { useEffect, useState } from "react";
const useAxios = (_url, _payload = null, _method = "GET") => {
  // axios 실행 후 돌려받은 결과물
  const [data, setData] = useState(null);
  // axios 실행 중 로딩창 실행
  const [loading, setLoading] = useState(false);
  // axios 실행 시 에러 메시지
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        // _method 에 따른 처리
        let response;
        let method = _method.toUpperCase(_method);
        switch (method) {
          case "GET":
            response = axios.get(_url);
            break;
          case "POST":
            response = axios.post(_url, _payload);
            break;
          case "PUT":
            response = axios.put(_url, _payload);
            break;
          case "DELETE":
            response = axios.delete(_url);
            break;
          default:
            throw new Error(`${_method} 잘못 보내셨네요.`);
        }
        setData(response.data);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };

    // 실행하기
    fetchData();
    setLoading(false);
  }, [_url, _payload, _method]);

  // 커스텀 훅 실행 후 돌려받거나 전달할 내용
  return { data, loading, error };
};
export default useAxios;
```

- 사용

```js
import React from "react";
import useAxios from "./hooks/useAxios";

const AppUse = () => {
  // 아래의 경우는 돌려받는 이름이 똑같아서 여러번 활용이 어렵다.
  // 그래서 별도의 별칭을 하나 더 작성한다.
  const {
    data: getData,
    loading: getLoading,
    error: getError,
  } = useAxios("/api/member/1", null, "get");
  const {
    data: postData,
    loading: postLoading,
    error: postError,
  } = useAxios("/api/user", { user: "kim" }, "post");

  return <div></div>;
};

export default AppUse;
```

### 3.2. 로그인용 Hook

- `src/hooks/useLogin.js`

```js
import axios from "axios";
import { useState } from "react";

// 로그인에 필요로한 기능을 모아서 제공한다.
// const {data, loading, error, login} = useLogin()
// const {isLogin} = useLogin()
const useLogin = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  const login = async (_id, _pass) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/login", { id: _id, pass: _pass });
      setData(response.data);
      setIsLogin(true);
    } catch (error) {
      console.log(error);
      setError(error);
      setIsLogin(false);
    }
    setLoading(false);
  };

  return { data, loading, error, login, isLogin };
};
export default useLogin;
```

### 3.2. 컴포넌트 상태관리 업데이트용 Hook

- `src/hooks/useComponent.js`

```js
import { useEffect, useState } from "react";

// 화면의 리사이즈를 체크하는 용도의 customHook
const useComponent = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
};
export default useComponent;
```
