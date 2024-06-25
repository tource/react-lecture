# state

- 일반적으로 state 라는 단어는 앱의 현재 상태 즉, 화면의 상태를 말함.
- 하지만, 우리는 state를 앱이 보관하고 있고, 보여주고 있는 변수를 말한다고 봄.
- state의 종류는 2가지라고 보면 좋겠다.
  : 각 컴포넌트가 가지고 있는 state는 useState를 활용
  : 전체(글로벌)에 반영되는 state는 Constext API, Redux-tool-kit, Recoil ...

## 1. 컴포넌트 state 관리 및 표현

### 1.1. 일반 변수일 경우

- 일반변수가 값이 변경이 되면 해당 컴포넌트에 값은 바뀐다.
- 하지만 하위 즉, 포함된 자식 컴포넌트는 값이 변한지 모른다.
- 그래서, 출력 결과가 변하지 않는다.
- 그렇다면, 자식 컴포넌트는 새로 반영을 하는 조건이 있지 않을까?
- 자식 컴포넌트에 새로운 값을 반영하려면 아래의 2가지 조건 중 만족이 되어야 함.
  : 엄마 즉, 자식을 가지고 있는 컴포넌트가 새로 고침이 되어야 한다.
  : 자식 컴포넌트에 상태가 변경되었다고 알려야 한다.
- 일반 변수는 컴포넌트가 새로고침이 되는 조건에 부합하지 않기때문에 갱신안됨

### 1.2. useState 변수일 경우

- 새로 랜더링 되므로 자식도 같이 새로 고침이 된다.
- 화면이 변경된다.
- 참고 사항
  : JS 가 새로 실행되지만 값은 보관(클로저)하고 있다.
  : 클로저는 함수가 종료되어도 함수 내부의 값을 유지하는 것을 말한다.
- 개선 사항
  : 리랜더링 되지 않아도 되는 컴포넌트 조차 새로 그려지는 단점.
  : 성능 이슈가 발생한다.

## 2. 컴포넌트용 state 사용시 어려운점

- setState(새로운값)을 진행하고, 같은 블록에서 참조하면 예전값이 보인다.
- 이유는 state가 함수가 종료되면 값이 변하는 closer라서

```js
const changeLogin = () => {
  setLogin(!login);
  console.log("현재 login : ", login);
};
```

- 값이 정상적으로 변경되었는지 꼭 디버깅을 해보시길 추천합니다.

```js
useEffect(() => {
  console.log("Home 이 새로고침 되니? USE-EFFECT", login);
}, []);
```

## 3. 연속으로 set을 진행하는 경우는 주의

- 연속으로 여러번 동시에 set으로 업데이트 하는 경우.
- useState는 비동기이므로 원하지 않는 결과가 나온다.
- 전제 조건은 연속으로 set을 실행할 경우.

- 시나리오
  : 사용자가 만약 상품 1개가 아닌 4개를 선택했다.
  : 우리는 상품개수를 1개씩 처리할거라 예상했다.
  : 그래서, const [count, setCount] = useState(0);
  : 사용자가 장바구니에 담을 때 setCount를 실행한다.
  : 담은 개수를 {count}를 출력했다. 그런데?

```js
const changeLogin = () => {
  // setLogin(!login);
  setCount(count++);
  setCount(count++);
  setCount(count++);
  setCount(count++);

  // console.log("현재 login : ", login);
  console.log("현재 count : ", count);
};
```

- 연속으로 set을 실행하는 경우 업데이트 함수를 활용한다.

```js
const changeLogin = () => {
  // setLogin(!login);
  // useState는 비동기 방식으로 처리된다.
  // 업데이트 함수 활용
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);

  // console.log("현재 login : ", login);
  console.log("현재 count : ", count);
};
```
