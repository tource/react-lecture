import { createSlice } from "@reduxjs/toolkit";
import { changeBlack } from "./themeSlice";

const initialState = {
  word: "안녕하세요",
};
const langSlice = createSlice({
  name: "langSlice",
  initialState: initialState,
  reducers: {
    changeKor: (state, action) => {
      return { ...initialState };
    },
    changeEng: (state, action) => {
      return { word: "Hello" };
    },
    changeEtc: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { changeKor, changeEng, changeEtc } = langSlice.actions;
export default langSlice.reducer;
