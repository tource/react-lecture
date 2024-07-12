# React Router TS 적용

## 1. 설정

- `npm i react-router-dom`
- `npm i @types/react-router-dom`

## 2. 파일변환

- /src/index.tsx

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// ts 에서는 데이터 종류를 구별한다.
// as 는 강제로 타입지정
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

// js 버전
// const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <App />
  </>,
);
```

- /src/App.tsx

```tsx
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

// arr 데이터 기본형
interface IArr {
  name: string;
  link: string;
}

function App(): JSX.Element {
  // 복잡한 데이터
  const arr: IArr[] = [
    { name: "삼성전자", link: "http://" },
    { name: "LG전자", link: "http://" },
    { name: "그린컴퓨터", link: "http://" },
  ];
  // 로그인 안된 경우
  const [isLogin, setIsLogin] = useState<boolean>(true);

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

          {/* 잘못된 경로 */}
          <Route path="*" element={<h1>잘못된 경로입니다.</h1>}></Route>
        </Routes>
        <Footer></Footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
```

- /src/pages/Index.tsx

```tsx
import React from "react";

const Index: React.FC = () => {
  return <h1>홈페이지</h1>;
};

export default Index;
```

- /src/pages/company/Index.tsx

```tsx
const Index: React.FC = () => {
  return <h1>회사소개</h1>;
};

export default Index;
```

- /src/pages/company/Ceo.tsx

```tsx
import { useLocation, useSearchParams } from "react-router-dom";

const Ceo: React.FC = () => {
  // 현재 주소 및 패스 알아내기
  const location = useLocation();
  console.log(location);
  console.log(location.pathname);
  console.log(location.search);
  console.log(location.state?.fromUrl);

  // JS 자리
  const [searchParams] = useSearchParams();
  // company/ceo?name=홍길동&age=30
  const name = searchParams.get("name");
  const age = searchParams.get("age");

  return (
    <div>
      <h1>대표({name}) 소개</h1>
      <h2>{age}살</h2>
    </div>
  );
};

export default Ceo;
```

- /src/pages/company/History.tsx

```tsx
// Props 의 모양 만들기
interface HistoryProps {
  title: string;
  year: number;
}

const History: React.FC<HistoryProps> = ({ title, year }) => {
  return (
    <div>
      <h1>
        {title} {year} 연혁
      </h1>
    </div>
  );
};

export default History;
```

- /src/pages/company/Partner.tsx

```tsx
import { IArr } from "../../App";

interface PartnerProps {
  pc: IArr[];
}
const Partner: React.FC<PartnerProps> = ({ pc }) => {
  return (
    <div>
      <h1>파트너 소개</h1>
      <ul>
        {pc.map((item, index, arr) => (
          <li key={index}>
            {item.name} {item.link}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Partner;
```

- /src/pages/good/Detail.tsx

```tsx
import { useParams } from "react-router-dom";

interface DeatilProps {
  title: string;
}

const Deatil: React.FC<DeatilProps> = ({ title }) => {
  // js 자리
  // path 로 전달된 prams 출력해 보기
  // 예) /compnay/사과
  // 예) /compnay/딸기
  //   const params = useParams();
  //   console.log(params);
  // {id: '사과'}
  // 객체 구조 분해 할당을 권장함
  const { id } = useParams();

  return <h1>{id} 제품상세</h1>;
};

export default Deatil;
```

- /src/pages/good/Good.tsx

```tsx
import {
  Link,
  Outlet,
  createSearchParams,
  useLocation,
  useNavigate,
} from "react-router-dom";

interface IFromUrl {
  memo: string;
  good: string;
  favorite: string;
}
interface IQueryData {
  name?: string;
  age?: string;
}

const Good: React.FC = () => {
  // 현재 주소 및 패스 알아내기
  const location = useLocation();
  console.log(location);

  // 강제로 이동시키기
  const navigate = useNavigate();
  // 1. 많은 분들이 아래처럼 주소 및 쿼리스트링을 만듭니다.
  const noramlNavi = () => {
    // 만약 QueryString 을 만들어야 한다면?
    // 많은 분이 path 까지 같이 작성합니다.
    const demo = `/company/ceo?name=성환&age=10`;
    // console.log(demo);
    navigate(demo);
  };

  // 2. 조금 문법을 좋아하시는 분들은 아래를 사용합니다.
  const specialNavi = () => {
    const queryData: IQueryData = {
      name: "길동",
      age: "100",
    };
    const queryStr = createSearchParams({ ...queryData }).toString();
    // console.log(queryStr);
    const fromUrl: IFromUrl = {
      memo: "제품페이지에서 왔어요.",
      good: "제품 1번을 보고 있었지요.",
      favorite: "제품 1에 관심이 많네요.",
    };

    navigate(
      {
        pathname: "/company/ceo",
        search: queryStr,
      },
      { state: { fromUrl } },
    );
  };

  return (
    <div>
      <h1>제품소개</h1>

      <div>
        <button
          onClick={() => {
            noramlNavi();
          }}
        >
          많은 분들이 그냥 naviagte 이동하라
        </button>

        <button
          onClick={() => {
            specialNavi();
          }}
        >
          추천하는 이동하라
        </button>
      </div>

      <ul>
        <li>
          <Link to="/good/1">제품 소개</Link>
        </li>
        <li>
          <Link to="/good/delete/1">제품 삭제</Link>
        </li>
        <li>
          <Link to="/good/modify/1">제품 수정</Link>
        </li>
      </ul>

      <div style={{ border: "3px solid black" }}>
        <h2>레이아웃 유지 하고 화면 출력</h2>
        <Outlet />
      </div>
    </div>
  );
};

export default Good;
```

- /src/components/layout/Footer.tsx

```tsx
const Footer: React.FC = () => {
  return <footer className="header"></footer>;
};

export default Footer;
```

- /src/components/layout/Header.tsx

```tsx
import { NavLink } from "react-router-dom";
import "../../css/header.css";
interface HeaderProps {
  children: React.ReactNode;
}
interface IActiveLink {
  color: string;
  fontWeight: string;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  // js 자리
  // 현재 패스와 같은 경우에 보여줄 css Object 생성
  const ActiveLink: IActiveLink = {
    color: "red",
    fontWeight: "bold",
  };

  return (
    <header className="header">
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            홈
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/company"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            회사소개
          </NavLink>
          <ul>
            <li>
              <NavLink
                to="/company/ceo?name=홍길동&age=30"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                대표 소개
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/company/history"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                회사 연혁
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/company/partner"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                파트너사
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/company/location"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                회사위치
              </NavLink>
            </li>
          </ul>
        </li>
        <li>
          <NavLink
            to="/good"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            제품소개
          </NavLink>
        </li>
      </ul>

      {children}
    </header>
  );
};

export default Header;
```

## 3. 데이터 interface 모으기

- /src/types 폴더 생성
- /src/types/datatype.ts

```ts
// arr 데이터 기본형
export interface IArr {
  name: string;
  link: string;
}
export interface IFromUrl {
  memo: string;
  good: string;
  favorite: string;
}
export interface IQueryData {
  name?: string;
  age?: string;
}
export interface IActiveLink {
  color: string;
  fontWeight: string;
}
```
