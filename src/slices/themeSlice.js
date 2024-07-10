import { createSlice } from "@reduxjs/toolkit";

// 1. 초기값 셋팅
const initialState = {
  theme: "red",
};
const themeSlice = createSlice({
  name: "themeSlice",
  initialState: initialState,
  // 상태 정보를 CRUD 하는 함수작성
  reducers: {
    changeBlack: () => {
      console.log("change  Black.....");
    },
    changeWhite: () => {
      console.log("change  White.....");
    },
    changeRed: () => {
      return { theme: "red" };
    },
  },
});

export const { changeBlack, changeWhite, changeRed } = themeSlice.actions;
export default themeSlice.reducer;
