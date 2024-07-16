import axios, { AxiosError } from "axios";
import { useState } from "react";

// 로그인에 필요로한 기능을 모아서 제공한다.
// const {data, loading, error, login} = useLogin()
// const {isLogin} = useLogin()

// useLogin 함수를 실행하면 리턴해 주는 데이터 모양
interface UseLoginResult<T> {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
  login: (_id: string, _pass: string) => Promise<void>;
  isLogin: boolean;
}
const useLogin = <T>(): UseLoginResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const login = async (_id: string, _pass: string) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/login", { id: _id, pass: _pass });
      setData(response.data);
      setIsLogin(true);
    } catch (error) {
      console.log(error);
      setError(error as AxiosError);
      setIsLogin(false);
    }
    setLoading(false);
  };

  return { data, loading, error, login, isLogin };
};
export default useLogin;
