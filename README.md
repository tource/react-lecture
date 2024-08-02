# Memoization(메모이제이션)

- 면접볼때 물어봅니다.
  : 기본문법을 물어보지는 않습니다.
  : 프로젝트의 성능최적화를 어떻게 하셨습니까?
  : `Memoization을 적용하였습니다.`
  : `useMemo, useCallback, memo 를 활용하여서 불필요한 리랜더링을 줄였습니다`
  : `Suspense` 를 활용해서 동적 로딩을 했다.
  : useMemo 는 `값`을 리랜더링 되더라도 보관해한다.
  : useCallback 은 함수를 리랜더링 되더라도 보관해둔다.
  : memo 는 컴포넌트를 조건에 따라서 리랜더링 또는 제외한다.

## useMemo()

- 기본형 ( useEffect 처럼 )
  : 값을 연산에 의해서 하나만 만들어내고 보관(갱신 X)

```js
const 변수 = useMemo(() => {
  return 값;
}, []);
```

- 필요한 경우 복잡한 연산 진행 결과보관 (갱신)

```js
const 변수 = useMemo(() => {
  return 값;
}, [state변수, useParam 등등등]);
```

- 리액트에서는 state 가 바뀌면 다시 컴포넌트 내부 코드를 재실행한다.
- 필요에 의해서 복잡한 연산을 하는 코드도 무조건 다시 실행된다.
- 복잡한 연산이 일어나면 컴포넌트를 그리는데 시간이 걸린다.
- 느리게 작동하는 서비스는 사용자가 꺼린다.
- 필요로 한 경우에만 새로 연산을 하도록 하는 방안이 useMemo 이다.
- 더불어서, 초기화의 대상에서 제외하는 방안이 useMemo 이다.

- use 즉 Hook 은 메모를 하고 있었다.
- 변수를 메모한다. (새로 만들지 않고 보관해 둔다.)
- /src/pages/UseMemoPage.js 생성
- 아래코드는 복잡한 연산을 하는 경우의 샘플

```js
import React, { useState } from "react";

const UseMemoPage = () => {
  console.log("화면이 랜더링 되었습니다.");
  const [count, setCount] = useState(0);
  const [value, setValue] = useState("");

  // 아주 복잡한 연산을 해서 결과를 받는 일반변수
  let normalValue = 0;
  let result = 0;
  for (let i = 0; i < 1000000000000; i++) {
    result = normalValue + 1;
  }

  const handleChange = e => {
    setValue(e.target.value);
  };
  const handleAdd = () => {
    normalValue = normalValue + result;
    console.log("일반변수 : ", normalValue);
    setCount(pre => pre + 1);
  };

  return (
    <div>
      <h1>useMemo샘플</h1>
      <input
        type="text"
        value={value}
        onChange={e => {
          handleChange(e);
        }}
      />
      <button
        onClick={() => {
          handleAdd();
        }}
      >
        증가
      </button>
      <p>Count: {count}</p>
    </div>
  );
};

export default UseMemoPage;
```

```js
import React, { useMemo, useState } from "react";

const UseMemoPage = () => {
  console.log("화면이 랜더링 되었습니다.");
  const [count, setCount] = useState(0);
  const [value, setValue] = useState("");
  // 하나의 값을 연산하고 보관하고 싶다.
  const age = useMemo(() => {
    const nowAge = 20;
    return nowAge + 10;
  }, []);

  // 아주 복잡한 연산을 해서 결과를 받는 일반변수
  const complexFn = useMemo(() => {
    console.log("복잡한 연산");
    let result = 0;
    for (let i = 0; i < 100000000; i++) {
      result = result + 1;
    }
    return result + count;
  }, [count]);

  const handleChange = e => {
    setValue(e.target.value);
  };
  const handleAdd = () => {
    setCount(pre => pre + 1);
  };

  return (
    <div>
      <h1>useMemo샘플</h1>
      <input
        type="text"
        value={value}
        onChange={e => {
          handleChange(e);
        }}
      />
      <button
        onClick={() => {
          handleAdd();
        }}
      >
        증가
      </button>
      <p>Count: {count}</p>
      <p>복잡한 연산값: {complexFn}</p>
    </div>
  );
};

export default UseMemoPage;
```

## useCallback()

- 함수를 리랜더링시 다시 만들지 않겠다.
- 기본형

```js
const 함수변수 = useCallback(() => {
  // 하고 싶은 일을 작성함.
}, []);
```

```js
const handleChange = useCallback(e => {
  setValue(e.target.value);
}, []);

const handleAdd = useCallback(() => {
  setCount(pre => pre + 1);
}, []);
```

- useState 용 변수는 다르게 판단하자.

```js
// 아래의 코드는 주의해야 한다.
// const onClickState = useCallback(() => {
//   setCountState(countState + 1);
//   console.log("====> countState ", countState);
// }, []);

// 해결책.(state 값이 바뀌면 함수 다시 생성)
const onClickState = useCallback(() => {
  // setCountState(countState + 1);
  // state 갱신 함수 적용
  setCountState(prev => prev + 1);
  console.log("====> countState ", countState);
}, [countState]);
```

## React.memo(컴포넌트)

- 자식 컴포넌트 리랜더링 최적화
- 부모가 props를 전달하는 경우라면 리랜더링 된다.
- /src/pages/Child.js 생성

```js
import React, { memo } from "react";

const Child = () => {
  console.log("===> 자식 컴포넌트 입니다.");
  return (
    <div style={{ border: "5px solid #000" }}>
      <h3>자식컴포넌트</h3>
    </div>
  );
};

export default memo(Child);
```
