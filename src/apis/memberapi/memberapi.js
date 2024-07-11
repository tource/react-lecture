import axios from "axios";

export const postLogin = async () => {
  try {
    const res = await axios.post("/api/auth/sign-in", {
      userEmail: "mybirth811@gmail.com",
      userPw: "Tngus811!",
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getUser = async () => {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/todos/1");
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
