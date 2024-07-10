import React, { MouseEvent, useContext } from "react";
import { LoginContext, LoginProvider } from "./context/LoginProvider";

const AppRootTs: React.FC = () => {
  const { userInfo, userLang, setUserInfo } = useContext(LoginContext);
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setUserInfo("홍길동");
  };
  return (
    <LoginProvider>
      <div>
        <h1>사용자 : {userInfo}</h1>
        <h2>언어 : {userLang}</h2>
        <button
          onClick={e => {
            handleClick(e);
          }}
        >
          사용자 정보 변경
        </button>
      </div>
    </LoginProvider>
  );
};

export default AppRootTs;
