import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser, postLogin } from "../apis/memberapi/memberapi";
// 규칙을 준수하시고 나중에 응용하세요.
// 1 단계. AsyncThunk 객체를 만든다.
//  예) postLogin ===> const postLoginAsyncThunk
export const getUserAsyncThunk = createAsyncThunk(
  "getUserAsyncThunk",
  async () => {
    try {
      // API 호출
      const res = await getUser();
      // API 호출 시 전달 된 Response 결과를 return 해준다.
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
);

// 실제 서버 테스트
export const postLoginAsyncThunk = createAsyncThunk(
  "postLoginAsyncThunk",
  async () => {
    try {
      const res = await postLogin();
      return res;
    } catch (error) {
      console.log(error);
    }
  },
);

const initialState = {
  userId: 0,
  id: 0,
  title: "",
  completed: false,
};
const userSlice = createSlice({
  name: "userSlice",
  initialState: initialState,
  // 앱에서 상태 업데이트 하기
  reducers: {
    showUser: (state, action) => {
      console.log("정보를 보여줘");
    },
  },
  // 2단계 비동기로 API 서버 연동
  // builder 는 단어를 고치지 말자.
  extraReducers: builder => {
    // fulfilled : 결과가 성공적으로 처리된 경우 처리
    builder.addCase(getUserAsyncThunk.fulfilled, (state, action) => {
      // 성공시 처리
      console.log("getUserAsyncThunk.fulfilled");
      console.log("getUserAsyncThunk.fulfilled action", action);
      const payload = action.payload;
      return { ...state, ...payload };
    });
    // rejected : 결과가 오류로 처리된 경우 처리
    builder.addCase(getUserAsyncThunk.rejected, (state, action) => {
      // 오류시 처리
      console.log("getUserAsyncThunk.rejected");
    });
    // pending: 접속 진행 중입니다.
    builder.addCase(getUserAsyncThunk.pending, (state, action) => {
      // 서버 호출 중....
      console.log("getUserAsyncThunk.pending .... ");
    });
    // 사용자 로그인

    builder.addCase(postLoginAsyncThunk.fulfilled, (state, action) => {
      console.log("postLoginAsyncThunk.fulfilled");
    });
    builder.addCase(postLoginAsyncThunk.rejected, (state, action) => {
      console.log("postLoginAsyncThunk.rejected");
    });
    builder.addCase(postLoginAsyncThunk.pending, (state, action) => {
      console.log("postLoginAsyncThunk.pending...");
    });
  },
});
export const { showUser } = userSlice.actions;
export default userSlice.reducer;
