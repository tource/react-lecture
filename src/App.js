import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
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
import router from "./router/root";
import Join from "./pages/Join";

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
    <div>
      <h1> APP 컴포넌트</h1>
      <Join />
    </div>
  );
}

export default App;
