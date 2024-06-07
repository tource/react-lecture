import { useEffect, useState } from "react";
import "../../css/member.css";
import axios from "axios";
const Join = () => {
  // 입력할 항목 변수
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  const [userPass2, setUserPass2] = useState("");
  const [userName, setUserName] = useState("");

  // 회원가입시 처리할 함수
  const joinMember = event => {
    // 데이터를 최종적으로 전달하는 submit 실행시에는
    // 웹브라우저가 자동으로 갱신되므로 무조건 기본 기능을 막는다.
    event.preventDefault();
    // console.log(userEmail, userPass, userName);

    const sendData = {
      id: userEmail,
      pwd: userPass,
      name: userName,
      email: userEmail,
    };
    postUser(sendData);
  };

  // 월요일 apis 폴더에 memberapi.js 만들고 axios 관련 컨벤션
  const postUser = async ({ id, pwd, name, email }) => {
    try {
      const response = await axios.post("/api/user", { id, pwd, name, email });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
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

  return (
    <div className="join-wrap">
      <form className="join-form">
        {/* 사용자 이메일 */}
        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            value={userEmail}
            onChange={event => {
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
          <label htmlFor="name">이름</label>
          <input
            type="text"
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
