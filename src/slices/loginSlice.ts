import { createSlice } from "@reduxjs/toolkit";

// any 는 데이터 타입이 불명확하다고 자꾸 오류로 인식
// any 오류는 ESLint 에서 잡는다.
interface ActionState {
  payload: any;
  type: string;
}

interface LoginState {
  email?: string;
  userName?: string;
  userLevel?: number;
}
const initialState: LoginState = {
  email: "",
  userName: "",
  userLevel: 0,
};
const loginSlice = createSlice({
  name: "loginSlice",
  initialState: initialState,
  reducers: {
    login: (state: LoginState, action: ActionState): LoginState => {
      return { ...state, ...action.payload };
    },
    logout: (): LoginState => {
      return { ...initialState };
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
