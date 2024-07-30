import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

// 업데이트 하기
const upatePost = async (id, data) => {
  try {
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      data,
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const PostUpdate = ({ item }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const handleSubmit = e => {
    e.preventDefault();
    updateMutation.mutate(item.id, { title, body });
  };

  // QueryClient 를 직접 참조한다.
  // index.js 에 셋팅됨
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationKey: ["post/update"],
    mutationFn: (id, data) => upatePost(id, data),
    onSuccess: () => {
      console.log("성공");
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: error => console.log(error.message),
  });

  useEffect(() => {
    // console.log("item : ", item);
    setTitle(item?.title);
    setBody(item?.body);
  }, [item]);

  return (
    <div>
      <h2>Post 업데이트</h2>
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
        <button type="submit">Update</button>
      </form>

      {updateMutation.isPending && <p>업데이트중입니다. ... </p>}
      {updateMutation.isError && <p>{updateMutation.error.message}</p>}
      {updateMutation.isSuccess && <p>업데이트에 성공하였습니다.</p>}
    </div>
  );
};

export default PostUpdate;
