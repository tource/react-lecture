// 일반적으로 모든 개발자는 axios 호출시, 주소와 자료를 전달할 것이다.
// get 또는 post, put, delete 등을 전달할 것이다.
// 우리회사 개발시에는 직접 사용하지 말고 custom Hook 을 만들어서
// 코딩 컨벤션을 하겠다는 의도로 제작

// 사용자
// const { data, loading, error } = useAxios("/api/member/1", null, "get");
// const { data, loading, error } = useAxios("/api/user", { user: "kim" }, "post");

import axios from "axios";
import { useEffect, useState } from "react";

const useAxios = (_url, _payload = null, _method = "GET") => {
  // axios 실행 후 돌려받은 결과물
  const [data, setData] = useState(null);
  // axios 실행 중 로딩창 실행
  const [loading, setLoading] = useState(false);
  // axios 실행 시 에러 메시지
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        // _method 에 따른 처리
        let response;
        let method = _method.toUpperCase(_method);
        switch (method) {
          case "GET":
            response = axios.get(_url);
            break;
          case "POST":
            response = axios.post(_url, _payload);
            break;
          case "PUT":
            response = axios.put(_url, _payload);
            break;
          case "DELETE":
            response = axios.delete(_url);
            break;
          default:
            throw new Error(`${_method} 잘못 보내셨네요.`);
        }
        setData(response.data);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };

    // 실행하기
    fetchData();
    setLoading(false);
  }, [_url, _payload, _method]);

  // 커스텀 훅 실행 후 돌려받거나 전달할 내용
  return { data, loading, error };
};
export default useAxios;
