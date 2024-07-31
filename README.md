# Kakao

- 카카오개발자등록 : https://developers.kakao.com/
- 참조 문서 : https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api

## 1. 카카오 개발자 등록 후 진행 과정

- 로그인 후 내 애플리케이션으로 이동함.
- 애플리케이션 추가하기 선택
- 애플리케이션 추가하기 항목 입력
  : 앱아이콘 등록
  : 앱 이름
  : 회사명은 임의로
  : 카테고리도 임의로
- 애플리케이션 설정화면 셋팅
  : 비즈니스 항목 > 카카오비즈니스 통합 서비스 약관 동의 진행
- 카카오 로그인
  : Redirect URI (필수)
  : 동의항목 (닉네임, 프로필사진, 이메일은 필수로 설정을 해줌)
- 앱키
  : REST API 키 (아주 잘 보관해야 되고, git Hub 절대로 올리면 안됨)

## 2. 리액트 API 설정

- /src/kko/kkoapi.js

```js
// 절대로 git 올라가면 안돼요. 공개 안돼요.
const rest_api_key = "";
// 카카오 로그인 시 이동할 Redirec 주소
const redirect_uri = "http://localhost:3000/member/kko";
// 카카오 로그인 문서 참조
const auth_code_path = "https://kauth.kakao.com/oauth/authorize";
// 카카오 로그인시 활용
export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  return kakaoURL;
};
```

## 3. 로그인 페이지 만들기

- /src/Login.js

```js
import { Link } from "react-router-dom";
import { getKakaoLoginLink } from "../kko/kkoapi";
// 초기값

const Login = () => {
  // API 호출
  const kakaoLogin = getKakaoLoginLink();
  console.log(kakaoLogin);

  return (
    <div>
      <Link to={kakaoLogin}>카카오로그인</Link>
    </div>
  );
};

export default Login;
```

## 4. 로그인 후 페이지 만들기 (Redirect URI)

- 카카오 로그인 후 인증키 알아내기
- /src/pages/member/After.js

```js
import React from "react";
import { useSearchParams } from "react-router-dom";

const After = () => {
  // 카카오 인증키 알아내기
  const [URLSearchParams, setURLSearchParams] = useSearchParams();
  const authCode = URLSearchParams.get("code");
  return (
    <div>
      <h1>KKO 로그인 후</h1>
      <h2>{authCode}</h2>
    </div>
  );
};

export default After;
```

## 5. 인증키 생성후 Access Token 요청하기

```js
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
```

## 6. REST API 인증키를 env 파일로 이동하기

: GitHub에 공개하지 않을 내용을 작성한다.
: 예) KKO API 키, KKO Map API 키, Fire Base API 키...

### 6.1. 반드시 .env의 파일 경로는 지켜야 합니다.

: /에 .env 파일을 만든다.

: GitHub에 push 안되는 파일의 목록은 .gitignore에 작성한다.

```txt
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*

.env
```

### 6.2. 환경설정시 반드시 시작해야 하는 단어가 있다.

- 예를 들어 React 라면
  : `REACT_APP_원하는 단어`

- 예를 들어 Next 라면
  : `REACT_Next_원하는 단어`

```txt
REACT_APP_KAKAO_REST_API_KEY=본인 KEY
REACT_APP_KAKAP_REDIRECT_URI=http://localhost:3000/member/kko
```
