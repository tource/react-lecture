import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../slices/loginSlice";
import { changeRed } from "../slices/themeSlice";
const Menu = () => {
  // slice 정보 출력하기
  // useSelector 는 slice의 정보를 가져온다.
  const loginState = useSelector(state => state.loginSlice);
  console.log(loginState);
  // 로그인 하기 (action 실행)
  const dispatch = useDispatch();

  const handleClickLogin = () => {
    // slice 의 action 을 실행시
    const data = { email: "aaa@aaa.net", userName: "홍길동", userLevel: 10 };
    dispatch(login(data));
  };

  const handleClickLogout = () => {
    // slice 의 action 을 실행시
    dispatch(logout());
  };

  const handleClickTheme = () => {
    dispatch(changeRed());
  };

  return (
    <div>
      <button
        onClick={() => {
          handleClickTheme();
        }}
      >
        테마바꾸기
      </button>
      <ul>
        {loginState.email ? (
          //로그인 하고 난 후 정보 출력
          <li>
            <div>이메일 : {loginState.email}</div>
            <div>유저이름 : {loginState.userName} </div>
            <div>유저레벨 : {loginState.userLevel} </div>
            <button
              onClick={() => {
                handleClickLogout();
              }}
            >
              로그아웃
            </button>
          </li>
        ) : (
          // 로그인 하기 전
          <li>
            <div>로그인을 해주세요.</div>
            <button
              onClick={() => {
                handleClickLogin();
              }}
            >
              로그인
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Menu;
