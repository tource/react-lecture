import React, { useContext, useState } from "react";
import {
  TODO_ACTION_TYPE,
  TodoContext,
} from "../../context/TodoContextProvider";

const TodoList = () => {
  // context 에 보관한 state 를 출력함.
  // context 에 연결된  state 관리 Reducer 함수 를 호출함.
  const { state, dispatch } = useContext(TodoContext);

  // 현재 수정중인지 아닌지 에 대한 상태관리
  // 몇 번 글이 수정 중인지 상태관리
  const [editId, setEditId] = useState(null);
  const [editContent, setEditContent] = useState("");

  const handleClickDelete = uid => {
    const obj = { type: TODO_ACTION_TYPE.DELETE_TODO, payload: { uid } };
    dispatch(obj);
  };

  const handleClickModify = (uid, content) => {
    setEditId(uid);
    setEditContent(content);
  };

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      handleClickSave();
    }
  };

  const handleClickSave = () => {
    const obj = {
      type: TODO_ACTION_TYPE.MODIFY_TODO,
      payload: { uid: editId, content: editContent },
    };
    dispatch(obj);
    // 원래 상태로 돌리기
    setEditId(null);
    setEditContent("");
  };

  const handleClickCancel = () => {
    setEditId(null);
    setEditContent("");
  };

  // Pagination 을 위한 코드처리
  // 총 목록수는  state 에 저장되어 있음. (todos 배열.length)
  // 한 화면 당 보여줄 목록 최대 개수
  const todosPerPage = 5;
  // 총 몇페이지 인가?
  const totalPages = Math.ceil(state.length / todosPerPage);

  // 화면에 보여줄 버튼 목록
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  // 실제 목록에서 원하는 부분부터 갯수 만큼 배열 만들기
  // 보여줄 목록의 시작 번호
  const [currentPage, setCurrentPage] = useState(1);
  // 페이지 번호 를 이용한 시작 인덱스 처리
  const indexStart = (currentPage - 1) * todosPerPage;

  // const 현재목록배열 = 원본배열.slice(시작인덱스, 끝 범위 인덱스 이전까지);
  const currentTodos = state.slice(indexStart, indexStart + todosPerPage);

  // 화면에 페이지 버튼 목록을 출력하기 기능
  // 예: pageNumbers = [1,2,3,4,5....]
  const renderPageNumbers = pageNumbers.map((item, index) => (
    <button
      key={index}
      onClick={() => {
        setCurrentPage(item);
      }}
    >
      {item}
    </button>
  ));

  // 이전 페이지 가기
  const handleClickPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  // 다음 페이지 가기
  const handleClickNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <h1>할일목록</h1>
      {state.length === 0 ? (
        <h2>목록이 없습니다.</h2>
      ) : (
        <>
          <div>
            {currentTodos.map((item, index) => (
              <div key={index}>
                {editId === item.uid ? (
                  <div>
                    <input
                      type="text"
                      value={editContent}
                      onKeyDown={e => handleKeyDown(e)}
                      onChange={e => setEditContent(e.target.value)}
                    />
                    <button
                      onClick={() => {
                        handleClickSave();
                      }}
                    >
                      수정
                    </button>
                    <button
                      onClick={() => {
                        handleClickCancel();
                      }}
                    >
                      취소
                    </button>
                  </div>
                ) : (
                  <div>
                    <p>할일 번호(uid) : {item.uid}</p>
                    <p>할일 내용: {item.content}</p>
                    <button
                      onClick={() => {
                        handleClickModify(item.uid, item.content);
                      }}
                    >
                      수정
                    </button>
                    <button
                      onClick={() => {
                        handleClickDelete(item.uid);
                      }}
                    >
                      삭제
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div>{renderPageNumbers}</div>
          <div>
            <button
              disabled={currentPage === 1}
              onClick={() => {
                handleClickPrev();
              }}
            >
              이전페이지
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => {
                handleClickNext();
              }}
            >
              다음페이지
            </button>
          </div>
          <div>
            현재페이지 {currentPage} / 총페이지 {totalPages}
          </div>
        </>
      )}
    </div>
  );
};

export default TodoList;
