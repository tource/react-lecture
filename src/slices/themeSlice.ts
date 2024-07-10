import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  theme: string;
}
const initialState: ThemeState = {
  theme: "black",
};
const themeSlice = createSlice({
  name: "themeSlice",
  initialState: initialState,
  // 상태 정보를 CRUD 하는 함수작성
  reducers: {
    changeBlack: (): void => {
      console.log("change  Black.....");
    },
    changeWhite: (): void => {
      console.log("change  White.....");
    },
    changeRed: (): ThemeState => {
      return { theme: "red" };
    },
  },
});

export const { changeBlack, changeWhite, changeRed } = themeSlice.actions;
export default themeSlice.reducer;
