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
