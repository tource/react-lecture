# Router (라우터를 파일로 관리하자.)

- React Router Dom 의 버전 6 인 경우에 해당
- 하위 버전은 적용안됨.
- https://www.npmjs.com/package/react-spinners
  : 활용
  : `npm i react-spinners`

## 1. 폴더 구조

- /src/router 폴더생성
- /src/router/root.js 파일 생성

## 2. root.js 의 역활

- 기본 라우터 경로 작성
- 서브 라우터들은 별도의 파일로 관리

### 2.1. Loading 컴포넌트 만들기(react-spinners)

- 동적 컴포넌트 로딩을 구현한다.
  : 전체 js 를 처음부터 불러들여서 느리게 화면을 출력하는 과정을 최적화한다.
  : 필요할 때 컴포넌트를 불러들여서 실행한다.

- /src/components/loading/Loading.js

```js
import React from "react";
import { ClipLoader } from "react-spinners";

const Loading = () => {
  const LoadingCss = {
    position: "fixed",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  };
  return (
    <div style={LoadingCss}>
      <ClipLoader color="#a518c9" loading size={200} speedMultiplier={1} />
    </div>
  );
};

export default Loading;
```

## 2.2. Suspense 와 lazy 를 이용한 동적로딩 처리

```js
import { Suspense, lazy } from "react";
```

```js
const LazyHome = lazy(() => import("../pages/Index"));
const LazyCompany = lazy(() => import("../pages/company/Index"));
const LazyGood = lazy(() => import("../pages/good/Good"));
```

```js
{
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <LazyHome />
      </Suspense>
    ),
  },
```

## 3. companyrouter.js 생성

- /src/router/companyrouter.js

```js
import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
import Loading from "../components/loading/Loading";

const LazyCeo = lazy(() => import("../pages/company/Ceo"));
const LazyHistory = lazy(() => import("../pages/company/History"));
const LazyPartner = lazy(() => import("../pages/company/Partner"));

const companyrouter = () => {
  return [
    { path: "", element: <Navigate to="ceo" /> },
    {
      path: "ceo",
      element: (
        <Suspense fallback={<Loading />}>
          <LazyCeo />
        </Suspense>
      ),
    },
    {
      path: "history",
      element: (
        <Suspense fallback={<Loading />}>
          <LazyHistory />
        </Suspense>
      ),
    },
    {
      path: "partner",
      element: (
        <Suspense fallback={<Loading />}>
          <LazyPartner />
        </Suspense>
      ),
    },
    {
      path: "location",
      element: (
        <Suspense fallback={<Loading />}>
          <h1>회사 위치</h1>
        </Suspense>
      ),
    },
  ];
};
export default companyrouter;
```

## 4. goodrouter.js 생성

- /src/router/goodrouter.js

```js
import { Suspense, lazy } from "react";
import Loading from "../components/loading/Loading";

const LazyGoodDetail = lazy(() => import("../pages/good/Detail"));

const goodrouter = () => {
  return [
    {
      path: ":id",
      element: (
        <Suspense fallback={<Loading />}>
          <LazyGoodDetail />
        </Suspense>
      ),
    },
    { path: "delete/:id", element: <h1>제품 삭제</h1> },
    { path: "modify/:id", element: <h1>제품 수정</h1> },
  ];
};
export default goodrouter;
```

## 5. 주의 사항 (V6 이상인 경우)

- 모든 React Router Dom 에서의 기능은 BrowserRoute 안쪽에 배치
  : Link, NavLink 등..
