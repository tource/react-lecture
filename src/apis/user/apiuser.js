import axios from "axios";

//  회원가입시 실행할 API 함수
export const postUser = async data => {
  try {
    // axios.post("주소", "데이터");
    const response = await axios.post("/api/user", data);
    console.log(response.data);
    // 나머지는 리액트에서 처리
    if (response.data.statusCode === "2") {
      return "회원가입 성공";
    } else {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getResetPwd = async ({ userEmail, userId }) => {
  try {
    const rqData = `/api/user/resetpwd?email=${userEmail}&id=${userId}`;
    const response = await axios.get(rqData);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async ({ userName, userEmail }) => {
  try {
    const reqData = `/api/user?name=${userName}&email=${userEmail}`;
    const response = await axios.get(reqData);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

// 로그인 API
export const postSignIn = async ({ userId, userPass }) => {
  try {
    const response = await axios.post("/api/user/sign-in", {
      id: userId,
      pwd: userPass,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
