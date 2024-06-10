import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postSignIn } from "../../axios/user/apiuser";
import "../../css/member.css";
const Login = () => {
  // 라우터
  const navigate = useNavigate();
  const [userId, setUserId] = useState("tource1");
  const [userPass, setUserPass] = useState("A123456789!a");

  const handleSubmit = async e => {
    // 새로 고침 막기
    e.preventDefault();
    const result = await postSignIn({ userId, userPass });
    if (result.statusCode !== 2) {
      alert(result.resultMsg);
      return;
    }
    navigate("/");
  };

  return (
    <div className="join-wrap">
      <form className="join-form">
        {/* 사용자 아이디 */}
        <div className="form-group">
          <label htmlFor="userid">아이디</label>
          <input
            type="text"
            value={userId}
            id="userid"
            className="join-email"
            onChange={e => {
              setUserId(e.target.value);
            }}
          />
        </div>

        {/* 사용자 패스워드 */}
        <div className="form-group">
          <label htmlFor="pass">패스워드</label>
          <input
            type="password"
            value={userPass}
            id="pass"
            className="join-email"
            onChange={e => {
              setUserPass(e.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <button
            type="submit"
            className="bt-submit"
            onClick={e => {
              handleSubmit(e);
            }}
          >
            로그인
          </button>
          <button type="reset" className="bt-cancel">
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
