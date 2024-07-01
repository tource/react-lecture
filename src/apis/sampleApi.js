import axios from "axios";

export const getLists = async () => {
  try {
    const res = await axios.get("주소");
    // data 속성은 axios 의 기본 객체 속성
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
