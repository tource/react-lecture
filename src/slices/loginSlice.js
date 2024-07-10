import { createSlice } from "@reduxjs/toolkit";

// 1. 초기값 셋팅
const initialState = {
  email: "",
  userName: "",
  userLevel: 0,
};
const loginSlice = createSlice({
  name: "loginSlice",
  initialState: initialState,
  // 상태 정보를 CRUD 하는 함수작성
  reducers: {
    // 무조건 매개변수는 2개가 들어갑니다.
    // 첫번째 매개변수는 state 즉, 관리 중인 데이터
    // 두번째 매개변수는 action 즉, 업데이트 할 데이터
    login: (state, action) => {
      // action 은 payload 가 있습니다.
      // console.log("state : ", state);
      // console.log("action : ", action);
      // console.log("Login.....");
      return { ...state, ...action.payload };
    },
    logout: () => {
      console.log("LogOut!!!!");
      return initialState;
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
