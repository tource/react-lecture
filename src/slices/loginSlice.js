import { createSlice } from "@reduxjs/toolkit";

// 1. 초기값
const initialState = {
  email: "",
  name: "",
  token: "",
};

// 2. slice 만들기
const loginSlice = createSlice({
  name: "loginSlice",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      return { ...state, ...action.payload };
    },
    userModify: (state, action) => {
      return { ...state, ...action.payload };
    },
    logout: (state, action) => {
      return { ...initialState };
    },
  },
});

export const { login, userModify, logout } = loginSlice.actions;
export default loginSlice.reducer;
