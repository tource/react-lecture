import axios from "axios";

// 과정을 준수하시고 나서, 필요하면 수정
const jwtAxios = axios.create();
// axios 호출시 중간에 accessToken을 추가하려고 함.
// 결국 axios 호출시 중간에 낚아채서 추가 내용 포함시키고
// 다시 호출을 해준다.
// 호출을 중간단계를 intercepter 라고 합니다.
// 1. 인증이 적용된 경우의 intercepter
// 1.1. axios 호출 전에 포함시킴
const beforeReq = config => {
  console.log("요청 전... 전달", config);
  return config;
};

// 1.2. 호출의 결과가 실패 즉, 인증 실패인 경우
const failReq = err => {
  console.log("요청 전... 실패", err);
  return Promise.reject(err);
};

// 1.3. 호출의 결과가 성공하고 리턴값이 있을 때
const beforeRes = res => {
  console.log("요청 Response 전처리", res);
  return res;
};

// 1.4. 호출의 결과가 성공하고 리턴값이 있을 때
const responseFail = err => {
  console.log("요청 Response 에러일 때", err);
  return Promise.reject(err);
};

// axios의 intercepter 적용
jwtAxios.interceptors.request.use(beforeReq, failReq);
jwtAxios.interceptors.response.use(beforeRes, responseFail);

export default jwtAxios;
