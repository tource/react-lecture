# Component 문법(syntax)

## 1. 기본데이터 출력

```ts
const a: number = 1; // 숫자출력하기
const b: string = "hello"; // 문자출력하기
const c: boolean = true; // 참, 거짓을 이용한 출력하기
const d: undefined = undefined; // 값이 없다고 명시적으로 표현
const e: null = null; // 값이 비었다.
const f: number[] = [1, 2, 3]; // 배열
const g: { age: number; name: string } = { age: 15, name: "hong" };
```

```ts
interface IMember {
  age: number;
  name: string;
}
const g: IMember = { age: 15, name: "hong" };
```

## 2. 알아두면 좋은 ts 기본데이터형

- any, void, never 도 있어요.
- any, never 는 가능하면 권장하지는 않아요.
- 하지만 마이그레이션 즉, js 를 ts 로 변경시 좋아요.

```js
const what = 1;
const where = "대구";
```

- 일단 확장자를 수정(ts, tsx)

```ts
const what: any = 1;
const where: any = "대구";
```

- 시간을 두고 꼼꼼하게 타입형을 지정한다.

```ts
const what: number = 1;
const where: string = "대구";
```

## 3. 함수 활용하기

```js
function 함수명() {
  return 결과값;
}
function say() {
  return "안녕";
}
```

```ts
function 함수명(): 리턴데이터형 {
  return 결과값;
}
function say(): string {
  return "안녕";
}
```

- 매개변수가 있는 경우

```js
function 함수명(매개변수) {
  return 결과값;
}
function say(message) {
  return message;
}
```

```js
function 함수명(매개변수:데이터형):리턴데이터형 {
  return 결과값;
}
function say(message: string): string {
  return message;
}
```

## 4. 화살표 함수 활용하기

```js
const 변수명 = () => {
  return 결과값;
};
const hello = () => {
  return "Hello";
};
```

```ts
const 변수명 = (): 리턴데이터형 => {
  return 결과값;
};
const hello = (): string => {
  return "Hello";
};
```

- 매개변수가 있는 경우

```js
const 변수명 = message => {
  return message;
};
const hello = message => {
  return message;
};
```

```ts
const 변수명 = (message: 데이터형): 리턴데이터형 => {
  return message;
};
const hello = (message: string): string => {
  return message;
};
```

## 5. 화살표 함수로 JSX.Element 를 리턴하기

```js
const ListTag = () => {
  return <div>안녕</div>;
};
```

```ts
const ListTag = ():JSX.Element => {
  return <div>안녕</div>;
};
```

## 6. 화살표 함수 변수명에 데이터 형 지정하기

- 가독성이 너무 힘들어요.

```ts
const hello: () => string = (): string => {
  return "Hello";
};
```

```ts
interface IHelloFunction {
  (): string;
}
const hello: IHelloFunction = (): string => {
  return "Hello";
};
```

- 매개변수가 있는 경우

```ts
const hello: (message: string) => string = (message: string): string => {
  return message;
};
```

```ts
interface IHelloFunction {
  (message: string): string;
}
const hello: IHelloFunction = (message: string): string => {
  return message;
};
```

## 7. 화살표 함수 변수명에 JSX.Element 지정하기

```ts
 const ListTag: () => JSX.Element = () => {
    return <div>안녕</div>;
  };
```

```ts
 const ListTag: () => JSX.Element = () => {
    return <div>안녕</div>;
  };
```

```ts
  const ListTag: React.FC = (): JSX.Element => {
    return <div>안녕</div>;
  };

  const ListTag: React.FC  = () => {
    return <div>안녕</div>;
  };

  // 아래를 추천합니다.(다수가 활용)
  const ListTag = (): JSX.Element => {
    return <div>안녕</div>;
  };
```

## 8. 여러 타입의 리턴데이터형을 가지는 함수

- 대단히 좋지 않아요.
- 순수한 (Pure) 함수
  : 함수의 기능이 대단히 간단하고 늘 동일한 결과를 리턴하는 것
  : 함수의 리턴형의 데이터 종류는 늘 동일한 것

```ts
const Add = (a: number, b: number): number => {
  return a + b;
};

const go = Add(4, 5);
```

```ts
const Add = (a: number | string, b: number): number | string => {
  if (typeof a === "string") {
    return a + b.toString();
  } else {
    return a + b;
  }
};

const go2 = Add("안녕", 5);
```

```ts
const Add = (a: number | string, b: number | string): number | string => {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  } else {
    return a + b;
  }
};
const go3 = Add("안녕", "반가워");
```

## 9. onClick 이벤트 ts

```js
const handleClick = e => {
  console.log("안녕");
};

// jsx 코드
<button
  onClick={e => {
    handleClick(e);
  }}
>
  클릭
</button>;
```

```ts
import React, { MouseEvent } from "react";

const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
  console.log("안녕");
};
```

```ts
const handleDivClick = (e: MouseEvent<HTMLDivElement>): void => {
  console.log("반가워");
};
```

## 10. onChange 이벤트 ts

```ts
import React, { ChangeEvent, MouseEvent } from "react";

const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
  console.log(e.target);
};

<input
  type="text"
  onChange={e => {
    handleChange(e);
  }}
/>

```

11. onSubmit 이벤트 ts

```ts
import React, { ChangeEvent, FormEvent, MouseEvent } from "react";

const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
  // 기본 기능 막기
  e.preventDefault();
};

<form
  onSubmit={e => {
    handleSubmit(e);
  }}
>
</form>

```
