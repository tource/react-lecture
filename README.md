# TypeScript 문법

- [TypeScript 핸드북](https://typescript-kr.github.io/pages/the-handbook.html)
- TS 는 React, Vue, Angular, Svlet, 자바스크립트 모두 지원합니다.
- JS 트랜드가 TS 로 하기를 권장하고 있습니다.
- MS 에서 개발을 했고, VS Code 에서 잘 지원됩니다.
- VS Code에서 타입에 대한 추론을 아주 잘해줍니다.
- ts 로 작업시 최종 파일은 js 로 생성이 됩니다.
- 주로 `데이터 반환 및 전달되는 데이터 타입 형태를 지정`하는 용도로 추천

## 1. 파일 확장자에 대한 정리

- .js : 자바스크립트 파일 ( JSX 작성 가능 )
- .jsx : 리액트 컴포넌트 자바스크립트 파일
- .ts : 타입스크립트 파일 (JSX 작성 불가능)
- .tsx : 리액트 컴포넌트 타입스크립트 파일

## 2. ts 문법 (JSX 제외)

- /src/test.ts (소문자로) 생성
- 참고 사항
  : `식별자 : 타입종류`
  : 여기서의 `:` 은 Annotation 이라고 합니다.
  : Annotation 한글로 타입 표기라고 합니다.

### 2.1. 기본 타입(데이터형)

- string (문자열)

```js
//  string
// 아래 문장은 정확한 ts 가 아닙니다.
// vs code 에서 값을 보고 데이터 타입을 예측합니다.
// vs code 에서 타입추론 한다.
const strA = "hello"; // 타입추론
const strB: string = "hello"; // 타입명시
const strC: "hello" = "hello"; // const

```

- number (숫자)

```js
// number
const numA = 10;
const numB: number = 10;
const numC: 10 = 10;
```

- boolean (진위)

```js
// boolean
const isLoginA = false;
const isLoginB: boolean = false;
const isLoginC: false = false;

```

- object (객체)

```js

// object
const objA = { age: 10, name: "hong" };

const objB: {
  age: number;
  name: string;
} = { age: 10, name: "hong" };

// 아래 코드는 키명:값고정 X
const objC: {
  age: 10;
  name: "hong";
} = { age: 10, name: "hong" };

// 아주 복잡한 object 타입예제
// object 의 타입은 interface 또는 type 으로 별도로 추출하자.
const goodA: {
  pk: number;
  iShop: number;
  location: string;
  count: number;
  pics: string[];
  option: string[];
  name: string;
  position: number[];
  info: {
    ceo: string;
    time: string;
  };
} = {
  pk: 1,
  iShop: 5487,
  location: "대구 중구 국채보상로 159",
  count: 33,
  pics: ["a.jpg", "b.jpg", "c.jpg"],
  option: ["주차장", "와이파이", "포장"],
  name: "햄버거",
  position: [20.11111, 21.35875],
  info: { ceo: "hong", time: "09:00~24:00" },
};

```

- array (배열)

```js

// array
const arrA = [1, 2, 3];
const arrB: number[] = [1, 2, 3];
const arrC: Array<number> = [1, 2, 3];

const arrStrNumA = [1, 2, 3, "안녕"];
const arrStrNumB: (string | number)[] = [1, 2, 3, "안녕"];
const arrStrNumC: Array<string | number> = [1, 2, 3, "안녕"];

const arrPersonA = [
  { age: 10, name: "hong1" },
  { age: 11, name: "hong2" },
  { age: 12, name: "hong3" },
];

const arrPersonB: {
  age: number;
  name: string;
}[] = [
  { age: 10, name: "hong1" },
  { age: 11, name: "hong2" },
  { age: 12, name: "hong3" },
];

const arrPersonC: Array<{
  age: number;
  name: string;
}> = [
  { age: 10, name: "hong1" },
  { age: 11, name: "hong2" },
  { age: 12, name: "hong3" },
];

```

- tuple (튜플)
  : 배열입니다.
  : 길이가 고정입니다.
  : 각 요소의 타입이 지정되어 있습니다.

```js

// tuple
const tArrA = [1, 2, false, "hong"]; // 배열
const tArrB: (string | number | boolean)[] = [1, 2, false, "hong"]; // 배열
// 아래만 튜플인정
const tArrC: [number, number, boolean, string] = [1, 2, false, "hong"];

```

- enum (이넘)
  : 특정한 상수값 집합이다.

```js

// enum
const DirectionLeft = "LEFT";
const DirectionRight = "RIGHT";
const DirectionUp = "UP";
const DirectionDown = "DOWN";

const DirAD = DirectionLeft;
const DirBD = DirectionRight;
const DirCD = DirectionUp;
const DirDD = DirectionDown;

enum Arraow {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  TOP = "TOP",
  DOWN = "DOWN",
}

const DirA: Arraow.LEFT = Arraow.LEFT;
const DirB: Arraow.RIGHT = Arraow.RIGHT;
const DirC: Arraow.TOP = Arraow.TOP;
const DirD: Arraow.DOWN = Arraow.DOWN;

```

- null
  : 개발자가 값이 빔을 작성

- undefined
  : js 의 기본값(값이 없음)

- any

```js

// any
// 모든 곳에 타입으로 사용가능 한 치트키
// 타입을 모르는 경우에 나중을 위해서 일단 작성하는 타입
// js 에서 ts 로 또는 js 에서 tsx 로 확장자 변경시
// 일단 : any 로 명시
// ts 의 장점을 잃어버림
const str: any = "홍길동";
const num: any = 123;
const arr: any = [1, 2, 3];

```

- void

```js

// void
// 리턴값이 없는 함수 이다.
// 함수에 return 을 작성하지 않으면 void
// 명시적으로 함수에 return 을 적어도 void
function sayA(): void {}

function sayB(): void {
  return;
}

function sayC(): string {
  return "hello";
}

```

- never

```js

// never
// 절대로 발생하지 않는 값을 의미한다.
// 반복문을 통해서 반복을 해도 영원히 값의 결과 도출안됨
function play(): never {
  while (true) {
    console.log("gogogogo");
  }
}
// 에러가 발생시 처리하는 경우
function errorFn(): never {
  throw new Error("noResult");
}

```

### 2.2. 함수

- 함수 리턴의 타입
- 함수 매개변수의 타입

#### 2.2.1. 함수의 기본형

```js
function addA(a, b) {
  return a + b;
}
let result = addA(1, 3);
result = addA("안", "녕");
result = addA(1, "반가워");
result = addA([], false);

function addA_update(a, b) {
  if (typeof a !== "number") {
    alert("숫자를 입력하세요.");
    return;
  }

  if (typeof b !== "number") {
    alert("숫자를 입력하세요.");
    return;
  }

  return a + b;
}

function addB(a: number, b: number): number {
  return a + b;
}

let resultB = addB(1, 3);
resultB = addB("안", "녕");
resultB = addB(1, "반가워");
resultB = addB([], false);
```

#### 2.2.2. 함수의 인자옵션

- ts 는 함수의 인자와 함수의 매개변수의 갯수가 일치하여야 한다.

```js
function add(a:number, b:number): number {
    return a + b;
}
add(1,3);
add(100,300);
add(100); // 오류
```

- ts에는 매개변수에 옵셔널(?) 을 줄 수 있다.

```js
function add(a: number, b?: number): number {
  return a + b; // 오류
}
add(1, 3);
add(100, 300);
add(100); // 통과
```

- ES문법의 디폴트 매개변수값을 이용할 수 있다.

```js
function add(a: number, b: number = 0): number {
  return a + b;
}
add(1, 3);
add(100, 300);
add(100);
```

- 인자의 개수를 모르는 경우의 활용(rest parameter)

```js
function add(a: number, ...nums: number[]): number {
  console.log(nums); //[1,2,3,4,5,6,7]
  console.log(nums); //[1,2,3]
  console.log(nums); //[1]
  let total = 0;
  for (const i in nums) {
    total += nums[i];
  }
  return a + total;
}
add(1, 2, 3, 4, 5, 6, 7);
add(1, 2, 3);
add(1);
```

- 객체를 만약에 rest paramenter 로 전달한다면?

```js
function add(...who) {
  console.log(who); // [ {"age": 10, "name": "hong" }]
}
add({ age: 10, name: "hong" });
```

```js
function add({ ...who }) {
  console.log(who); // {"age": 10,"name": "hong"}
}
add({ age: 10, name: "hong" });
```

#### 2.2.3. 화살표 함수

```js
// 매개변수 없을 때
function addA(): number {
  return 5;
}
const addB = (): number => {
  return 5;
};

// 매개변수 1개일 때
function addC(a: number): number {
  return a;
}
const addD = (a: number): number => {
  return a;
};

// 매개변수 2개 이상일 때
function addE(a: number, b: number): number {
  return a + b;
}
const addF: (a: number, b: number) => number = (
  a: number,
  b: number,
): number => {
  return a;
};

// 매개변수를 받아서 리턴하는 일이 1 줄 이상 인 경우
function addG(a: number, b: number): number {
  const total = a + b;
  return total;
}
const addH: (a: number, b: number) => number = (
  a: number,
  b: number,
): number => {
  const total = a + b;
  return total;
};

// 매개변수를 받아서 리턴하는 일이 1 줄 인 경우
function addI(a: number, b: number): number {
  return a + b;
}
const addJ: (a: number, b: number) => number = (a: number, b: number): number =>
  a + b;
```

### 2.3. 인터페이스

- 상호 간에 약속, 규칙을 의미함. ( 쿵 ~ 짝 ^^ )
- TS 에서는 `객체의 타입`을 정의할 때 사용합니다.
- 다양한 곳에서 활용
  : 객체의 속성과 속성의 타입
  : 함수의 매개변수 타입
  : 함수의 리턴 타입
  : 배열의 요소의 타입
  : 클래스의 타입
- 통상 인터페이스는 파일을 만들어서 별도로 관리를 한다.

#### 2.3.1. 생성법

```js
interface 인터페이스명 {
  속성명: 속성값;
  속성명: 속성값;
  속성명: 속성값;
}
```

#### 2.3.2. 생성이유

```js
// 대표적으로 객체의 타입에 대한 정의 샘플
// js
const personA = { age: 20, name: "kim" };

// 함수 활용을 한다.
function showInfoA(who) {
  console.log(who.age);
  console.log(who.name);
}

showInfoA(personA);

// ts
const personB: {
  age: number;
  name: string;
} = { age: 20, name: "kim" };

function showInfoB(who: { age: number; name: string }): void {
  console.log(who.name);
  console.log(who.age);
}
showInfoB(personB);

// ts
interface IPerson {
  age: number;
  name: string;
}

const personC: IPerson = { age: 20, name: "kim" };

function showInfoC(who: IPerson): void {
  console.log(who.name);
  console.log(who.age);
}
showInfoC(personB);
```

#### 2.3.3. 인터페이스 옵션

- 옵션 ?

```js
interface IPerson {
  age: number;
  name: string;
  gender?: string; // 옵션 ?
}
```

- 읽기 전용 속성
  : 초기화는 지원
  : 변경 불가

```js
interface IPerson {
  age: number;
  name: string;
  gender?: string;
  readonly country: string; // 읽기 전용 속성(초기화는 가능)
}
```

#### 2.3.4. 함수 타입의 인터페이스

```js
// 함수의 리턴 타입
const loginFnA: (id: string, pass: string) => boolean = function (
  id: string,
  pass: string,
): boolean {
  console.log("로그인");
  return true;
};

// 함수의 리턴 인터페이스
interface ILogin {
  (id: string, pass: string): boolean;
}

const loginFnB: ILogin = function (id: string, pass: string): boolean {
  console.log("로그인");
  return true;
};
```

#### 2.3.5. 인터페이스의 확장(상속)

```js
// 인터페이스 확장
interface IPerson {
  age: number;
  name: string;
}
interface IStudent extends IPerson{
  level: number;
  shcool: string;
}
interface IJob extends IPerson {
  job: string;
}
```

#### 2.3.6. 클래스의 구현

```ts
interface IInfo {
  name: string;
  say(word: string): void;
}

class MyInfo implements IInfo {
  name: string = "hong";
  say(word: string) {
    this.name = word;
  }

  constructor() {} // 생성자 함수 new MyInfo()
}

const go: MyInfo = new MyInfo();
```

### 2.4. Union

- `A | B` 즉, A 아니면 B 이다.

```js
function addNum(a: number): number {
  return a;
}
function addStr(a: string): string {
  return a;
}
function addBool(a: boolean): boolean {
  return a;
}
function add(a: number | string | boolean): number | string | boolean {
  return a;
}
```

#### 2.4.1. Intersection Type

- 여러가지 타입을 모두 만족하는 한개의 타입을 정의
- 타입을 하나로 합친다.

```js
interface IPerson {
  age: number;
  name: string;
}
interface IStudent {
  school: string;
  level: number;
}
type TWho = IPerson & IStudent;
/*
 TWho = {
  age: number;
  name: string;
  school: string;
  level: number;
 }
*/
```

- 주의 사항

```js
interface IPerson {
  age: number;
  name: string;
  hi: string;
}
interface IStudent {
  school: string;
  level: number;
  hi: string;
}
type TWho = IPerson & IStudent;
/*
 TWho = {
  age: number;
  name: string;
  school: string;
  level: number;
 }
*/
function showInfo(who: IPerson | IStudent) {
  // console.log(who.name);
  // console.log(who.age);
  // console.log(who.school);
  // console.log(who.level);
  console.log(who.hi); // 공통적으로 코딩이 되어 있어서 가능
}
const go: IPerson = { name: "hong", age: 10, hi: "안녕" };
showInfo(go);
const goS: IStudent = { school: "green", level: 10, hi: "hello" };
showInfo(goS);

```

### 2.5. 클래스

```js
class Student {
  constructor() {} // new 하면 자동 실행 리턴은 인스턴스
}

const who: Student = new Student();
```

```js
class Student {
  name: string = "홍길동";
  constructor() {} // new 하면 자동 실행 리턴은 인스턴스
}

const who: Student = new Student();
```

```js
class Student {
  name: string;
  constructor(_name: string) {
    this.name = _name;
  } // new 하면 자동 실행 리턴은 인스턴스
}

const who: Student = new Student("홍길동");
console.log(who.name);
const whoGo: Student = new Student("고길동");
console.log(whoGo.name);
```

```js
class Student {
  readonly name: string; // 초기화 이후 변경 불가
  constructor(_name: string) {
    this.name = _name;
  } // new 하면 자동 실행 리턴은 인스턴스
}

const who: Student = new Student("홍길동");
console.log(who.name);
who.name = "농땡이"; // 오류 발생

```

- 클래스의 속성을 제어하기
  : 상세하게 속성을 제어하기

```js
class Student {
  readonly name: string; // 초기화 이후 변경 불가
  // 상세하게 속성(age)을 제어하겠다.
  private _age: number;
  // age 의 내용을 읽기
  get age(): number {
    return this._age;
  }
  // age 의 내용을 쓰기
  set age(value: number) {
    if (value < 0) {
      throw new Error("0 보다 큰 숫자를 입력하세요.");
    }
    this._age = value;
  }

  constructor(_name: string, _value: number) {
    this.name = _name;
    this._age = _value;
  } // new 하면 자동 실행 리턴은 인스턴스
}

const who: Student = new Student("홍길동", 20);
console.log(who.name);
//who.name = "농땡이"; // 오류 발생

// getter 를 실행한다.
console.log(who.age);

// setter 를 실행한다.
who.age = "나이가 궁금하니?"; // 타입에러
who.age = "100"; // 타입에러
who.age = -5; // 코드 에러가 아니라 조건문에서 에러
who.age = 20; // 정상

```

- Abstract Calss (추상 클래스)
  : 마치 interface 를 implements (구현) 하는 것과 비슷하다.

```js
  // abstract 속성을 한개라도 가지고 있는 클래스는 반드시 abstact 를 작성해야 함.
  abstract class Person {
    abstract cry(): void;
    say(): void {
      console.log("말을 한다.");
    }
  }

  class Student extends Person {
    cry(): void {
      console.log("울어요");
    }
  }

  const who: Student = new Student();
  who.say();
```

### 2.6. 제네릭

- 주로 컴포넌트에 활용하며 다양한 타입을 `동적`으로 정의한다.

```js
function show(value) {
  return value;
}
show("안녕");
show(5);
show(true);

function showA(value: string | number | boolean): string | number | boolean {
  return value;
}
show("안녕");
show(5);
show(true);

interface IValue {
  value: string | number | boolean;
}
function showB(value: IValue): string | number | boolean {
  return value.value;
}
show("안녕");
show(5);
show(true);

```

- 동적으로 `타입을 주입`한다.

```js
function show<T>(value: T): T {
  return value;
}
show<string>("안녕");
show<number>(5);
show<boolean>(true);
```

```js
function show<T>(value: T): T {
  console.log(value.length); // 오류 발생
  return value;
}
show<string>("안녕");
show<number>(5);
show<boolean>(true);
```

- 아래는 풀이해보았다.

```js
function show<T>(value: Array<T>): Array<T> {
  console.log(value.length);
  return value;
}
show<string>(["안녕"]);
show<number>([5]);
show<boolean>([true]);
```

- 제네릭 인터페이스

```js
function show<T>(value: T): T {
  return value;
}
const str:string = show<string>("안녕");
const num:number = show<number>(5);
const isLogin:boolean = show<boolean>(true);
```

```js
interface IValue<T> {
  (value: T): T;
}

function show<T>(value: T): T {
  return value;
}

// 아래는 함수가 동적으로 만들어짐
const str: IValue<string> = show;
const num: IValue<number> = show;
const isLogin: IValue<boolean> = show;

// 함수를 활용함.
const r: string = str("안녕");
const n: number = num(5);
const i: boolean = isLogin(false);
```

- 제네릭 클래스

```js
class Test<T> {
  pi: T;
  add: (x: T, y: T) => T;

  // 생성자에서 초기화
  constructor(pi: T, add: (x: T, y: T) => T) {
    this.pi = pi;
    this.add = add;
  }
}

// Test 클래스의 인스턴스 생성
const result = new Test<number>(3.14, (x, y) => x + y);

console.log(result.pi); // 3.14 출력
console.log(result.add(1, 2)); // 3 출력
```

### 2.7. 타입 별칭(Type alias)

- 타입에다가 이해하기 좋은 이름을 붙인다.
- interface 와는 다르게 const 변수 처럼 생각하자.
  : const 를 재정의 하지 못하는 것과 같은 패턴이다.
  : 형식이 할당(=) 형태로 된다.

```js
type NickName = string;
type NickName = boolean;
```

#### 2.7.1. 특정한 타입을 설명하기 위한 용도로 작성

```js
const b:string = "홍길동";

type NickName = string;
const a:NickName = "홍길동";
```

#### 2.7.2. 주용도는 타이핑을 줄여주는 용도

```js
// union 을 활용
function say(title: string | number | boolean | undefined | null): void {
  console.log(title);
}

// type alias
type AllType = string | number | boolean | undefined | null;

function sayAll(title: AllType) {
  console.log(title);
}

```

#### 2.7.3. Type alias 와 interface 구분

- 작성법의 차이

```js
interface IPerson {
  name: string;
  age: number;
}

type TPerson = {
  name: string;
  age: number;
};

let i: IPerson;
let t: TPerson;
```

- 유니온 ( | )

```js
type Person = {
  name: string;
  age: number;
};
type Student = {
  name: string;
  age: number;
  school: string;
};

type Member = Person | Student;

const a: Member = {
  name: "hong",
  age: 10,
};

const b: Member = {
  name: "hong",
  age: 10,
  school: "green",
};

```

- 인터셉션 ( & )

```js
type Person = {
  name: string;
  age: number;
};
type Student = {
  name: string;
  age: number;
  school: string;
};

type Member = Person & Student;
/*
    Memmber = {
        name: string;
        age: number;
        school: string;
    }
*/
// 아래 코드는 타입의 필수 키(school) 가 누락 되었으므로
const a: Member = {
  name: "hong",
  age: 10,
};

const b: Member = {
  name: "hong",
  age: 10,
  school: "green",
};
```

- 확장의 차이
  : interafce 인 경우

```js
 interface IPerson {
  name: string;
  age: number;
}
const b:IPerson = {
    name: "hong",
    age: 10,
}

interface IStudent extends IPerson {
  school: string;
}

const a:IStudent = {
    name: "hong",
    age: 10,
    school: "green"
}
```

- interafce 주의 사항

```js
interface IPerson {
  name: string;
  age: number;
}

interface IPerson  {
  school: string;
}

const a:IPerson = {
    name: "hong",
    age: 10,
    school: "hong",
}

```

: type 인 경우

```js
type TPerson = {
  name: string;
  age: number;
}

const b:TPerson = {
    name: "hong",
    age: 10,
}

type TStudent = {
  school: string;
}

type Now = TPerson & TStudent

const a:Now = {
    name: "hong",
    age: 10,
    school: "green"
}
```

### 2.8. Class 문법의 이해

```js
// 객체를 생성하는 방법 몇가지?
// 객체 리터럴 = {}
// 함수  function A() {}   new A()
// 클래스 class A {}       new A()
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.say = function () {
  console.log("안녕");
};

const who = new Person("hong", 10);
who.name;
who.age;
Person.say();

// Class 로 변환
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  static say() {
    console.log("안녕");
  }
}

const who = new Person("hong", 10);
who.name;
who.age;
Person.say();
```

- 확장(상속)

```js
// Class 로 변환
class Person {
    // 인스턴스(new 활용 결과물) 의 속성
    name:string;
    age: number;
    // new 하면 자동 실행 (인스턴스 생성자)
    // 딱 1번만 실행이되요.
    constructor(name:string, age:number) {
        this.name = name;
        this.age = age;
    }
    // 클래스 메서드 (Static 메소드)
    static say() {
        console.log("안녕");
    }
}
// 확장
class Gamer extends Person {

}

const who = new Gamer("hong", 10);
who.name;
who.age;
Person.say();
```

- 접근을 제어할 수 있다. (접근제어자)
  : public 은 아무나 사용하세요.
  : protected 는 extends 된 경우 사용
  : private 는 아무도 사용 못해

```js
// Class 로 변환
class Person {
  // 인스턴스(new 활용 결과물) 의 속성
  public name: string;
  public age: number;
  private blood: string;
  protected money: number;
  // new 하면 자동 실행 (인스턴스 생성자)
  // 딱 1번만 실행이되요.
  constructor(name: string, age: number, blood: string, money: number) {
    this.name = name;
    this.age = age;
    this.blood = blood;
    this.money = money;
  }
  // new 해서 만들어지는 인스턴스 메서드
  public hi() {
    console.log("반가워");
  }
  // 클래스 메서드 (Static 메소드)
  public static say() {
    console.log("안녕");
  }
}
// 확장
class Gamer extends Person {
  work: string;
  constructor(
    name: string,
    age: number,
    blood: string,
    money: number,
    work: string,
  ) {
    super(name, age, blood, money);
    this.money = -5000;
    this.work = work;
  }
}

const who: Gamer = new Gamer("hong", 10, "A", 500, "LOL");
who.name;
who.age;
// who.blood = "O" // private 라서 에러
who.hi();
//who.money = -5000; // protected 라서 에러
Person.say();

// 확장
class Singer extends Person {
  job: string;
  constructor(
    name: string,
    age: number,
    blood: string,
    money: number,
    job: string,
  ) {
    super(name, age, blood, money);
    this.money = -5000;
    this.job = job;
  }
}

const go: Singer = new Singer("hong2", 10, "B", 1500, "아이유");

function Show(wo: Person) {
  if (wo instanceof Singer) {
    console.log("Singer: " + wo.job);
  } else if (wo instanceof Gamer) {
    console.log("Gamer: " + wo.work);
  } else {
    console.log("Person: " + wo.name);
  }
}

Show(who);
Show(go);
```

### 2.9. type assertion(타입 덮어쓰기)

- as 타입을 강제화시킨다.
- 점진적으로 js 에서 ts 로 변경시 활용.
- as 를 사용하시면 vscode 에서 체크 안함.

```js
const age = 10 as number;
```

- 오류 코드

```js
const hong = {};
hong.age = 10;
hong.name = "길동";
```

```js
interface Person {
  age: number;
  name: string;
}

const hong: Person = {} as Person;
hong.age = 10;
hong.name = "길동";
```

```js
function getPk(pk: any): any {
  return pk;
}

const go:number = getPk(5) as number;
const jj:string = getPk("5") as string;
```

### 2.10. Type Gard (타입가드)

- 알면 좋겠다.
- 타입의 범위를 줄인다.
- 여러개의 타입이 지정된 경우에 본인이 원하는 타입으로 지정
- 샘플

```js
function say(input: number | string | boolean): void {
  if (typeof input === "number") {
    return;
  }
  if (typeof input === "string") {
    return;
  }
  if (typeof input === "boolean") {
    return;
  }
}
```

#### 2.10.1. 타입가드 문법

- `typeof`
  : 데이터 종류를 문자열로 확인 후 처리
  : `string, number, boolean, object, function`
  : `console.log(typeof 변수)`

```js
consle.log(typeof 10);
consle.log(typeof "hello");
consle.log(typeof []); // object
consle.log(typeof {}); // object
consle.log(typeof function () {}); // function
```

- `instanceof`
  : 객체의 원본을 비교 확인 후 처리

```js
function Person(name: string, age: number) {
  this.name = name;
  this.age = age;
}

const user = new Person("홍길동", 10);
console.log( user instanceof Person); // true

const go = {name:"둘리", age: 100000);
console.log( go instanceof Person); // false
```

```js
class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

const user = new Person("홍길동", 10);

function showInfo(data: number | Person) {
  if (data instanceof Person) {
    // Person 인스터스 구나
  } else {
    // 숫자구나
  }
}

showInfo(1000);
showInfo(user);
```

- `in`
  : 객체의 속성을 비교 확인 후 처리

```js
const Person = {
  name: "홍길동",
  age: 10,
};

console.log("name" in Person); // true
console.log("age" in Person); // true
console.log("job" in Person); // false
```

```js
interface Person {
  name: string;
  age: number;
}
interface Gamer {
  name: string;
  level: number;
}

function showInfo(who: Person | Gamer) {
  // 타입가드를 적용해 보자.
  if ("name" in who) {
    // 타입가드 역할 못함
  }
  if ("age" in who) {
    // 타입가드 역할
  }
  if ("level" in who) {
    // 타입가드 역할
  }
}
```

```js
interface Person {
  name: string;
  age: number;
}
// 본인 이 추가
interface Person {
  part: "person";
}

interface Gamer {
  name: string;
  age: number;
}
// 본인 이 추가
interface Gamer {
  part: "gamer";
}

function showInfo(who: Person | Gamer) {
  // 타입가드를 적용해 보자.
  if (who.part === "gamer") {
    // 타입가드 역할
  }
  if (who.part === "person") {
    // 타입가드 역할
  }
}
```

```js
interface Person {
  name: string;
  age: number;
}
interface Gamer {
  name: string;
  age: number;
}

function showInfo(who: Person | Gamer, type: number) {
  // 타입가드를 적용해 보자.
  if (type === 1) {
    // 타입가드 역할
  }
  if (type === 2) {
    // 타입가드 역할
  }
}
const a:Person = {age:10, name:"hong"}
showInfo(a, 1)

const b:Gamer = {age:10, name:"gamer"}
showInfo(a, 2)
```

- `is`
  : 함수의 리턴타입에 대해서 가드처리
  : 주로 객체 유니언 타입 중 하나를 구분하는데 사용

```js
interface Person {
  name: string;
  age: number;
}

interface Gamer {
  name: string;
  level: number;
}

function isPerson(who: Person | Gamer): who is Person {
  return (who as Person).age !== undefined;
}
```

### 2.11. 유틸리티 타입

- 외부 또는 다른 개발자가 정의한 타입들을 고치지 않고 사용하는 법.
- 이미 만든 타입을 구조를 고치지 않고 재사용하는 법.

#### 2.11.1. Pick

- 특정 타입의 속성을 뽑아서 새로운 타입을 만들어 낼 때 사용
- `Pick<대상타입, "대상 타입의 속성 이름" | "대상 타입의 속성 이름"> `

```js
interface Person {
  name: string;
  age: number;
  id: string;
}

type Profile = Pick<Person, "id" | "age">;

const who: Profile = {
  id: "go",
  age: 100,
};
```

#### 2.11.2. Omit

- 특정 타입의 속성 중에 원하지 않는 속성을 제외하고
- 나머지 속성으로 새로운 타입을 생성.
- `Omit<대상타입, "대상 타입의 속성 이름" | "대상 타입의 속성 이름"> `

```js
interface Person {
  name: string;
  age: number;
  id: string;
}

type Profile = Omit<Person, "id" | "age">;

const who: Profile = {
  name: "이름",
};
```

#### 2.11.3. Partial

- 특정 타입의 모든 속성을 옵셔널 속성으로 변환한 타입 생성
- 주 용도는 필수 속성이 아니도록 강제 셋팅
- `Partial<대상타입>`

```js
interface Person {
  name: string;
  age: number;
  id: string;
}

type Profile = Partial<Person>;
/*
type Profile = {
    name?: string | undefined;
    age?: number | undefined;
    id?: string | undefined;
}
*/
const who: Profile = {
  name: "이름",
};
```

#### 2.11.4. Exclude

- 특정 타입의 유니언 타입을 구성하는 특정 타입을 제외한 새로운 타입을 만들때
- Pick, Omit, Partial 등은 모두 객체타입인데, Exclude 는 아니다.
- Exclude 는 유니언 타입을 변형한다.
- `Exclude<대상타입, "제거할 타입이름" | "제거할 타입이름">`

```js
type Language = "ko" | "en" | "ch" | "jp";
type Service = Exclude<Language, "ch" | "jp">;
// type Service = "ko" | "en"
```

#### 2.11.5. Record

- 특정 타입 1개를 속성명으로 설정하고
- 다른 타입 1개를 속성값으로 설정한
- 객체를 타입으로 리턴
- 실제 값을 변경하지는 않습니다.
- `Record<속성명타입, 속성값타입>`

```js
interface Person {
  name: string;
  age: number;
}
type Who = "a" | "b" | "c";

type NewType = Record<Who, Person>;
/*
    type NewType = {
        a: Person;
        b: Person;
        c: Person;
    }
*/

const members:NewType = {
    a: {name: "a", age:1},
    b: {name: "a", age:1},
    c: {name: "a", age:1},
}

```

### 2.12. 맵드 타입

- 기존에 작성된 타입을 이용해서 새로운 타입을 만들때 문법
- 유틸리티 타입은 모두 맵드 타입으로 생성된 것이다.

```js
interface Person {
  name: string;
  age: number;
}
type Who = "a" | "b" | "c";

type NewType = Record<Who, Person>;
/*
    type NewType = {
        a: Person;
        b: Person;
        c: Person;
    }
*/

const members:NewType = {
    a: {name: "a", age:1},
    b: {name: "a", age:1},
    c: {name: "a", age:1},
}
```

```js
....
// type NewType = Record<Who, Person>;

type NewType = {
  [Name in Who]: Person;
};
// 옵셔널 추가
type NewTypeOpt = {
  [Name in Who]?: Person;
};
// 옵셔널 제거
type NewTypeOpt = {
  [Name in Who]-?: Person;
};
....
```
