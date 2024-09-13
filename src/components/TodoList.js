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
