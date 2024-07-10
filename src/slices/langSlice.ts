import { createSlice } from "@reduxjs/toolkit";

interface ActionState {
  payload: any;
  type: string;
}

interface LangState {
  word: string;
}
const initialState: LangState = {
  word: "안녕하세요",
};
const langSlice = createSlice({
  name: "langSlice",
  initialState: initialState,
  reducers: {
    changeKor: (): LangState => {
      return { ...initialState };
    },
    changeEng: (): LangState => {
      return { word: "Hello" };
    },
    changeEtc: (state: LangState, action: ActionState): LangState => {
      return { ...state, ...action.payload };
    },
  },
});

export const { changeKor, changeEng, changeEtc } = langSlice.actions;
export default langSlice.reducer;
