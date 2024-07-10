import React, { KeyboardEvent, useContext, useState } from "react";
import {
  Action,
  TODO_ACTION_TYPE,
  Todo,
  TodoContext,
  TodoContextType,
} from "../../context/TodoContextProviderTs";

const TodoListTs = (): JSX.Element => {
  const { state, dispatch } = useContext(TodoContext) as TodoContextType;
  const [editId, setEditId] = useState<number | null | undefined>(null);
  const [editContent, setEditContent] = useState<string | undefined>("");

  const handleClickDelete = (uid: number | null | undefined) => {
    const obj: Action = {
      type: TODO_ACTION_TYPE.DELETE_TODO,
      payload: { uid },
    };
    dispatch(obj);
  };

  const handleClickModify = (
    uid: number | null | undefined,
    content: string | undefined,
  ) => {
    setEditId(uid);
    setEditContent(content);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleClickSave();
    }
  };

  const handleClickSave = () => {
    const obj: Action = {
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
  // Pagenation
  const todosPerPage: number = 5;
  const totalPages: number = Math.ceil(state.length / todosPerPage);
  const pageNumbers: number[] = [];
  for (let i: number = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  const [currentPage, setCurrentPage] = useState<number>(1);
  const indexStart: number = (currentPage - 1) * todosPerPage;
  const currentTodos: Todo[] = state.slice(
    indexStart,
    indexStart + todosPerPage,
  );
  const renderPageNumbers: JSX.Element[] = pageNumbers.map((item, index) => (
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

export default TodoListTs;
