import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";
import themeSlice from "./slices/themeSlice";
import langSlice from "./slices/langSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
  reducer: {
    loginSlice,
    themeSlice,
    langSlice,
    userSlice,
  },
});

// state를 외부에서 참조하도록
export type RootState = ReturnType<typeof store.getState>;
// dispatch 외부에서 실행하도록
export type AppDispatch = typeof store.dispatch;
// 기본 내보내기
export default store;
