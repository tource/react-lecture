import axios from "axios";

// 절대로 git 올라가면 안돼요. 공개 안돼요.
const rest_api_key = process.env.REACT_APP_KAKAO_REST_API_KEY;
// 카카오 로그인 시 이동할 Redirec 주소
const redirect_uri = process.env.REACT_APP_KAKAP_REDIRECT_URI;
// 카카오 로그인 문서 참조
const auth_code_path = "https://kauth.kakao.com/oauth/authorize";
// 카카오 로그인시 토큰 API 경로
const kko_user_api = "https://kapi.kakao.com/v2/user/me";

// 카카오 로그인시 활용
export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  return kakaoURL;
};

// access 토큰 받기 경로
const access_token_url = `https://kauth.kakao.com/oauth/token`;
export const getAccessToken = async authCode => {
  const header = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  };

  const params = {
    grant_type: "authorization_code",
    client_id: rest_api_key,
    redirect_uri: redirect_uri,
    code: authCode,
  };

  const res = await axios.post(access_token_url, params, header);

  const accessToken = res.data.access_token;

  return accessToken;
};

// 토큰을 이용해서 사용자 정보 호출하기
export const getMemberWithAccessToken = async accessToken => {
  try {
    const response = await axios.get(kko_user_api, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// 만약에 위의 과정을 모두 BE에서 처리했다면
// FE 에서는 axios 호출해서 결과만 받으면 된다.
export const getInfo = async () => {
  try {
    const response = await axios.get("BE주소");
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
