import { NavLink } from "react-router-dom";
import "../../css/header.css";
import { useEffect, useState, useContext } from "react";
import { userInfoContext } from "../../context/UserInfoProvider";
import { setCookie } from "../../utils/cookie";

const Header = ({ children }) => {
  const { isUser, setIsUser } = useContext(userInfoContext);

  console.log("홍길동이 ~", isUser);

  // js 자리
  // 현재 패스와 같은 경우에 보여줄 css Object 생성
  const ActiveLink = {
    color: "red",
    fontWeight: "bold",
  };

  useEffect(() => {}, []);

  return (
    <header className="header">
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            홈
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/company"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            회사소개
          </NavLink>
          <ul>
            <li>
              <NavLink
                to="/company/ceo?name=홍길동&age=30"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                대표 소개
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/company/history"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                회사 연혁
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/company/partner"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                파트너사
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/company/location"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                회사위치
              </NavLink>
            </li>
          </ul>
        </li>
        <li>
          <NavLink
            to="/good"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            제품소개
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/schedule"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            일정
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/file"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            파일업로드
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/animaladd"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            애완동물 등록하기
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/mulitifile"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            멀티파일 등록하기
          </NavLink>
        </li>

        {isUser ? (
          <>
            <li>`${isUser} 님이 로그인 하셨어요`</li>
            <li>
              <button
                onClick={() => {
                  // sessionStorage 아이템 삭제
                  // sessionStorage.removeItem("userid");
                  // sessionStorage.setItem("userid", "");
                  setCookie("userid", "", {});
                  // useState 업데이트
                  setIsUser("");
                }}
              >
                로그아웃
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink
                to="/join"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                회원가입
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                로그인
              </NavLink>
            </li>
          </>
        )}
      </ul>

      {children}
    </header>
  );
};

export default Header;
