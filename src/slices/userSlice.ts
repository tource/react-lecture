import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser, postLogin } from "../apis/memberapi/memberapi";

// userSlice 데이터 모양
interface UserSliceState {
  userId?: number;
  id?: number;
  title?: string;
  completed?: boolean;
}

interface ActionType {
  payload: any;
  type: string;
}

// 비동기로 state업데이트 하기
// 1. AsyncThunk 생성
// 2. extraReducers 에 builder.addCase() 활용
export const getUserAsyncThunk = createAsyncThunk<UserSliceState>(
  "getUserAsyncThunk",
  async () => {
    try {
      const res = await getUser();
      return res;
    } catch (error) {
      console.log(error);
      // 아래처럼 에러를 리턴하면 타입이 맞지않아서 오류발생 소지가 있음.
      // 즉, error의 모양은 UserSliceSate형태가 아니다.
      // throw error;
      // 아래처럼 진행하면 rejected 처럼 처리된다.
      throw error;
    }
  },
);

export const postLoginAsyncThunk = createAsyncThunk<UserSliceState>(
  "postLoginAsyncThunk",
  async () => {
    try {
      const res = await postLogin();
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
);

const initialState: UserSliceState = {
  userId: 0,
  id: 0,
  title: "",
  completed: false,
};
const userSlice = createSlice({
  name: "userSlice",
  initialState: initialState,
  reducers: {
    showUser: (state: UserSliceState, action: ActionType): UserSliceState => {
      console.log("정보를 보여줘");
      return { ...state, ...action.payload };
    },
    userlogin: (state: UserSliceState, action: ActionType): void => {
      console.log(action);
    },
  },

  extraReducers: builder => {
    builder.addCase(
      getUserAsyncThunk.fulfilled,
      (state: UserSliceState, action: ActionType) => {
        console.log("getUserAsyncThunk.fulfilled");
        console.log("getUserAsyncThunk.fulfilled action", action);
        const payload = action.payload;
        return { ...state, ...payload };
      },
    );
    builder.addCase(
      getUserAsyncThunk.rejected,
      (state: UserSliceState, action: ActionType): void => {
        console.log("getUserAsyncThunk.rejected");
      },
    );
    builder.addCase(
      getUserAsyncThunk.pending,
      (sstate: UserSliceState, action: ActionType): void => {
        console.log("getUserAsyncThunk.pending .... ");
      },
    );
    builder.addCase(
      postLoginAsyncThunk.fulfilled,
      (state: UserSliceState, action: ActionType): void => {
        console.log("postLoginAsyncThunk.fulfilled");
      },
    );
    builder.addCase(
      postLoginAsyncThunk.rejected,
      (state: UserSliceState, action: ActionType): void => {
        console.log("postLoginAsyncThunk.rejected");
      },
    );
    builder.addCase(
      postLoginAsyncThunk.pending,
      (state: UserSliceState, action: ActionType): void => {
        console.log("postLoginAsyncThunk.pending...");
      },
    );
  },
});
export const { showUser, userlogin } = userSlice.actions;
export default userSlice.reducer;
