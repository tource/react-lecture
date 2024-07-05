# Todo 서비스를 Context API 와 useReducer 로 만들기

## 1. 기본 구조

- /src/AppTodo.js 생성
  : Context API로 상태를 관리한 내용을 공급(Provider) 역할
- /src/context/TodoContextProvider.js 파일생성
  : Context와 Reducer를 통해서 상태관리 기능 지원

- /src/component/todo 폴더생성
- /src/component/todo/TodoAdd.js
  : Context 업데이트(Reducer의 dispatch 적용)

- /src/component/todo/TodoList.js
  : Context 정보 보여주기 및 업데이트(Reducer의 dispatch 적용)
