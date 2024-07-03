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
