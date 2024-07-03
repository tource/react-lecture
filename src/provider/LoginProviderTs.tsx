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
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProviderTs;
