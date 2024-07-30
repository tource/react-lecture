# ReactQuery

- https://tanstack.com/query/latest/docs/framework/react/overview
- API 백엔드 서버와 통신 전용(비동기)
- Web Application 전체 상태관리

## 1. 주의 사항

- V5 : 리액트 18버전 이상
- V4 : 리액트 16.8버전 이상
- V3 : 리액트 16.8버전 이상

## 2. 설치

- `npm i @tanstack/react-query`

## 3. 개발자 디버깅 도구

- `npm i @tanstack/react-query-devtools`

## 4. ReactQuery 환경 셋팅

- /src/index.js 또는 /src/App.js

## 5. ReactQuery 데이터 연동법

- useQuery() : 데이터 읽기
- useMutaion() : 데이터 업데이트하기

### 5.1. Sample 프로젝트

- /src/index.js

```js
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
// js 버전
const root = ReactDOM.createRoot(document.getElementById("root"));

// 웹 서비스 연결 및 결과에 대한 상태관리
const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools initialIsOpen={true} />
  </QueryClientProvider>,
);
```

- /src/App.js

```js
import PostAdd from "./pages/PostAdd";
import PostList from "./pages/PostList";
import PostUpdate from "./pages/PostUpdate";

const App = () => {
  return (
    <div>
      <h1> APP 컴포넌트</h1>
      <PostList />
      <PostAdd />
      <PostUpdate />
    </div>
  );
};

export default App;
```

- /src/pages/PostList.js
  : useQuery() 를 이용한 데이터 읽기
  : https://tanstack.com/query/latest/docs/framework/react/reference/useQuery

```js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// useQuery 로 데이터 읽기
// REST API 데모
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

const PostList = () => {
  // V4
  // const { data, error, isError, isLoading } = useQuery("posts", getPosts);
  // V5
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    // 1분동안 BE 에 다시 호출하지 않는다.
    staleTime: 1000 * 60,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error : {error.message}</div>;
  }

  return (
    <div>
      <h2>Post 목록</h2>
      <ul>
        {data.map((item, index) => (
          <li key={index}> {item.title} </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
```

- /src/pages/PostAdd.js
  : useMutation() 데이터 추가 및 업데이트
  : https://tanstack.com/query/latest/docs/framework/react/reference/useMutation

```js
import { useMutation } from "@tanstack/react-query";
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
  // post 등록용 React Query
  const addMutaion = useMutation({
    mutationKey: ["addpost"],
    mutationFn: data => postAddPost(data),
    onSuccess: () => console.log("성공이에요"),
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
```

- /src/pages/PostUpdate.js
  : useQuery 와 useMutation 활용

  ```js
  // index 에 적용한 client 참조
  const queryClient = useQueryClient();
  ```

  ```js
  // 클라이언트 참조를 이용한 쿼리 실행
  queryClient.invalidateQueries({ queryKey: ["posts"] });
  ```

```js
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
```
