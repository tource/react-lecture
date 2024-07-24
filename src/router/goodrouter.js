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
