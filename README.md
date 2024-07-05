# Todo 서비스를 Context API 와 useReducer 로 만들기

## 1. 기본 구조

- /src/AppTodoTs.tsx 생성
  : Context API 로 상태를 관리한 내용을 공급(Provider) 역할

- /src/context/TodoContextProviderTs.tsx 파일생성
  : Context 와 Reducer 를 통해서 상태관리 기능 지원

- /src/component/todo 폴더생성

- /src/component/todo/TodoAddTs.tsx
  : Context 업데이트(Reduce 의 dispatch 적용)

- /src/component/todo/TodoListTs.tsx
  : Context 정보 보여주기 및 업데이트(Reduce 의 dispatch 적용)
