import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAccessToken, getMemberWithAccessToken } from "../../kko/kkoapi";

const After = () => {
  // 사용자 정보 관리
  const [userInfo, setUserInfo] = useState(null);

  // 카카오 인증키 알아내기
  const [URLSearchParams, setURLSearchParams] = useSearchParams();
  const authCode = URLSearchParams.get("code");

  // 인가 키를 받아서 액세스 토큰을 요청한다.
  const getAccessTokenCall = async () => {
    const accessKey = await getAccessToken(authCode);
    // console.log("accessKey : ", accessKey);
    // 사용자 정보 호출
    const info = await getMemberWithAccessToken(accessKey);
    console.log(info);
    setUserInfo(info);
  };

  useEffect(() => {
    getAccessTokenCall();
  }, [authCode]);
  return (
    <div>
      <h1>KKO 로그인 후 </h1>
      <h2>{authCode}</h2>
      <div>닉네임 : {userInfo?.kakao_account.profile.nickname}</div>
      <div>이메일 : {userInfo?.kakao_account.email}</div>
      <div>
        <img src={userInfo?.kakao_account.profile.thumbnail_image_url} />
      </div>
    </div>
  );
};

export default After;
