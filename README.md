# Custom Hook TS

- useAxios.js ===> useAxios.ts

```ts
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

// _method 의 데이터 모양 정의
// type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
interface HttpMethod {
  method: "GET" | "POST" | "PUT" | "DELETE";
}

// useAxios 실행시 돌려받는 데이터 모양
interface UseAxiosResult<T> {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
}

const useAxios = <T>(
  url: string,
  payload: any = null,
  method: HttpMethod["method"] = "GET",
): UseAxiosResult<T> => {
  // 어떤 데이터를 리턴할지 우리는 미리 데이터모양을 알수 없다.
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        let response;
        switch (method.toUpperCase()) {
          case "GET":
            response = await axios.get(url);
            break;
          case "POST":
            response = await axios.post(url, payload);
            break;
          case "PUT":
            response = await axios.put(url, payload);
            break;
          case "DELETE":
            response = await axios.delete(url);
            break;
          default:
            throw new Error(`${method} 잘못 보내셨네요.`);
        }
        setData(response.data);
      } catch (error) {
        console.log(error);
        // vscode 타입 추론 하지마, 내가 결정해 줄게
        setError(error as AxiosError);
      }
    };
    fetchData();
    setLoading(false);
  }, [url, payload, method]);

  return { data, loading, error };
};
export default useAxios;
```

- useComponent.js ===> useComponent.ts

```ts
import { useEffect, useState } from "react";

// 화면의 리사이즈를 체크하는 용도의 customHook
// useComponent함수를 실행시 리턴 모양

interface WindowSize {
  width: number;
  height: number;
}

const useComponent = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
};
export default useComponent;
```

- useLogin.js ===> useLogin.ts

```ts
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
```
