import { useEffect, useState } from "react";
import { getResetPwd, getUser, postUser } from "../../apis/user/apiuser";
import "../../css/member.css";
import { useNavigate } from "react-router-dom";
const Join = () => {
  // 라우터
  const navigate = useNavigate();

  // 입력할 항목 변수
  const [userId, setUserId] = useState("hong14Guild");
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("Abc@1234");
  const [userPass2, setUserPass2] = useState("");
  const [userName, setUserName] = useState("");

  // 회원가입시 처리할 함수
  const joinMember = async event => {
    // form 태그에서 submit 을 하면 웹브라우저 갱신
    // 갱신하면 초기화 되므로 막아줌. (기본기능막기)
    event.preventDefault();

    // 아래의 데이터를 API 로 보낸다.
    const requestData = {
      id: userId,
      pwd: userPass,
      name: userName,
      email: userEmail,
    };
    const result = await postUser(requestData);
    console.log(result);
    if (result.statusCode !== 2) {
      alert(result.resultMsg);
      return;
    }
    // 회원가입이 성공했으므로 /login 으로 이동한다.
    // path 로 강제 이동시키기
    navigate("/login");
  };

  // 회원내용 재 작성 함수
  const joinReset = () => {
    setUserEmail("");
    setUserPass("");
    setUserPass2("");
    setUserName("");
  };

  useEffect(() => {
    // 화면에 보일때 할일 작성
    // 일반 js 내용을 복사해서 넣고, React 스럽게 수정

    return () => {
      // cleanup 함수
      // 화면에서 사라질때 할일 작성
    };
  }, []);

  const findPass = () => {
    getResetPwd({ userEmail, userId });
  };

  const findId = () => {
    getUser({ userName, userEmail });
  };

  return (
    <div className="join-wrap">
      <form className="join-form">
        <div className="form-group">
          <button
            type="button"
            onClick={() => {
              findId();
            }}
          >
            아이디찾기
          </button>
        </div>

        <div className="form-group">
          <button
            type="button"
            onClick={() => {
              findPass();
            }}
          >
            비밀번호찾기
          </button>
        </div>
        {/* 사용자 아이디 */}
        <div className="form-group">
          <label htmlFor="userid">아이디</label>
          <input
            type="text"
            id="userid"
            value={userId}
            onChange={event => {
              // console.log(event.target);
              setUserId(event.target.value);
            }}
            className="join-email"
          />
        </div>
        {/* 사용자 이메일 */}
        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            value={userEmail}
            onChange={event => {
              // console.log(event.target);
              setUserEmail(event.target.value);
            }}
            className="join-email"
          />
        </div>
        {/* 사용자 패스워드 */}
        <div className="form-group">
          <label htmlFor="pass">패스워드</label>
          <input
            type="password"
            id="pass"
            value={userPass}
            onChange={event => {
              setUserPass(event.target.value);
            }}
            className="join-email"
          />
        </div>
        {/* 사용자 패스워드 2 */}
        <div className="form-group">
          <label htmlFor="pass2">패스워드 확인</label>
          <input
            type="password"
            id="pass2"
            value={userPass2}
            onChange={event => {
              setUserPass2(event.target.value);
            }}
            className="join-email"
          />
        </div>
        {/* 사용자 이름 */}
        <div className="form-group">
          <label htmlFor="username">이름</label>
          <input
            type="text"
            id="username"
            value={userName}
            onChange={event => {
              setUserName(event.target.value);
            }}
            className="join-email"
          />
        </div>

        <div className="form-group">
          <button
            type="submit"
            className="bt-submit"
            onClick={event => {
              joinMember(event);
            }}
          >
            회원가입
          </button>
          <button
            type="reset"
            className="bt-cancel"
            onClick={() => {
              joinReset();
            }}
          >
            재작성
          </button>
        </div>
      </form>
    </div>
  );
};

export default Join;
