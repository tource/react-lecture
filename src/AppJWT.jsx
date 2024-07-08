import axios from "axios";
import { useEffect } from "react";
import jwtAxios from "./apis/jwtUtil";

const AppJWT = () => {
  const getTodo = async () => {
    const res = await jwtAxios.get(
      "https://jsonplaceholder.typicode.com/todos/1",
    );
    console.log(res.data);
  };

  useEffect(() => {
    getTodo();
  }, []);

  axios.get();
  return (
    <div>
      <h1>JWT테스트</h1>
    </div>
  );
};

export default AppJWT;
