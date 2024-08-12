import { atom } from "recoil";

// 사용자 인증정보(FB : uid, email, token 들)
// export const recoil_UserCurrent = atom({
//   key: "userCurrentState",
//   default: {},
// });
// 사용자의 DB 상에 저장된 정보
// {email:"", name:"", imageUrl:"http~"}
export const recoil_UserData = atom({
  key: "userDataState",
  default: null,
});
