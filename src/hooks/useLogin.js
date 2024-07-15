import axios from "axios";
import { useState } from "react";

// 로그인에 필요로한 기능을 모아서 제공한다.
// const {datam loading, error, login} = useLogin("kim", "1234")
// const {isLogin} = useLogin("kim", "1234")

const useLogin = (_id, _pass) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const Login = async (_id, _pass) => {
    setLoading(true);
    try {
      const reqData = {
        id: _id,
        pass: _pass,
      };
      const response = axios.post("/api/login", reqData);
      setData(response.data);
      setIsLogin(true);
    } catch (error) {
      console.log(error);
      setError(error);
      setIsLogin(false);
    }
    setLoading(false);
  };

  return { data, loading, error, Login, isLogin };
};
export default useLogin;
