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
