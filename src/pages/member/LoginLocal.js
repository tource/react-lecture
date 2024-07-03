import React, { useEffect, useState } from "react";

const LoginLocal = () => {
  // LocalStorage 에서 가져오므로 null 을 기본값셋팅
  const [userId, setUserId] = useState(null);
  // 1. localStorage 읽기
  useEffect(() => {
    const userLS = localStorage.getItem("userId");
    if (userId) {
      setUserId(userLS);
    }
  }, []);
  // 3. localStorage 삭제하기
  const handleLogout = e => {
    console.log("로그아웃");
    const userTyping = "";
    setUserId(userTyping);
    localStorage.removeItem("userId");
  };

  // 2. localStorage 업데이트하기
  const handleLogIn = e => {
    console.log("로그인 시도");
    const userTyping = "abc1234";
    setUserId(userTyping);
    localStorage.setItem("userId", userTyping);
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

export default LoginLocal;
