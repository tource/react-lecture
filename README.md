# Component state

- 기본형

```js
const AppRoot: React.FC<AppRootProps> = ({ children }) => {
  const [count, setCount] = useState(0);
  return <div>{count}</div>;
};
```

## 1. state 에 데이터 종류명시하기 (TS)

- 마우스 커서를 state 변수에 올려본다.
  : 타입 추론을 보고 결정한다.
  : `const count: number`
  : `useState<>(0)`
  : ` const [count, setCount] = useState<number>(0);`
- 활용예

```ts
const [count, setCount] = useState<number>(0);
const [name, setName] = useState<string>("");
const [login, setLogin] = useState<boolean>(false);
const [todos, setTodos] = useState<[]>([]);
const [info, setInfo] = useState<null>(null);
```

## 2. state 에 객체 데이터 명시하기

- `const [user, setUser] = useState(member);`

```ts
const member = {
  pk: 1,
  id: "hong",
  level: 10,
};
const [user, setUser] = useState<{
  pk: number;
  id: string;
  level: number;
}>(member);
```

- interfac 로 업데이트 하기

```ts
// 사용자 데이터 정의
interface IUser {
  pk: number;
  id: string;
  level: number;
  login?: boolean;
}
// 객체 데이터 정의하기
const member = {
  pk: 1,
  id: "hong",
  level: 10,
};
const [user, setUser] = useState<IUser>(member);
```

## 3. state 에 여러 종류 데이터 명시하기

```ts
// 여러가지 종류의 데이터를 기본 값으로 설정
const [userValue, setUserValue] = useState<number | string>(0);
setUserValue("A");
const [userPoint, setUserPoint] = useState<boolean | null | undefined | string>(
  false,
);
setUserPoint(null);
setUserPoint(undefined);
setUserPoint(true);
setUserPoint(0);
setUserPoint("1200");
```

## 4. state 에 배열에 데이터 명시하기

```ts
// 학생정보 데이터모양
interface IStudent {
  pk: number;
  name: string;
  hobby: string;
}

// 배열에 데이터 명시하기
const [tourList, setTourList] = useState<string[]>(["대구", "광주", "경주"]);
const [priceList, setPriceList] = useState<number[]>([1000, 2000, 3000]);
const [good, setGoood] = useState<(string | number | boolean)[]>([
  "수박",
  5000,
  0.5,
  true,
]);
const students = [
  { pk: 1, name: "홍길동", hobby: "축구" },
  { pk: 2, name: "고길동", hobby: "등산" },
  { pk: 3, name: "박길동", hobby: "산책" },
];
const [studentList, setStudentList] = useState<IStudent[]>(students);
```
