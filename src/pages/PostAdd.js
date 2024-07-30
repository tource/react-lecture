import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
// useMutation 을 이용한 데이터 추가
const postAddPost = async data => {
  try {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      data,
    );
  } catch (error) {
    console.log(error);
    return error;
  }
};

const PostAdd = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const queryClient = useQueryClient();

  // post 등록용 React Query
  const addMutaion = useMutation({
    mutationKey: ["addpost"],
    mutationFn: data => postAddPost(data),
    onSuccess: () => {
      console.log("성공이에요"),
        queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: error => console.log(error.message),
  });

  const handleSubmit = e => {
    e.preventDefault();
    // console.log({ title, body });
    // 아래는 mutate 실행하기
    addMutaion.mutate({ title, body });
  };
  return (
    <div>
      <h2>Post 추가</h2>
      <form onSubmit={e => handleSubmit(e)}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Contents</label>
          <textarea
            value={body}
            onChange={e => setBody(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Add</button>
      </form>

      {addMutaion.isPending && <p>등록중입니다. ... </p>}
      {addMutaion.isError && <p>{addMutaion.error.message}</p>}
      {addMutaion.isSuccess && <p>등록에 성공하였습니다.</p>}
    </div>
  );
};

export default PostAdd;
