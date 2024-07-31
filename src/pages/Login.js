import { Link } from "react-router-dom";
import { getKakaoLoginLink } from "../kko/kkoapi";
import After from "./member/After";
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
