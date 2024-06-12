import { createContext, useEffect, useState } from "react";
import { getCookie } from "../utils/cookie";

export const userInfoContext = createContext();
export const UserInfoProvider = ({ children }) => {
  // 전역 상태 관리 (사용자 아이디를 관리)
  const [isUser, setIsUser] = useState("");
  const [language, setLenguage] = useState("ko");
  const [theme, setTheme] = useState("black");

  useEffect(() => {
    // setIsUser에 값을 채워준다.
    // const tempUser = localStorage.getItem("userid");
    // const tempUser = sessionStorage.getItem("userid");
    const tempUser = getCookie("userid");
    console.log("tempUser : ", tempUser);
    if (tempUser !== null) {
      setIsUser(tempUser);
    }
  }, []);

  return (
    <userInfoContext.Provider
      value={{ isUser, setIsUser, language, setLenguage, theme, setTheme }}
    >
      {children}
    </userInfoContext.Provider>
  );
};
