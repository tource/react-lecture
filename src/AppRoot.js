// 1. context 적용 1단계 ( createContext() )
// 2. context 적용 2단계 ( export 시키기 )
// 3. context 적용 3단계 (/src/context 폴더에 파일 생성 후 코드 이동)
// 4. context 적용 4단계 (미리 Provider 파일을 생성한다)
// - LoginProvider.js
// 5. contex 적용 5단계( createContex 이동)

import { LoginProvider } from "./context/LoginProvider";

const AppRoot = () => {
  return (
    <LoginProvider>
      <div>
        <h1>제목</h1>
        <h2>언어</h2>
      </div>
    </LoginProvider>
  );
};

export default AppRoot;
