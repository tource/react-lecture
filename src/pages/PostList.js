import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const getPosts = async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts",
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const PostList = ({ setItem }) => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    // 1분동안 BE에 다시 호출하지 않는다.
    staleTime: 1000 * 60,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Post 목록</h2>
      <ul>
        {data.map((item, index) => (
          <li key={index} onClick={() => setItem(item)}>
            {item.title}{" "}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
