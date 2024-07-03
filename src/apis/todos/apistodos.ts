import axios from "axios";
import { Aaa, ITodo } from "../../types/todo";
const todoURL = "https://jsonplaceholder.typicode.com/todos/";
// api 호출 후 리턴되는 데이터의 모양

// 자료 1개 호출하기
const getTodo = async (id: number): Promise<ITodo> => {
  try {
    const res = await axios.get(`${todoURL}${id}`);
    console.log(res);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// 자료 여러개 호출하기
const getTodos = async (): Promise<ITodo[]> => {
  try {
    const res = await axios.get(todoURL);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// 자료 1개 추가하기
const postTodo = async ({ title, completed }: ITodo): Promise<ITodo> => {
  try {
    const res = await axios.post(todoURL, { title, completed });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// 자료 1개 전체 내용 업데이트 하기
// put은 어떤 대상을 업데이트한다.
const putTodo = async (
  id: number,
  { title, completed }: ITodo,
): Promise<ITodo> => {
  try {
    const res = await axios.put(`${todoURL}${id}`, { title, completed });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// 자료 1개 중 일부분 내용 업데이트 하기
// patch는 어떤 대상을 일부분만 업데이트한다.
const patchTodo = async (
  id: number,
  { title }: { title: string },
): Promise<ITodo> => {
  try {
    const res = await axios.patch(`${todoURL}${id}`, { title });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// 자료 1개 삭제하기
const deleteTodo = async (id: number): Promise<ITodo> => {
  try {
    const res = await axios.delete(`${todoURL}${id}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { getTodo, getTodos, postTodo, putTodo, patchTodo, deleteTodo };
