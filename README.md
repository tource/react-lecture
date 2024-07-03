# Session Storage TS 버전

## 1. Session Storage 에 정보 저장

- `/src/pages/member/LoginSession.js`

```js
import React, { useEffect, useState } from "react";

const LoginSession = () => {
  // SessionStorage 에서 가져오므로 null 을 기본값셋팅
  const [userId, setUserId] = useState(null);
  // 1. SessionStorage 읽기
  useEffect(() => {
    const userLS = sessionStorage.getItem("userId");
    if (userId) {
      setUserId(userLS);
    }
  }, []);
  // 3. sessionStorage 삭제하기
  const handleLogout = e => {
    console.log("로그아웃");
    const userTyping = "";
    setUserId(userTyping);
    sessionStorage.removeItem("userId");
  };

  // 2. sessionStorage 업데이트하기
  const handleLogIn = e => {
    console.log("로그인 시도");
    const userTyping = "abc1234";
    setUserId(userTyping);
    sessionStorage.setItem("userId", userTyping);
  };

  return (
    <div>
      <h1>Login Session Storage</h1>
      {userId ? (
        <div>
          <p>로그인됨 : {userId}</p>
          <button onClick={e => handleLogout(e)}>로그아웃</button>
        </div>
      ) : (
        <div>
          <p>로그인시도</p>
          <button onClick={e => handleLogIn(e)}>로그인</button>
        </div>
      )}
    </div>
  );
};

export default LoginSession;
```

-`/src/pages/member/LoginSessionTs.tsx`

```ts
import React, { MouseEvent, useEffect, useState } from "react";

const LoginSessionTs: React.FC = () => {
  // SessionStorage 에서 가져오므로 null 을 기본값셋팅
  const [userId, setUserId] = useState<string | null>(null);
  // 1. SessionStorage 읽기
  useEffect(() => {
    const userLS = sessionStorage.getItem("userId");
    if (userId) {
      setUserId(userLS);
    }
  }, []);
  // 3. sessionStorage 삭제하기
  const handleLogout = (e: MouseEvent<HTMLButtonElement>) => {
    console.log("로그아웃");
    const userTyping = "";
    setUserId(userTyping);
    sessionStorage.removeItem("userId");
  };

  // 2. sessionStorage 업데이트하기
  const handleLogIn = (e: MouseEvent<HTMLButtonElement>) => {
    console.log("로그인 시도");
    const userTyping = "abc1234";
    setUserId(userTyping);
    sessionStorage.setItem("userId", userTyping);
  };

  return (
    <div>
      <h1>Login Session Storage</h1>
      {userId ? (
        <div>
          <p>로그인됨 : {userId}</p>
          <button onClick={e => handleLogout(e)}>로그아웃</button>
        </div>
      ) : (
        <div>
          <p>로그인시도</p>
          <button onClick={e => handleLogIn(e)}>로그인</button>
        </div>
      )}
    </div>
  );
};

export default LoginSessionTs;


```
