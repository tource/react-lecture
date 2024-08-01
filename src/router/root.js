import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loading from "../components/loading/Loading";
import companyrouter from "./companyrouter";
import goodrouter from "./goodrouter";
import Header from "../components/layout/Header";
// 기존의 <BrowserRouter></BrowserRouter> 생성
// 함수를 통해서 BrowserRouter 를 생성한다.
// 규칙은 매개변수로 [] 이 배치됨
// 각각의 Router 는 {} 형태로 배치됨

// 리액트는 컴포넌트를 불러들이고 나서 화면이 그려지는 동안
// 출력상태를 처리할 수 있다.
// Suspense 는 동적으로 컴포넌트를 불러들인다.
// Suspense 가 정상적으로 작동시 lazy 가 필요하다.

const LazyHome = lazy(() => import("../pages/Index"));
const LazyCompany = lazy(() => import("../pages/company/Index"));
const LazyGood = lazy(() => import("../pages/good/Good"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <Header>
          <div>정보수정/로그아웃</div>
        </Header>
        <LazyHome />
      </Suspense>
    ),
    children: companyrouter(),
  },
  {
    path: "/company",
    element: (
      <Suspense fallback={<Loading />}>
        <Header>
          <div>정보수정/로그아웃</div>
        </Header>
        <LazyCompany />
      </Suspense>
    ),
    children: goodrouter(),
  },
  {
    path: "/good",
    element: (
      <Suspense fallback={<Loading />}>
        <Header>
          <div>정보수정/로그아웃</div>
        </Header>
        <LazyGood />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: <h1>잘못된 경로입니다.</h1>,
  },
]);
export default router;
