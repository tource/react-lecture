# Router

- 라우터는 URI 경로를 동기화 하여 화면의 전환,흐름을 제어한다.
- URI 구성
  : Protocol (http, https, ftp, smtp)
  : URL (도메인)
  : Port (3000 번 리액트 테스트용, 3306 번 데이터베이스, 8080 번 웹서버)
  : Path (파일의 경로)
  : Query String (?쿼리명=값&쿼리명=값)
- 예) http://localhost:3000/todo/login?id=hong&pass=1234

## 1.라우터를 먼저 고려해야함.

- 일반적으로 웹서비스 기획 이후에 화면구성을 도출
- 화면구성에 맞게 화면흐름이 정의
- 화면흐름에 맞는 경로를 작성

## 2.라우터 구조 샘플.

- 회사 웹사이트 제작
  : 회사소개 (대표님, 연혁, 파트너, 위치)
  : 제품소개 (제품목록, 제품 상세내용, 제품 등록, 제품 수정, 제품 삭제)

- 라우터의 Path를 고민한다.
  : /company
  : /company/ceo
  : /company/history
  : /company/partner
  : /company/location

  : /good
  : /good/번호
  : /good/delete/번호
  : /good/modify/번호

## 3. 프로젝트 소스 폴더 및 파일 구조

- src/pages/company/Index.js
- src/pages/company/Ceo.js
- src/pages/company/History.js
- src/pages/company/Partner.js
- src/pages/company/Location.js

- src/pages/good/Index.js
- src/pages/good/Detail.js
- src/pages/good/Modify.js
- src/pages/good/Delete.js

## 4. react-router-dom 활용

### 4.1. 적용 단계

- BrowserRouter > Routes > Route
  : Router 는 BrowserRouter 사용하면 됨.

### 4.2. BrowserRouter 적용

- 기준은 App.js 에 적용

  ```js
  import { BrowserRouter } from "react-router-dom";
  import "./App.css";

  function App() {
    return <BrowserRouter>...</BrowserRouter>;
  }

  export default App;
  ```

### 4.3. Routes 적용

```js
import { BrowserRouter, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes></Routes>
    </BrowserRouter>
  );
}

export default App;
```

### 4.4. Route 들 작성

- 기본 Route 패스 구성

  ```js
  import { BrowserRouter, Route, Routes } from "react-router-dom";
  import "./App.css";

  function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/company"></Route>
          <Route path="/company/ceo"></Route>
          <Route path="/company/history"></Route>
          <Route path="/company/partner"></Route>
          <Route path="/company/location"></Route>
          <Route path="/good"></Route>
          <Route path="/good/번호"></Route>
          <Route path="/good/delete/번호"></Route>
          <Route path="/good/modify/번호"></Route>
        </Routes>
      </BrowserRouter>
    );
  }

  export default App;
  ```

- 보여줄 컴퍼넌트 또는 JSX 배치

  ```js
  import { BrowserRouter, Route, Routes } from "react-router-dom";
  import "./App.css";

  function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/company" element={<h1>회사첫 페이지</h1>}></Route>
          <Route path="/company/ceo" element={<h1>대표 페이지</h1>}></Route>
          <Route path="/company/history" element={<h1>연혁 페이지</h1>}></Route>
          <Route
            path="/company/partner"
            element={<h1>파트너 페이지</h1>}
          ></Route>
          <Route
            path="/company/location"
            element={<h1>위치 페이지</h1>}
          ></Route>
          <Route path="/good" element={<h1>제품첫 페이지</h1>}></Route>
          <Route path="/good/번호" element={<h1>각제품 페이지</h1>}></Route>
          <Route
            path="/good/delete/번호"
            element={<h1>제품삭제 페이지</h1>}
          ></Route>
          <Route
            path="/good/modify/번호"
            element={<h1>제품수정 페이지</h1>}
          ></Route>
        </Routes>
      </BrowserRouter>
    );
  }

  export default App;
  ```

### 4.5. Nested(중첩) Route 활용

- 아주 중요한 사항으로 중첩된 라우터는 반드시 `상대경로` 설정

```js
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/company">
          <Route path="ceo"></Route>
          <Route path="history"></Route>
          <Route path="partner"></Route>
          <Route path="location"></Route>
        </Route>

        <Route path="/good">
          <Route path="번호"></Route>
          <Route path="delete/번호"></Route>
          <Route path="modify/번호"></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

### 4.6. 없는 path 로 접근한 경우 Route 활용

```js
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/company">
          <Route path="ceo"></Route>
          <Route path="history"></Route>
          <Route path="partner"></Route>
          <Route path="location"></Route>
        </Route>

        <Route path="/good">
          <Route path="번호"></Route>
          <Route path="delete/번호"></Route>
          <Route path="modify/번호"></Route>
        </Route>

        {/* 잘못된 경로 */}
        <Route path="*" element={<h1>잘못된 경로입니다.</h1>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

### 4.7. 기본 주소 즉 / 경로 Route 활용

```js
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 루트경로 */}
        <Route path="/"></Route>

        <Route path="/company">
          <Route path="ceo"></Route>
          <Route path="history"></Route>
          <Route path="partner"></Route>
          <Route path="location"></Route>
        </Route>

        <Route path="/good">
          <Route path="번호"></Route>
          <Route path="delete/번호"></Route>
          <Route path="modify/번호"></Route>
        </Route>

        {/* 잘못된 경로 */}
        <Route path="*" element={<h1>잘못된 경로입니다.</h1>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

### 4.8. 중첩 Route 의 기본 페이지 출력 활용

```js
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 루트경로 */}
        <Route path="/"></Route>

        <Route path="/company">
          {/* 패스 상 기본페이지 */}
          <Route index></Route>

          <Route path="ceo"></Route>
          <Route path="history"></Route>
          <Route path="partner"></Route>
          <Route path="location"></Route>
        </Route>

        <Route path="/good">
          {/* 패스 상 기본페이지 */}
          <Route index></Route>

          <Route path="번호"></Route>
          <Route path="delete/번호"></Route>
          <Route path="modify/번호"></Route>
        </Route>

        {/* 잘못된 경로 */}
        <Route path="*" element={<h1>잘못된 경로입니다.</h1>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

### 4.9. 공통 레이아웃 적용하기(선택)

```js
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

            <Route path="ceo"></Route>
            <Route path="history"></Route>
            <Route path="partner"></Route>
            <Route path="location"></Route>
          </Route>

          <Route path="/good">
            {/* 패스 상 기본페이지 */}
            <Route index></Route>

            <Route path="번호"></Route>
            <Route path="delete/번호"></Route>
            <Route path="modify/번호"></Route>
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
```

### 4.10. 라우터에 변수(파라메터) 전달하기

- /good/번호
  : 여기서 번호는 수시로 달라요.
  : `/good/:id`
  : http://localhost:3000/good/1
  : http://localhost:3000/good/152
  : http://localhost:3000/good/578

- /good/delete/번호
  : 여기서 번호는 수시로 달라요.
  : `/good/delete/:id`
  : http://localhost:3000/good/delete/1
  : http://localhost:3000/good/delete/152
  : http://localhost:3000/good/delete/578

- /good/modify/번호
  : 여기서 번호는 수시로 달라요.
  : `/good/modify/:id`
  : http://localhost:3000/good/modify/1
  : http://localhost:3000/good/modify/152
  : http://localhost:3000/good/modify/578

### 4.11. 라우터에 따라서 보여줄 JSX 작성

- `<Route path="경로" element={JSX}></Route>`

  ```js
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
            <Route path="/" element={<h1>홈페이지</h1>}></Route>

            <Route path="/company">
              {/* 패스 상 기본페이지 */}
              <Route index element={<h1>회사소개</h1>}></Route>

              <Route path="ceo" element={<h1>대표 소개</h1>}></Route>
              <Route path="history" element={<h1>회사 연혁</h1>}></Route>
              <Route path="partner" element={<h1>파트너 소개</h1>}></Route>
              <Route path="location" element={<h1>회사 위치</h1>}></Route>
            </Route>

            <Route path="/good">
              {/* 패스 상 기본페이지 */}
              <Route index element={<h1>제품 소개</h1>}></Route>

              <Route path=":id" element={<h1>제품 상세</h1>}></Route>
              <Route path="delete/:id" element={<h1>제품 삭제</h1>}></Route>
              <Route path="modify/:id" element={<h1>제품 수정</h1>}></Route>
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
  ```

### 4.12. 라우터를 이동하기

- html 태그에서는 `<a href="패스">메뉴명</a>` 작성
  : 웹브라우저에서 모든 소스를 다시 불러들임(단점)

- Link 는 리액트에서 새로고침 방지역할
  : `import { Link } from "react-router-dom";`
  : `<Link to="패스">메뉴명</Link>` 로 작성

  ```js
  import { BrowserRouter, Route, Routes } from "react-router-dom";
  import "./App.css";
  import { Link } from "react-router-dom";

  function App() {
    return (
      <BrowserRouter>
        {/* 공통레이아웃 적용 */}
        <div className="wrap">
          <header className="header">
            <ul>
              <li>
                <Link to="/">홈</Link>
              </li>
              <li>
                <Link to="/company">회사소개</Link>
                <ul>
                  <li>
                    <Link to="/company/ceo">대표 소개</Link>
                  </li>
                  <li>
                    <Link to="/company/history">회사 연혁</Link>
                  </li>
                  <li>
                    <Link to="/company/location">회사위치</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/good">제품소개</Link>
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
              </li>
            </ul>
          </header>
          <Routes>
            {/* 루트경로 */}
            <Route path="/" element={<h1>홈페이지</h1>}></Route>

            <Route path="/company">
              {/* 패스 상 기본페이지 */}
              <Route index element={<h1>회사소개</h1>}></Route>

              <Route path="ceo" element={<h1>대표 소개</h1>}></Route>
              <Route path="history" element={<h1>회사 연혁</h1>}></Route>
              <Route path="partner" element={<h1>파트너 소개</h1>}></Route>
              <Route path="location" element={<h1>회사 위치</h1>}></Route>
            </Route>

            <Route path="/good">
              {/* 패스 상 기본페이지 */}
              <Route index element={<h1>제품 소개</h1>}></Route>

              <Route path=":id" element={<h1>제품 상세</h1>}></Route>
              <Route path="delete/:id" element={<h1>제품 삭제</h1>}></Route>
              <Route path="modify/:id" element={<h1>제품 수정</h1>}></Route>
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
  ```

### 4.13. 컴포넌트 만들기

- 컴포넌트는 JSX 를 모아두고 다양한 React 기능을 사용함.

#### 4.13.1. 폴더 구조 만들기

- 화면을 만들기 위해서 사용되는 컴포넌트는 /src/components 폴더에 보관
  : /src/components/ui
  : /src/components/buttons
  : /src/components/popup
- 한장의 화면을 만드는 컴포넌트는 /src/pages 폴더에 보관
  : pages 폴더는 하위 폴더로 각 주메뉴의 폴더들이 있으면 좋겠다.
  : 예) /src/pages/company
  : 예) /src/pages/good

#### 4.13.2. 컴포넌트 만들기

- /src/components/layout/Header.js

  ```js
  import { Link } from "react-router-dom";

  const Header = () => {
    return (
      <header className="header">
        <ul>
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="/company">회사소개</Link>
            <ul>
              <li>
                <Link to="/company/ceo">대표 소개</Link>
              </li>
              <li>
                <Link to="/company/history">회사 연혁</Link>
              </li>
              <li>
                <Link to="/company/location">회사위치</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/good">제품소개</Link>
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
          </li>
        </ul>
      </header>
    );
  };

  export default Header;
  ```

- /src/components/layout/Footer.js

  ```js
  const Footer = () => {
    return <footer className="header"></footer>;
  };

  export default Footer;
  ```

- 주메뉴 라우터 path 에 연결하는 페이지 컴포넌트는 Index.js 추천
  : http://localhost:3000/company
  : /src/pages/company/Index.js

  ```js
  import { BrowserRouter, Route, Routes } from "react-router-dom";
  import "./App.css";
  import Header from "./components/layout/Header";
  import Footer from "./components/layout/Footer";

  // Index 라는 이름 충돌로 변경함
  import Home from "./pages/Index";
  import Compony from "./pages/company/Index";

  function App() {
    return (
      <BrowserRouter>
        {/* 공통레이아웃 적용 */}
        <div className="wrap">
          <Header></Header>
          <Routes>
            {/* 루트경로 */}
            <Route path="/" element={<Home></Home>}></Route>

            <Route path="/company">
              {/* 패스 상 기본페이지 */}
              <Route index element={<Compony></Compony>}></Route>

              <Route path="ceo" element={<h1>대표 소개</h1>}></Route>
              <Route path="history" element={<h1>회사 연혁</h1>}></Route>
              <Route path="partner" element={<h1>파트너 소개</h1>}></Route>
              <Route path="location" element={<h1>회사 위치</h1>}></Route>
            </Route>

            <Route path="/good">
              {/* 패스 상 기본페이지 */}
              <Route index element={<h1>제품 소개</h1>}></Route>

              <Route path=":id" element={<h1>제품 상세</h1>}></Route>
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

#### 4.13.3. 페이지 컴포넌트에 라우터 매개변수 보여주기

- 예)
  : 라우터의 매개변수(parameter)가 변했다. (설명글)
  : 라우터의 params 전달 (리액트 표현)
  : http://localhost:3000/good/딸기
  : http://localhost:3000/good/사과
  : http://localhost:3000/good/수박
  : `<Route path=":과일" element={}></Route>`
  : `<Route path=":id" element={}></Route>`

- 페이지 컴포넌트
  : /src/pages/good/Deatil.js
  : `import GoodDeatil from "./pages/good/Deatil";`
  : `<Route path=":id" element={<GoodDeatil></GoodDeatil>}></Route>`

- params 전달 값 출력 하기
  : 단계 1

  ```js
  const Deatil = () => {
    return <h1>제품 상세</h1>;
  };

  export default Deatil;
  ```

  - 단계 2

  ```js
  import { useParams } from "react-router-dom";

  const Deatil = () => {
    // js 자리
    // path 로 전달된 prams 출력해 보기
    // 예) /compnay/사과
    // 예) /compnay/딸기
    const params = useParams();
    console.log(params);
    // {id: '사과'}

    return <h1> {params.id} 제품 상세</h1>;
  };

  export default Deatil;
  ```

- 단계 3

  ```js
  import { useParams } from "react-router-dom";

  const Deatil = () => {
    // js 자리
    // path 로 전달된 prams 출력해 보기
    // 예) /compnay/사과
    // 예) /compnay/딸기
    //   const params = useParams();
    //   console.log(params);
    // {id: '사과'}
    // 객체 구조 분해 할당을 권장함
    const { id } = useParams();

    return <h1> {id} 제품 상세</h1>;
  };

  export default Deatil;
  ```

#### 4.13.4. 페이지 컴포넌트에 쿼리스트링 활용하기

- Query String
- 예) http://localhost:3000/member?no=1&msg=안녕&id=hong
  : http://localhost:3000/member (패스)
  : ? ( search(질의) 라고 합니다. )
  : no=1 (no의 값은 1이다)
  : & (구분자)
  : msg=안녕 (msg의 값은 안녕이다)
  : & (구분자)
  : id=hong (id의 값은 hong이다)
- 쿼리스트링은 ?no=1&msg=안녕&id=hong

- useSearchParams() 활용
  : use (Hook 이라고 합니다.)
  : hook 은 컴포넌트 화면이 보인다면 덩달아서 실행되는 것
  : Search 는 ? 를 말합니다.
  : Params 는 no=1&msg=안녕&id=hong 말함
  : () 는 hook 을 실행하라
  : `import { useSearchParams } from "react-router-dom";`
  : `const [searchParams, setSearchParams] = useSearchParams();`

  ```js
  import { useSearchParams } from "react-router-dom";

  const Ceo = () => {
    // JS 자리
    const [searchParams, setSearchParams] = useSearchParams();
    console.log(searchParams);
    // company/ceo?name=홍길동&age=30
    const name = searchParams.get("name");
    const age = searchParams.get("age");
    console.log(name);
    console.log(age);

    return (
      <div>
        <h1>대표({name}) 소개</h1>
        <h2>{age}살</h2>
      </div>
    );
  };

  export default Ceo;
  ```

### 4.14. 컴포넌트 출력의 이해

#### 4.14.1 간단한 props 전달하기

- ```js
  <Route
    path="history"
    element={<History title="좋은회사" year={1990}></History>}
  ></Route>
  ```
- ```js
  const History = ({ title, year }) => {
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

#### 4.14.2 복잡한 props 전달하기

```js
// 복잡한 데이터
const arr = [
  { name: "삼성전자", link: "http://" },
  { name: "LG전자", link: "http://" },
  { name: "그린컴퓨터", link: "http://" },
];

<Route path="partner" element={<Partner pc={arr}></Partner>}></Route>;
```

```js
const Partner = ({ pc }) => {
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

#### 4.14.3. Outlet 이해하기

- Router 를 이용해서 컴포넌트의 레이아웃을 유지하고
- Router 의 Outlet 장소에 패스에 따라 컴포넌트 출력

```js
<Route path="/good" element={<Good></Good>}>
  <Route
    path=":id"
    element={<GoodDeatil title={"좋은 회사"}></GoodDeatil>}
  ></Route>
  <Route path="delete/:id" element={<h1>제품 삭제</h1>}></Route>
  <Route path="modify/:id" element={<h1>제품 수정</h1>}></Route>
</Route>
```

```js
import { Link, Outlet } from "react-router-dom";

const Good = () => {
  return (
    <div>
      <h1>제품소개</h1>
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

#### 4.14.4. children 이해하기

- Router 와 연관성이 없습니다.
- 컴포넌트 내부에 JSX 전달하기

```jsx
 const [isLogin, setIsLogin] = useState(true);
 ...
 <Header>
    {isLogin ? (
      <div>정보수정/로그아웃</div>
    ) : (
      <div>회원가입/회원로그인</div>
    )}
  </Header>
```

```jsx
import { Link } from "react-router-dom";

const Header = ({ children }) => {
  return (
    <header className="header">
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/company">회사소개</Link>
          <ul>
            <li>
              <Link to="/company/ceo?name=홍길동&age=30">대표 소개</Link>
            </li>
            <li>
              <Link to="/company/history">회사 연혁</Link>
            </li>
            <li>
              <Link to="/company/partner">파트너사</Link>
            </li>
            <li>
              <Link to="/company/location">회사위치</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/good">제품소개</Link>
        </li>
      </ul>

      {children}
    </header>
  );
};

export default Header;
```

### 4.15. 라우터의 패스 생성 및 전달하기

### 4.15.1. 문자열 또는 백틱으로 쿼리스트링만들기

`const demo = "/company/ceo?name=성환&age=10";`

### 4.15.2. createSearchParams()로 쿼리스트링만들기

```js
const queryStr = createSearchParams({
  name: "길동",
  age: 100,
}).toString();
```

### 4.15.2. useNavigate()로 주소 전달하여 이동하기

```js
const naviagte = useNavigate();
```

```js
const demo = `/company/ceo?name=성환&age=10`;
// console.log(demo);
naviagte(demo);
```

```js
const queryStr = createSearchParams({
  name: "길동",
  age: 100,
}).toString();
// console.log(queryStr);
naviagte({ pathname: "/company/ceo", search: queryStr });
```

### 4.15.3. useLocation() 으로 주소 경로 정보 분석하기

```js
// 현재 주소 및 패스 알아내기
const location = useLocation();
console.log(location.pathname);
console.log(location.search);
console.log(location.state);
```

- 아래의 내용을 아시면 참 좋겠어요.
  : 아무도 모르게 내용을 전달하고 싶은 경우 즉, url 에 안보임.

```js
const specialNavi = () => {
  const queryStr = createSearchParams({
    name: "길동",
    age: 100,
  }).toString();
  // console.log(queryStr);
  const fromUrl = {
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
```

```js
const location = useLocation();
console.log(location);
console.log(location.pathname);
console.log(location.search);
console.log(location.state?.fromUrl);
```

### 4.16. NavLink 이해하기

- 현재 라우터의 path 에 맞게 css 적용해줌.
  : 현재 활성화된 즉, 웹브라우저에 명시된 path 경로와 같은 경우 active 됨
- /src/components/layout/Header.js
  : `import { NavLink } from "react-router-dom";`

#### 4.16.1. CSS Object 로 지정하는 경우

```js
import { NavLink } from "react-router-dom";
const Header = ({ children }) => {
  // js 자리
  // 현재 패스와 같은 경우에 보여줄 css Object 생성
  const ActiveLink = {
    color: "red",
    fontWeight: "bold",
  };

  return (
    <header className="header">
      <ul>
        <li>
          <NavLink
            to="/"
            style={({ isActive }) => (isActive ? ActiveLink : undefined)}
          >
            홈
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/company"
            style={({ isActive }) => (isActive ? ActiveLink : undefined)}
          >
            회사소개
          </NavLink>
          <ul>
            <li>
              <NavLink
                to="/company/ceo?name=홍길동&age=30"
                style={({ isActive }) => (isActive ? ActiveLink : undefined)}
              >
                대표 소개
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/company/history"
                style={({ isActive }) => (isActive ? ActiveLink : undefined)}
              >
                회사 연혁
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/company/partner"
                style={({ isActive }) => (isActive ? ActiveLink : undefined)}
              >
                파트너사
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/company/location"
                style={({ isActive }) => (isActive ? ActiveLink : undefined)}
              >
                회사위치
              </NavLink>
            </li>
          </ul>
        </li>
        <li>
          <NavLink
            to="/good"
            style={({ isActive }) => (isActive ? ActiveLink : undefined)}
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

#### 4.16.2. CSS 파일로 지정하는 경우

- src/css/header.css

  ```css
  .active-link {
    color: red;
    font-weight: bold;
  }
  ```

- src/components/layout/Header.js

  ```js
  import { NavLink } from "react-router-dom";
  import "../../css/header.css";
  const Header = ({ children }) => {
    // js 자리
    // 현재 패스와 같은 경우에 보여줄 css Object 생성
    const ActiveLink = {
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
