import React, { MouseEvent, useContext } from "react";
import { LoginContext } from "./context/LoginProvider";

const AppRootTS: React.FC = () => {
  const { userInfo, userLang, setUserInfo } = useContext(LoginContext);

  const handleClick = () => {
    setUserInfo("홍길동");
  };
  return (
    <div>
      <h1>사용자 : {userInfo}</h1>
      <h2>언어 : {userLang}</h2>
      <button
        onClick={() => {
          handleClick();
        }}
      >
        사용자 정보변경
      </button>
    </div>
  );
};

export default AppRootTS;
