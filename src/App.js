import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// Index 라는 이름 충돌로 변경함
import Home from "./pages/Index";
import Compony from "./pages/company/Index";
import GoodDeatil from "./pages/good/Detail";
import Ceo from "./pages/company/Ceo";
import History from "./pages/company/History";
import Partner from "./pages/company/Partner";
import Good from "./pages/good/Good";
import { useState } from "react";
import Schedule from "./pages/Schedule";
import NotFound from "./pages/NotFound";
import Join from "./pages/member/Join";

function App() {
  // 복잡한 데이터
  const arr = [
    { name: "삼성전자", link: "http://" },
    { name: "LG전자", link: "http://" },
    { name: "그린컴퓨터", link: "http://" },
  ];
  // 로그인 안된 경우
  const [isLogin, setIsLogin] = useState(true);

  return (
    <BrowserRouter>
      {/* 공통레이아웃 적용 */}
      <div className="wrap">
        <Header>
          {isLogin ? (
            <div>정보수정/로그아웃</div>
          ) : (
            <div>회원가입/회원로그인</div>
          )}
        </Header>

        <Routes>
          {/* 루트경로 */}
          <Route path="/" element={<Home></Home>}></Route>

          <Route path="/company">
            {/* 패스 상 기본페이지 */}
            <Route index element={<Compony></Compony>}></Route>

            <Route path="ceo" element={<Ceo></Ceo>}></Route>
            <Route
              path="history"
              element={<History title="좋은회사" year={1990}></History>}
            ></Route>
            <Route
              path="partner"
              element={<Partner pc={arr}></Partner>}
            ></Route>
            <Route path="location" element={<h1>회사 위치</h1>}></Route>
          </Route>

          <Route path="/good" element={<Good></Good>}>
            <Route
              path=":id"
              element={<GoodDeatil title={"좋은 회사"}></GoodDeatil>}
            ></Route>
            <Route path="delete/:id" element={<h1>제품 삭제</h1>}></Route>
            <Route path="modify/:id" element={<h1>제품 수정</h1>}></Route>
          </Route>

          <Route path="/schedule" element={<Schedule />}></Route>
          <Route path="/join" element={<Join />}></Route>

          {/* 잘못된 경로 */}
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        <Footer></Footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
