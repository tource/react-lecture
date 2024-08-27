# FireBase Todo

- TS 버전
- React Quill
- Loading
- React-Hook-Form
- Yup
- Caledar
- SNS 로그인
- Nivo
- Map
- GA4
- SEO
- Android App
- 드래그드랍 이미지 및 업로드 라이브러리
  : https://www.npmjs.com/package/react-dropzone

## 1. useAuth.js

: isLoading 및 uid 보관 추가

```js
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { recoil_UserData } from "../atoms/userAtom";
import { auth, db } from "../firebaseConfig";

const useAuth = () => {
  const [userCurrent, setUserCurrent] = useState(null); // FB 사용자 인증 정보
  const [rUserData, setRUserData] = useRecoilState(recoil_UserData); // 사용자 정보를 Recoil 에 저장함
  const [isLoading, setIsLoading] = useState(true); // 로딩은 상태읽기, FB 정보읽기, 새로고침시 필요함
  const [error, setError] = useState(null); // 에러가 발생하면 에러메시지를 관리함.
  const [uid, setUid] = useState(null);
  // 사용자 정보를 읽어들임
  const fetchUserData = async who => {
    if (!who) {
      return;
    }
    // 사용자 UID 보관
    setUid(who.uid);

    const userInfoGetDoc = doc(db, "users", who.uid);
    const docSnap = await getDoc(userInfoGetDoc);
    if (docSnap.exists()) {
      setRUserData(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    // Firebase 실시간 인증상태 감지진행
    const onAuth = onAuthStateChanged(auth, async who => {
      setIsLoading(true); // 로딩창을 보여줌.

      if (who) {
        // who == auth.currentUser 이다.
        setUserCurrent(who);
        // DataBase 에 진입해서 사용자 정보관련 내용을 읽어들인다.
        await fetchUserData(who);
      } else {
        // 로그아웃 실시간 처리
        setRUserData(null);
        setUserCurrent(null);
      }

      setIsLoading(false); // 로딩 완료한다.
    });

    return () => onAuth();
  }, []);

  return {
    // userData,
    // setUserData,
    userCurrent,
    setUserCurrent,
    isLoading,
    uid,
  };
};
export default useAuth;
```

## 2. App.js

: Router 변경 (로딩 정책)

```js
import { Navigate, Route, Routes } from "react-router-dom";
import { useRecoilState } from "recoil";
import { recoil_UserData } from "./atoms/userAtom";
import EditProfile from "./components/EditProfile";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Todo from "./components/Todo";
import FindPass from "./components/FindPass";
import Loading from "./components/Loading";
import useAuth from "./hooks/useAuth";
import TodoList from "./components/TodoList";
import TodoAdd from "./components/TodoAdd";
import TodoEdit from "./components/TodoEdit";

const App = () => {
  const { isLoading } = useAuth();
  const [rUserData, setRUserData] = useRecoilState(recoil_UserData);

  // 로그인이 되어 있는 경우인지, 아니면 로그인이 필요한지
  // 체크를 하는 동안 보여줄 컴포넌트를 배치하자.
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {rUserData ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to={"/todo"} />}></Route>
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/edit-profile"
              element={
                <ProtectedRoute>
                  <EditProfile />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/todo"
              element={
                <ProtectedRoute>
                  <TodoList />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/add-todo"
              element={
                <ProtectedRoute>
                  <TodoAdd />
                </ProtectedRoute>
              }
            ></Route>

            <Route
              path="/edit-todo/:id"
              element={
                <ProtectedRoute>
                  <TodoEdit />
                </ProtectedRoute>
              }
            ></Route>
          </Routes>
        </>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/findpass" element={<FindPass />} />
            {/* 모든 경로는 로그인으로 이동 */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </>
      )}
    </>
  );
};

export default App;
```

## 3. TodoAdd.js

```js
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useRecoilState } from "recoil";
import { recoil_UserData } from "../atoms/userAtom";
import { useNavigate } from "react-router-dom";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";
import uuid from "react-uuid";

const TodoAdd = () => {
  const navigate = useNavigate();
  // 목록 출력시 FB 에서 목록을 읽어들인다. (비동기)
  // 오로지 본인만의 자료 업데이트 및 관리 필요 (구분자 PK )
  const { isLoading, uid } = useAuth();
  const [rUserData, setRUserData] = useRecoilState(recoil_UserData);
  // 입력될 state 관리
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (isLoading) return; // 데이터 불러들이는 중...
    if (!rUserData) return; // 로그인 사용자 데이터가 없다.
  }, [isLoading, rUserData]);

  const handleSubmit = e => {
    e.preventDefault();
    if (isLoading) {
      alert("로딩 중입니다.  잠시 후 시도해 주세요.");
      return;
    }
    if (!rUserData) {
      alert("로그인이 필요합니다.");
      navigate("/");
      return;
    }
    if (!uid) {
      alert("로그인이 필요합니다.");
      navigate("/");
      return;
    }

    if (!title) {
      alert("타이틀을 입력하세요.");
      return;
    }
    if (!description) {
      alert("내용을 입력하세요.");
      return;
    }

    // FB DB 에 글을 등록한다.
    // 등록 항목은 title, description, uid, date(FB 의 Date 활용)
    addTodoFB();
  };

  // FB DB 등록하기
  const addTodoFB = async () => {
    try {
      // Add a new document with a generated id.
      const docRef = await addDoc(collection(db, "todos"), {
        // id: uuid(),
        title,
        description,
        // FB 컴퓨터의 시간을 활용한다.
        createdAt: Timestamp.now(),
        uid: uid,
      });

      setTitle("");
      setDescription("");
      alert("할일이 추가되었습니다.");
      navigate("/");
    } catch (error) {
      console.log("Todo 추가중 에러", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100 py-10">
      <h2 className="text-2xl font-bold mb-4">Add Todo</h2>

      {/* form 입력구성 */}
      <form
        onSubmit={e => {
          handleSubmit(e);
        }}
        className="w-full max-w-md bg-white shadow-md rounded p-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder=" Input Titlle"
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Input Description"
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full h-32"
          />
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
          >
            추가
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600 w-full"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoAdd;
```

## 4. TodoList.js

```js
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useRecoilState } from "recoil";
import { recoil_UserData } from "../atoms/userAtom";
import { useNavigate } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

const TodoList = () => {
  const navigate = useNavigate();
  // 목록 출력시 FB 에서 목록을 읽어들인다. (비동기)
  // 오로지 본인만의 자료 업데이트 및 관리 필요 (구분자 PK )
  const { isLoading, uid } = useAuth();
  const [rUserData, setRUserData] = useRecoilState(recoil_UserData);
  // 할일 목록
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (isLoading) return; // 데이터 불러들이는 중...
    if (!rUserData) return; // 로그인 사용자 데이터가 없다.
    if (!uid) return; // 로그인 사용자 데이터가 없다.
    getTodoList();
  }, [isLoading, rUserData, uid]);

  const getTodoList = async () => {
    try {
      // FB 에도 Query가 있다. Query 는 질의문, 조건요청등 을 말한다.
      const q = query(collection(db, "todos"), orderBy("createdAt", "desc"));

      // const unsub = await onSnapshot(collection(db, "todos"), snapshot => {
      const unsub = await onSnapshot(q, snapshot => {
        // 데이터 배열의 내용들
        const dataArr = snapshot.docs;
        // json 형태의 데이터 추출
        const todoAllData = dataArr.map(item => {
          const data = item.data();
          return {
            id: item.id,
            uid: data.uid,
            description: data.description,
            createdAt: data.createdAt?.toDate(),
          };
        });
        // 최종 필터링 , 즉 uid 가 동일한 요소만 추출 한다.
        const myTodoData = todoAllData.filter(item => item.uid === uid);
        console.log(myTodoData);
        // 데이터 출력
        setTodos(myTodoData);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickAddTodo = () => {
    navigate("/add-todo");
  };
  const handClickDelete = item => {
    // 삭제를 하기 위한 구분 용도의 데이터가 필요함.
    // 일반적으로  id 항목을 비교하는 게 관례임
    deleteTodo(item.id);
  };

  const deleteTodo = async id => {
    try {
      await deleteDoc(doc(db, "todos", id));
      alert("목록이 삭제 되었습니다.");
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickEditTodo = item => {
    // 수정을 위해서 문서의 id 를 param 전달
    navigate(`/edit-todo/${item.id}`);
  };
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100 py-10">
      <h2 className="text-2xl font-bold mb-4">Todo List</h2>
      <div className="w-full max-w-lg bg-white shadow-md rounded p-4 mb-4">
        <ul>
          {todos.map(item => (
            <li
              key={item.createdAt}
              className="border-b last:border-none py-4 flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
                <p className="text-sm text-gray-500">
                  {item.createdAt?.toLocaleDateString()}{" "}
                  {item.createdAt?.toLocaleTimeString()}
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleClickEditTodo(item)}
                    className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handClickDelete(item)}
                    className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {/* 목록이 없는 경우에는 없다고 표현함. */}
        {todos.length === 0 && <p>No todos list.</p>}
      </div>
      <button
        onClick={() => {
          handleClickAddTodo();
        }}
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full max-w-md shadow-md"
      >
        새로운 할일 등록
      </button>
    </div>
  );
};

export default TodoList;
```

## 5. TodoEdit.js

```js
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useRecoilState } from "recoil";
import { recoil_UserData } from "../atoms/userAtom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const TodoEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoading, uid } = useAuth();
  const [rUserData, setRUserData] = useRecoilState(recoil_UserData);
  // 입력될 state 관리
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // FB의 Doc 의 id를 이용해서 내용 가져오기
  const getTodo = async () => {
    try {
      // id 를 이용해서 문서 가져오기
      // 1. 문서레퍼런스 찾기
      const docRef = await doc(db, "todos", id);
      console.log(docRef);
      // 2. 문서내의 실제 데이터 가져오기
      const docSnap = await getDoc(docRef);
      console.log(docSnap);
      // 3. 실제 문서가 존재한다면 내용을 출력한다.
      if (docSnap.exists()) {
        const todo = docSnap.data();
        setTitle(todo.title);
        setDescription(todo.description);
      }

      // setTitle("원본타이틀");
      // setDescription("원본내용");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isLoading) return; // 데이터 불러들이는 중...
    if (!rUserData) return; // 로그인 사용자 데이터가 없다.

    getTodo();
  }, [isLoading, rUserData]);

  const handleSubmit = e => {
    e.preventDefault();
    if (isLoading) {
      alert("로딩 중입니다.  잠시 후 시도해 주세요.");
      return;
    }
    if (!rUserData) {
      alert("로그인이 필요합니다.");
      navigate("/");
      return;
    }
    if (!uid) {
      alert("로그인이 필요합니다.");
      navigate("/");
      return;
    }

    if (!title) {
      alert("타이틀을 입력하세요.");
      return;
    }
    if (!description) {
      alert("내용을 입력하세요.");
      return;
    }

    updateTodo();
  };

  // 문서 업데이트 하기
  const updateTodo = async () => {
    try {
      const docRef = await doc(db, "todos", id);
      await updateDoc(docRef, { title, description });
      alert("내용이 업데이트 되었습니다.");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100 py-10">
      <h2 className="text-2xl font-bold mb-4">Edit Todo</h2>

      {/* form 입력구성 */}
      <form
        onSubmit={e => {
          handleSubmit(e);
        }}
        className="w-full max-w-md bg-white shadow-md rounded p-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder=" Input Titlle"
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Input Description"
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full h-32"
          />
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
          >
            수정
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600 w-full"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoEdit;
```
