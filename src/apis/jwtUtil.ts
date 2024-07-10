import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { getCookie, setCookie } from "../utils/cookiets";

const jwtAxios: AxiosInstance = axios.create();

// Request Interceptor
const beforeReq = async (
  config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> => {
  const accessToken: string | undefined = getCookie("accessToken");

  if (!accessToken) {
    return Promise.reject({
      response: { data: { error: "Login 하셔서 인증받으세요." } },
    });
  }

  if (config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
};

const failReq = (err: AxiosError): Promise<AxiosError> => {
  console.log("요청 후... 실패", err);
  return Promise.reject(err);
};

// Axios의 Interceptor 적용
jwtAxios.interceptors.request.use(beforeReq, failReq);

// Reponse
const beforeRes = async (res: AxiosResponse): Promise<AxiosResponse> => {
  //   try {
  //     const res = await axios.get("/api/auth/access-token");
  //     setCookie("accessToken", res.data.accessToken);
  //     if (res.config) {
  //       res.config.headers.Authorization = `Bearer ${res.data.accessToken}`;
  //       return jwtAxios.request(res.config);
  //     }
  //   } catch (error) {
  //     return Promise.reject(error);
  //   }
  return res;
};
const responseFail = async (err: AxiosError): Promise<AxiosError> => {
  // Access token 재발급 시도
  try {
    const res = await axios.get("/api/auth/access-token");
    setCookie("accessToken", res.data.accessToken);

    // 원래의 요청을 재시도
    if (err.config) {
      err.config.headers.Authorization = `Bearer ${res.data.accessToken}`;
      return jwtAxios.request(err.config);
    }
  } catch (tokenError) {
    return Promise.reject(tokenError);
  }

  return Promise.reject(err);
};

// axios의 intercepter 적용
jwtAxios.interceptors.response.use(beforeRes, responseFail);

export default jwtAxios;
