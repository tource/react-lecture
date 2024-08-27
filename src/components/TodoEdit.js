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
