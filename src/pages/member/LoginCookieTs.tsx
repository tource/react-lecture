import React, { MouseEvent, useEffect, useState } from "react";
import { getCookie, removeCookie, setCookie } from "../../utils/cookie";

const LoginCookieTs: React.FC = () => {
  // Cookie 에서 가져오므로 null 을 기본값셋팅
  const [userId, setUserId] = useState<string | null>(null);

  // 1. Cookie 읽기
  useEffect(() => {
    const userLS = getCookie("userId");
    if (userId) {
      setUserId(userLS);
    }
  }, []);

  // 3. Cookie 삭제하기
  const handleLogout = (e: MouseEvent<HTMLButtonElement>) => {
    console.log("로그아웃");
    const userTyping = "";
    setUserId(userTyping);
    removeCookie("userId");
  };

  // 2. Cookie 업데이트하기
  const handleLogIn = (e: MouseEvent<HTMLButtonElement>) => {
    console.log("로그인 시도");
    const userTyping = "abc1234";
    setUserId(userTyping);
    setCookie("userid", userTyping, {
      path: "/",
      expire: new Date(Date.now() + 86400e3), // 1일 후 만료시간 설정
      maxAge: 86400, // 1일 동안 유효
    });
  };
  return (
    <div>
      <h1>Login Local Storage</h1>
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

export default LoginCookieTs;
