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
