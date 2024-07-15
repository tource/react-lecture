import React from "react";
import useAxios from "./hooks/useAxios";
import useLogin from "./hooks/useLogin";
import useComponent from "./hooks/useComponent";

const AppUse = () => {
  // 아래의 경우는 돌려받는 이름이 똑같아서 여러번 활용이 어렵다.
  // 그래서 별도의 별칭을 하나 더 작성한다.
  const {
    data: getData,
    loading: getLoading,
    error: getError,
  } = useAxios("/api/member/1", null, "get");
  const {
    data: postData,
    loading: postLoading,
    error: postError,
  } = useAxios("/api/user", { user: "kim" }, "post");

  const { data, loading, error, login } = useLogin();
  login("kim", "1234");

  const { width, height } = useComponent();

  return <div></div>;
};

export default AppUse;
