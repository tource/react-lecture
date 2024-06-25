import { useEffect, useState } from "react";
import { Gallery } from "../components/Gallery";
import { Info } from "../components/Info";
import { Notice } from "../components/Notice";
import { QuickLink } from "../components/QuickLink";
import { Slide } from "../components/Slide";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { Main } from "../components/layout/Main";

export const Home = () => {
  let [login, setLogin] = useState(false);
  console.log("Home 이 새로고침 되니? login : ", login);

  let [count, setCount] = useState(0);

  const changeLogin = () => {
    // setLogin(!login);
    // useState는 비동기 방식으로 처리된다.
    // 업데이트 함수 활용
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);

    // console.log("현재 login : ", login);
    console.log("현재 count : ", count);
  };

  useEffect(() => {
    console.log("Home 이 새로고침 되니? USE-EFFECT", count);
  }, [count]);

  useEffect(() => {
    console.log("Home 이 새로고침 되니? USE-EFFECT", login);
  }, [login]);

  return (
    <>
      <button
        onClick={() => {
          changeLogin();
        }}
      >
        {count}개 로그인버튼
      </button>
      <Header login={login} />
      <Main>
        <Slide />
        <Info>
          <Notice />
          <Gallery />
          <QuickLink />
        </Info>
      </Main>
      <Footer />
    </>
  );
};
