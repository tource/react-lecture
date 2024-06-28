# component TS 버전

- 퍼블리싱 완료 후 js 확장자
  : js, jsx 는 일반적으로 js 로 확장자 통일
  : 규칙 1. js 는 JSX 즉, 리액트 태그를 쓸 수 없다.
  : 규칙 2. jsx 는 JSX 를 사용할 수있다.
  : 하지만, 현재는 그냥 js 로 확장자 통일했다.

- 퍼블리싱 완료 후 tsx 와 ts 확장자로 반드시 구분한다.
  : ts 확장자는 일반적 js 에 데이터 종류 즉, 타입을 정의한 것.
  : tsx 확장자는 JSX 를 사용하겠다. 즉, 컴포넌트에 타입을 정의하겠다.

## 1. TS 의 좋은 점

- 코딩 중에 오류를 발견하기 쉽도록 VSCode 가 지원한다.
- 코드 힌트가 VSCode 에서 가이드를 해준다.
- 코딩 중에 오류를 줄이면 서비스 중에 오류도 줄여줍니다.
- js 를 같이 사용하셔도 문제가 없습니다.

## 2. TS 의 단점

- 문법 즉, 데이터 종류를 설정하는 방법이 어렵다.
- 문법이 일반 프로그래밍 방식으로 진행되므로 어렵다.

## 3. index.js 가 아니라 index.ts가 됩니다.

- 마이그레이션 : src/index.js 확장자를 src/index.ts 로 수정

## 4. 컴포넌트 tsx 버전 만들기

- src/AppRoot.tsx 생성
- TS 는 데이터 종류를 설정하는 것이다.
- 데이터 종류를 설정할 때는 : 키워드를 이용한다.
  : 타입정의문법
  : 데이터 종류를 확인하시고 싶은 경우 타입추론을 믿어라.
  : VSCode 는 타입추론을 사람보다 잘한다.

## 5. tsx 로 컴포넌트를 React.FC 데이터 종류로 만들기

```tsx
import React from "react";

const AppRoot: React.FC = () => {
  return <div>안녕하세요.</div>;
};

export default AppRoot;
```

## 6. tsx 로 컴포넌트를 JSX.Element 데이터 종류로 만들기

```tsx
const AppRoot = (): JSX.Element => {
  return <div>안녕하세요.</div>;
};
```

## 7. tsx 로 컴포넌트를 React.FC 와 JSX.Element 데이터 종류로 만들기

```tsx
const AppRoot: React.FC = (): JSX.Element => {
  return <div>안녕하세요.</div>;
};
```

## 8. ts 에 함수 이해하기

### 8.1. 일반적인 함수

```js
function Add(a, b) {
  return a + b;
}
```

```js
function Add(a:number, b:number) : number {
  return a + b;
}
```

### 8.2. 화살표 함수

```js
const Add = (a, b) => {
  return a + b;
};
```

```js
const Add = (a, b) => {
  return a + b;
};
```

```ts
const Add = (a: number, b: number): number => {
  return a + b;
};
```

### 8.3. 화살표 함수의 이름에 타입정의하기

```ts
const Add = (a: number, b: number): number => {
  return a + b;
};
```

- 함수를 저장하고 있는 Add 변수라서

```ts
const Add: (a: number, b: number) => number = (
  a: number,
  b: number,
): number => {
  return a + b;
};
```

### 8.4. React.FC 와 JSX.Element 의 차이

- React.FC 는 children 을 자동으로 삽입해 준다.
- JSX.Element 는 children 을 반드시 직접 종류를 작성해 준다.

## 9. 컴포넌트에 props 전달하기

- src/components/Hi.tsx

```tsx
import React from "react";
// props 로 전달되는 데이터의 모양을 만들어준다.
// 모양을 만드는 방법은 interface 또는 type 이 있다.
interface HiProps {
  nickname: string;
  age: number;
}

const Hi: React.FC<HiProps> = ({ nickname, age }) => {
  return (
    <div>
      반가워요! {nickname}님, 나이가 {age} 이군요
    </div>
  );
};

export default Hi;
```

```tsx
<Hi nickname={"hong"} age={15} />
```

### 9.1. 제네릭 <데이터종류> 의 간단 이해

- 제네릭은 어떤 데이터가 들어올지 알수 없다.
- 그래서 `나중에 전달된 데이터종류를 판단하겠다.` 라는 것
- <interface변수>, <type변수>, <기본형변수>, <객체형변수>

## 10. React.FC 와 JSX.Element 에 children 활용하기

### 10.1.React.FC 에 children 활용하기

- src/components/Child.tsx
  : 주의사항은 `children?: React.ReactNode;`
  : `?는 필수입니다.`
  : children 이 있을 수도 없을 수도 있다

```tsx
import React from "react";

interface ChildProps {
  title: string;
  hobby: string;
  say: () => void;
  info: { name: string; age: number };
  children?: React.ReactNode;
}

const Child: React.FC<ChildProps> = ({ title, hobby, say, info, children }) => {
  return (
    <div>
      Child 입니다. {info.name}은 {info.age} 입니다.
      <div>{children}</div>
    </div>
  );
};

export default Child;
```

- children 전달

```tsx
const title: "React.FC 활용" = "React.FC 활용";
const hobby: "축구" = "축구";
const say: () => void = () => {
  console.log("안녕");
};

const info: {
  name: string;
  age: number;
} = {
  name: "홍길동",
  age: 15,
};
```

```tsx
<Child title={title} hobby={hobby} say={say} info={info}>
  <h2>나는 React.FC 의 children 속성이다.</h2>
</Child>
```

### 10.2.JSX.Element 에 children 활용하기

- src/components/Son.tsx

```tsx
import React from "react";
interface SonProps {
  title: string;
  hobby: string;
  say: () => void;
  info: { name: string; age: number };
  children?: React.ReactNode;
}
const Son = ({ title, hobby, say, info, children }: SonProps): JSX.Element => {
  return (
    <div>
      Son 입니다.
      {children}
    </div>
  );
};

export default Son;
```

```tsx
<Son title={title} hobby={hobby} say={say} info={info}>
  <h2>나는 JSX.Element 의 children 이다.</h2>
</Son>
```

### 10.3. children 을 사용한다면 2가지 있을 것이다.

- props 여러개의 데이터를 전달하는 컴포넌트 + children

```tsx
<Child title="안녕" age={15}>
  <h1>자식요소</h1>
</Child>
```

- props 없이 보여주는 컴포넌트 + children

```tsx
<Child>
  <h1>자식요소</h1>
</Child>
```

- 고민하지 말고 기본 Props 용 Interface 한개 만들어주자.
- 아래가 컴포넌트에 기본형이어야 한다고 판단합니다.

```tsx
interface ChildProps {
  children?: React.ReactNode;
  // 추가 Props 작성해 주기
}
// React.FC 용
const Child: React.FC<ChildProps> = ({ children }) => {})
// JSX.Element
const Son = ({ children }: ChildProps): JSX.Element => {})
// React.FC 용
const Child: React.FC<ChildProps> = ({ children }: ChildProps): JSX.Element => {})

```

## 11. useState 에 TS 적용하기

```tsx
/* eslint-disable prefer-const */
import React, { useState } from "react";

interface ChildProps {
  children?: React.ReactNode;
}

const Child: React.FC<ChildProps> = ({ children }) => {
  const [level, setLevel] = useState<number>(0);
  const [userId, setUserId] = useState<string>("");
  const initData = [
    { pk: 1, title: "할일 1", complted: true },
    { pk: 1, title: "할일 1", complted: true },
    { pk: 1, title: "할일 1", complted: true },
    { pk: 1, title: "할일 1", complted: true },
    { pk: 1, title: "할일 1", complted: true },
  ];
  const [todoList, setTodoList] = useState<[]>([]);

  return (
    <div
      onClick={() => {
        setLevel("hello");
      }}
    >
      Child 입니다.
      <div>{children}</div>
    </div>
  );
};

export default Child;
```
