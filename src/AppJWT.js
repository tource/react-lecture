import { useEffect } from "react";
import jwtAxios from "./apis/jwtUtil";
import axios from "axios";
import { setCookie } from "./utils/cookie";

const AppJWT = () => {
  // 회원로그인 해서 인증키 받기
  const handleLogin = () => {
    postLogin();
  };

  const postLogin = async () => {
    const res = await axios.post("/api/auth/sign-in", {
      userEmail: "email@email.com",
      userPw: "p!ssw!rd",
    });
    // 로그인에 성공하면 accesstoken 을 받을 수 있다.
    console.log(res.data);
    // 아래처럼 쿠키로 저장해둔다.
    setCookie("accessToken", res.data.accessToken);
  };

  // jwt 인증을 이용한 정보 알아내기
  const getUserInfo = async () => {
    const res = await jwtAxios.get("/api/user");
    console.log(res.data);
  };

  // jwt 인증 필요없는 api 호출
  const getGrapingList = async () => {
    const res = await axios.get("/api/main");
    console.log("글래핑 리스트 호출");
    console.log(res.data);
  };

  useEffect(() => {
    // 인기 글래핑 리스트 호출
    getGrapingList();
  }, []);

  return (
    <div>
      <h1>JWT 테스트</h1>
      <button
        onClick={() => {
          handleLogin();
        }}
      >
        로그인
      </button>
      <button
        onClick={() => {
          getUserInfo();
        }}
      >
        회원정보확인
      </button>
    </div>
  );
};

export default AppJWT;
