# Router

- 라우터는 URI 경로를 동기화 하여 화면의 전환,흐름을 제어한다.
- URI 구성
  : Protocol (http, https, ftp, smtp)
  : URL (도메인)
  : Port (3000 번 리액트, 3306 번 데이터베이스, 8080 번 웹서버)
  : Path (파일의 경로)
  : Query String (?쿼리명=값&쿼리명=값)
- 예) http://localhost:3000/todo/login?id=hong&pass=1234

## 1.라우터를 먼저 고려해야함.

- 일반적으로 웹서비스 기획이후에 화면구성을 도출
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

### 4.5. 중첩 Route 활용

```js
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/company">
          <Route path="/ceo"></Route>
          <Route path="/history"></Route>
          <Route path="/partner"></Route>
          <Route path="/location"></Route>
        </Route>

        <Route path="/good">
          <Route path="/번호"></Route>
          <Route path="/delete/번호"></Route>
          <Route path="/modify/번호"></Route>
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
          <Route path="/ceo"></Route>
          <Route path="/history"></Route>
          <Route path="/partner"></Route>
          <Route path="/location"></Route>
        </Route>

        <Route path="/good">
          <Route path="/번호"></Route>
          <Route path="/delete/번호"></Route>
          <Route path="/modify/번호"></Route>
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
          <Route path="/ceo"></Route>
          <Route path="/history"></Route>
          <Route path="/partner"></Route>
          <Route path="/location"></Route>
        </Route>

        <Route path="/good">
          <Route path="/번호"></Route>
          <Route path="/delete/번호"></Route>
          <Route path="/modify/번호"></Route>
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
    </BrowserRouter>
  );
}

export default App;
```

### 4.9. 공통 레이아웃 적용하기

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
```
