import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      {/* 공통레이아웃 적용 */}
      <div className="wrap">
        <header className="header"></header>
        <Routes>
          {/* 루트경로 */}
          <Route path="/"></Route>

          <Route path="/company">
            {/* 패스 상 기본페이지 */}
            <Route index></Route>

            <Route path="/ceo"></Route>
            <Route path="/history"></Route>
            <Route path="/partner"></Route>
            <Route path="/location"></Route>
          </Route>

          <Route path="/good">
            {/* 패스 상 기본페이지 */}
            <Route index></Route>

            <Route path="/번호"></Route>
            <Route path="/delete/번호"></Route>
            <Route path="/modify/번호"></Route>
          </Route>

          {/* 잘못된 경로 */}
          <Route path="*" element={<h1>잘못된 경로입니다.</h1>}></Route>
        </Routes>
        <footer className="header"></footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
