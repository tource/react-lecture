import React, { useCallback, useMemo, useState } from "react";

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
  // 현재 복잡한 연산에 의한 결과   값을 추출했다.
  const complexFn = useMemo(() => {
    console.log("복잡한 연산");
    let result = 0;
    for (let i = 0; i < 100000000; i++) {
      result = result + 1;
    }
    return result + count;
  }, [count]);

  // 아래 코드는 state 가 바뀌면 다시 handleChange 함수를 만든다.
  // 리랜더링시 함수를 다시 정의할 필요가 없다.
  const handleChange = useCallback(e => {
    setValue(e.target.value);
  }, []);

  // const handleChange = e => {
  //   setValue(e.target.value);
  // };

  const handleAdd = useCallback(() => {
    setCount(pre => pre + 1);
  }, []);
  // const handleAdd = () => {
  //   setCount(pre => pre + 1);
  // };

  // 아래의 코드는 주의해야 한다.
  // const onClickState = useCallback(() => {
  //   setCountState(countState + 1);
  //   console.log("====> countState ", countState);
  // }, []);

  const [countState, setCountState] = useState("");

  // 해결책.(state 값이 바뀌면 함수 다시 생성)
  const onClickState = useCallback(() => {
    // setCountState(countState + 1);
    // state 갱신 함수 적용
    setCountState(prev => prev + 1);
    console.log("====> countState ", countState);
  }, [countState]);

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
      <h2>useCallback 샘플</h2>
      <button
        onClick={() => {
          onClickState();
        }}
      >
        버튼 테스트
      </button>
    </div>
  );
};

export default UseMemoPage;
