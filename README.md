# Component 문법(syntax)

## 1. 기본데이터 출력

```js
import "./App.css";
const App = () => {
  // js 자리
  const a = 1; // 숫자출력하기
  const b = "hello"; // 문자출력하기
  const c = true; // 참, 거짓을 이용한 출력하기
  const d = undefined; // 값이 없다고 명시적으로 표현
  const e = null; // 값이 비었다.
  const f = [1, 2, 3]; // 배열
  const g = { age: 15, name: "hong" }; // 객체 리터럴
  return (
    <>
      a: {a} <br />
      b: {b} <br />
      c: {c} <br />
      d: {d} <br />
      e: {e} <br />
      f: {f} {f[1]}
      <br />
      g: {g.age} {g.name} <br />
    </>
  );
};

export default App;
```

## 2. 함수 활용하기

```js
import "./App.css";
const App = () => {
  // 매개변수 없는 경우
  function say() {
    return "안녕";
  }
  // 화살표 함수
  const sayArrow = () => {
    return "안녕";
  };
  // 매개변수 있는 경우
  function hi(who) {
    return `안녕 ${who}`;
  }
  const hiArrow = who => {
    return `안녕 ${who}`;
  };

  return (
    <>
      {say()}
      <br />
      {hi("길동")}
      <br />
      {sayArrow()}
      <br />
      {hiArrow("길동")}
    </>
  );
};

export default App;
```

## 3. 조건문 활용하기

```js
import "./App.css";
const App = () => {
  const flag = true;
  const show = () => {
    if (flag) {
      return "참이군요";
    } else {
      return "거짓이군요";
    }
  };
  const showJSX = () => {
    if (flag) {
      return <div>참이군요</div>;
    } else {
      return <div>거짓이군요</div>;
    }
  };

  return (
    <>
      {show()}
      <br />
      {showJSX()}
      <br />
      {
        // JSX 는 만들어진 결과물만 보여주는 곳, 조건식을 사용할 수 없다.
        // if(flag) {
        //   참이군요
        // }else{
        //   거짓이군요
        // }
      }
      {
        // 조건에 따라서 내용을 별도로 구분해서 출력한다면 삼항연산자를 쓴다.
        flag ? "참이군요" : "거짓이군요"
      }
    </>
  );
};

export default App;
```

## 4. 조건문 활용하기 2.

- CSS 객체 만들기

```js
import "./App.css";
const App = () => {
  // 조건에 따른 CSS 객체생성하기
  const flag = true;
  const DivStyle = {
    color: flag ? "red" : "blue",
    fontWeight: flag ? "bold" : "normal",
  };

  return <div style={DivStyle}>스타일 적용</div>;
};

export default App;
```

- 조건에 따라서 클래스 적용하기

```js
const App = () => {
  // 조건에 따른 CSS 클래스 적용하기
  const flag = true;
  return <div className={flag ? "member" : "join"}>스타일 적용</div>;
};

export default App;
```

- 공백 조심하기

```js
import "./App.css";
const App = () => {
  // 조건에 따른 CSS 클래스 적용하기
  const flag = true;
  const loginType = "admin";
  return (
    // 클래스 명을 조건에 따라서 동적으로 추가할 때는 공백을 꼭!!! 확인하자
    <div className={flag ? "member " + loginType : "member"}>스타일 적용</div>
  );
};

export default App;
```

- if 문 말고 조건부 연산자 ( && || )

```js
import "./App.css";
const App = () => {
  const flag = true;
  return (
    <div>
      {/* { flag ? "환영합니다." : "" } */}
      {flag && "환영합니다"}
      {flag || "이건 현재 안나와요. "}
    </div>
  );
};

export default App;
```

- 객체의 속성이 있는지 if 문 말고 옵셔널체이닝
  : 객체 ?. 속성

```js
import "./App.css";
const App = () => {
  const member = {
    name: "hong",
    age: 15,
  };
  return (
    <div>
      이름 : {member.name} <br />
      나이 : {member.age} <br />
      취미 : {member.hobby ? member.hobby : "취미정보가 없어요"} <br />
      취미 : {member?.hobby || "취미정보가 없어요"} <br />
    </div>
  );
};

export default App;
```

## 5. 반복문 이해하기

```js
import "./App.css";
const App = () => {
  // 반복문의 대상은 주로 배열입니다.
  const todoList = ["a", "b", "c", "d"];
  // 화면 출력 JSX
  return (
    <>
      <h1>할일</h1>
      <ul>
        <li>{todoList[0]}</li>
        <li>{todoList[1]}</li>
        <li>{todoList[2]}</li>
        <li>{todoList[3]}</li>
      </ul>
    </>
  );
};

export default App;
```

- 배열.map 추천

```js
import "./App.css";
const App = () => {
  // 반복문의 대상은 주로 배열입니다.
  const todoList = ["a", "b", "c", "d"];
  const showList = () => {
    // 기초 코드
    for (let i = 0; i < todoList.length; i++) {
      const item = todoList[i];
      // console.log(item);
    }
    // 배열.forEach 를 시도
    const 결과 = todoList.forEach((item, index, arr) => {
      // console.log(item, index, arr);
      return item;
    });
    // 결론적으로 단순 반복 작업시 for 말고 forEach 사용
    // for 이든 forEach 이든 리턴 되는 결과는 직접 코딩해야 함.
    // 그래서 JSX 형태의 html 태그를 만들기 곤란

    // 배열의 요소를 필터링 하기
    const 선택결과 = todoList.filter((item, index, arr) => {
      // 조건이 참인 것들만 모아서 배열 만든다.
      if (item === "a" || item === "d") {
        return item;
      }
    });
    console.log(선택결과);
    const 선택결과2 = todoList.filter(
      (item, index, arr) => item === "a" || item === "d",
    );
    console.log(선택결과2);

    // JSX 에 배열을 대상으로 출력하는 반복문은 map 만 쓴다.
    const 태그결과 = todoList.map((item, index, arr) => {
      return <li key={index}>{item}</li>;
    });
    // 태그 결과 즉, map 은 최종 결과물들을 배열에 모아준다.
    return 태그결과;
  };
  // 화면 출력 JSX
  return (
    <>
      <h1>할일</h1>
      <ul>{showList()}</ul>
    </>
  );
};

export default App;
```

- 샘플 코드

```js
import "./App.css";
const App = () => {
  const feelData = [
    { icon: "1.svg", txt: "rad", color: "green" },
    { icon: "2.svg", txt: "good", color: "red" },
    { icon: "3.svg", txt: "meh", color: "blue" },
    { icon: "1.svg", txt: "bad", color: "hotpink" },
    { icon: "2.svg", txt: "awful", color: "gold" },
  ];

  const FeelCate = {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  };
  const FeelIcon = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center",
    "text-transform": "uppercase",
  };

  return (
    <>
      <ul style={FeelCate}>
        {feelData.map((item, index) => {
          return (
            <li key={index} style={FeelIcon}>
              <img src={item?.icon} alt={item?.txt} />
              <span style={{ color: item?.color }}>{item?.txt}</span>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default App;
```

```js
import "./App.css";
const App = () => {
  const feelData = [
    { icon: "1.svg", txt: "rad", color: "green" },
    { icon: "2.svg", txt: "good", color: "red" },
    { icon: "3.svg", txt: "meh", color: "blue" },
    { icon: "1.svg", txt: "bad", color: "hotpink" },
    { icon: "2.svg", txt: "awful", color: "gold" },
  ];

  const FeelCate = {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  };
  const FeelIcon = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center",
    "text-transform": "uppercase",
  };

  const showFeel = () => {
    const result = feelData.map((item, index) => {
      return (
        <li key={index} style={FeelIcon}>
          <img src={item?.icon} alt={item?.txt} />
          <span style={{ color: item?.color }}>{item?.txt}</span>
        </li>
      );
    });

    return result;
  };

  return (
    <>
      <ul style={FeelCate}>{showFeel()}</ul>
    </>
  );
};

export default App;
```

## 6. 이벤트의 이해

- 기본 : onClick, onChange, onSubmit

### 6.1. onClick

- 반드시 카멜케이스로 작성한다.

```js
 onClick={() => {
    하고 싶은일
 }}
```

```js
import "./App.css";
const App = () => {
  let count = 0;
  return (
    <>
      <button
        onClick={() => {
          count++;
          alert(count);
        }}
      >
        클릭
      </button>
    </>
  );
};

export default App;
```

- 이벤트에서 실행할 내용들은 별도 함수 작성 권장

```js
import "./App.css";
const App = () => {
  let count = 0;
  const showCount = () => {
    count++;
    alert(count);
  };
  return (
    <>
      <button
        onClick={() => {
          showCount();
        }}
      >
        클릭
      </button>
    </>
  );
};

export default App;
```

### 6.2. onChange

- form 태그에서 사용자가 내용을 변경한 경우 처리이벤트

```js
import React from "react";

const App = () => {
  return (
    <div>
      <form action="/path" method="get">
        <fieldset>
          <legend>회원가입</legend>
          <label htmlFor="user">아이디</label>
          <input
            type="text"
            name="user"
            id="user"
            placeholder="아이디 입력해주세요."
          />
          <input type="button" name="idcheck" value="중복확인" />
          <br />
          <label htmlFor="pw">비밀번호</label>
          <input type="password" name="pw" id="pw" />
          <br />
        </fieldset>

        <fieldset>
          <legend>정보입력</legend>
          <label htmlFor="age">나이</label>
          <input type="number" name="age" id="age" />
          <br />
          <label htmlFor="gm">남성</label>
          <input type="radio" name="gender" value="m" id="gm" checked={true} />
          <label htmlFor="gf">여성</label>
          <input type="radio" name="gender" value="f" id="gf" />

          <br />
          <label htmlFor="js">JS</label>
          <input type="checkbox" name="js" id="js" />
          <label htmlFor="css">CSS</label>
          <input type="checkbox" name="css" id="css" />
          <label htmlFor="html">HTML</label>
          <input type="checkbox" name="html" id="html" />
          <br />
          <label htmlFor="level">성적등급</label>
          <select name="level" id="level">
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
          <br />
          <label htmlFor="file">파일첨부</label>
          <input type="file" name="file" id="file" />
          <br />
          <label htmlFor="etc">기타사항</label>
          <textarea name="etc" id="etc"></textarea>
        </fieldset>

        <fieldset>
          <legend>버튼들</legend>
          <input type="reset" value="다시작성" />
          <input type="submit" value="작성완료" />
          <button type="button">버튼 작성 완료</button>
          <input type="image" src="images/a.jpg" />
        </fieldset>
      </form>
    </div>
  );
};

export default App;
```

- 폼 이벤트 값

```js
const App = () => {
  return (
    <div>
      <form action="/path" method="get">
        <fieldset>
          <legend>회원가입</legend>
          <label htmlFor="user">아이디</label>
          <input
            type="text"
            name="user"
            id="user"
            placeholder="아이디 입력해주세요."
            onChange={e => {
              console.log(e.type);
              console.log(e.target);
              console.log(e.target.value);
            }}
          />
          <input type="button" name="idcheck" value="중복확인" />
          <br />
          <label htmlFor="pw">비밀번호</label>
          <input
            type="password"
            name="pw"
            id="pw"
            onChange={e => {
              console.log(e.type);
              console.log(e.target);
              console.log(e.target.value);
            }}
          />
          <br />
        </fieldset>

        <fieldset>
          <legend>정보입력</legend>
          <label htmlFor="age">나이</label>
          <input
            type="number"
            name="age"
            id="age"
            onChange={e => {
              console.log(e.type);
              console.log(e.target);
              console.log(e.target.value);
            }}
          />
          <br />
          <label htmlFor="gm">남성</label>
          <input
            type="radio"
            name="gender"
            value="m"
            id="gm"
            checked={true}
            onClick={e => {
              console.log(e.type);
              console.log(e.target);
              console.log(e.target.value);
            }}
          />
          <label htmlFor="gf">여성</label>
          <input
            type="radio"
            name="gender"
            value="f"
            id="gf"
            onClick={e => {
              console.log(e.type);
              console.log(e.target);
              console.log(e.target.value);
            }}
          />

          <br />
          <label htmlFor="js">JS</label>
          <input
            type="checkbox"
            name="js"
            id="js"
            onClick={e => {
              console.log(e.type);
              console.log(e.target);
              console.log(e.target.value);
            }}
          />
          <label htmlFor="css">CSS</label>
          <input
            type="checkbox"
            name="css"
            id="css"
            onClick={e => {
              console.log(e.type);
              console.log(e.target);
              console.log(e.target.value);
            }}
          />
          <label htmlFor="html">HTML</label>
          <input
            type="checkbox"
            name="html"
            id="html"
            onClick={e => {
              console.log(e.type);
              console.log(e.target);
              console.log(e.target.value);
            }}
          />
          <br />
          <label htmlFor="level">성적등급</label>
          <select
            name="level"
            id="level"
            onChange={e => {
              console.log(e.type);
              console.log(e.target);
              console.log(e.target.value);
            }}
          >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
          <br />
          <label htmlFor="file">파일첨부</label>
          <input
            type="file"
            name="file"
            id="file"
            onChange={e => {
              console.log(e.type);
              console.log(e.target);
              console.log(e.target.value);
            }}
          />
          <br />
          <label htmlFor="etc">기타사항</label>
          <textarea
            name="etc"
            id="etc"
            onChange={e => {
              console.log(e.type);
              console.log(e.target);
              console.log(e.target.value);
            }}
          ></textarea>
        </fieldset>

        <fieldset>
          <legend>버튼들</legend>
          <input type="reset" value="다시작성" />
          <input type="submit" value="작성완료" />
          <button type="button">버튼 작성 완료</button>
          <input type="image" src="images/a.jpg" />
        </fieldset>
      </form>
    </div>
  );
};

export default App;
```

- 폼 필드의 값을 처리하는 handler함수 생성 권장

```js
const App = () => {
  const handleChangeForm = e => {
    console.log(e.type);
    console.log(e.target);
    console.log(e.target.name);
    console.log(e.target.value);
  };
  return (
    <div>
      <form action="/path" method="get">
        <fieldset>
          <legend>회원가입</legend>
          <label htmlFor="user">아이디</label>
          <input
            type="text"
            name="user"
            id="user"
            placeholder="아이디 입력해주세요."
            onChange={e => {
              handleChangeForm(e);
            }}
          />
          <input type="button" name="idcheck" value="중복확인" />
          <br />
          <label htmlFor="pw">비밀번호</label>
          <input
            type="password"
            name="pw"
            id="pw"
            onChange={e => {
              handleChangeForm(e);
            }}
          />
          <br />
        </fieldset>

        <fieldset>
          <legend>정보입력</legend>
          <label htmlFor="age">나이</label>
          <input
            type="number"
            name="age"
            id="age"
            onChange={e => {
              handleChangeForm(e);
            }}
          />
          <br />
          <label htmlFor="gm">남성</label>
          <input
            type="radio"
            name="gender"
            value="m"
            id="gm"
            checked={true}
            onClick={e => {
              handleChangeForm(e);
            }}
          />
          <label htmlFor="gf">여성</label>
          <input
            type="radio"
            name="gender"
            value="f"
            id="gf"
            onClick={e => {
              handleChangeForm(e);
            }}
          />

          <br />
          <label htmlFor="js">JS</label>
          <input
            type="checkbox"
            name="js"
            id="js"
            onClick={e => {
              handleChangeForm(e);
            }}
          />
          <label htmlFor="css">CSS</label>
          <input
            type="checkbox"
            name="css"
            id="css"
            onClick={e => {
              handleChangeForm(e);
            }}
          />
          <label htmlFor="html">HTML</label>
          <input
            type="checkbox"
            name="html"
            id="html"
            onClick={e => {
              handleChangeForm(e);
            }}
          />
          <br />
          <label htmlFor="level">성적등급</label>
          <select
            name="level"
            id="level"
            onChange={e => {
              handleChangeForm(e);
            }}
          >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
          <br />
          <label htmlFor="file">파일첨부</label>
          <input
            type="file"
            name="file"
            id="file"
            onChange={e => {
              handleChangeForm(e);
            }}
          />
          <br />
          <label htmlFor="etc">기타사항</label>
          <textarea
            name="etc"
            id="etc"
            onChange={e => {
              handleChangeForm(e);
            }}
          ></textarea>
        </fieldset>

        <fieldset>
          <legend>버튼들</legend>
          <input type="reset" value="다시작성" />
          <input type="submit" value="작성완료" />
          <button type="button">버튼 작성 완료</button>
          <input type="image" src="images/a.jpg" />
        </fieldset>
      </form>
    </div>
  );
};

export default App;
```

- 리액트에서는 데이터 전송은 axios활용

```html
<form action="/path" method="get"></form>
아래 권장
<form></form>
```

### 6.3. form 버튼 처리 주의사항

#### 6.3.1 `<button>중복확인</button>`

- 만약 form 태그안에 배치되면 onSubmit 됩니다.
- 아래 처럼 변형됩니다.

```html
<form>
  <button type="submit">중복확인</button>
</form>
```

- 직접 고치셔야 합니다. !!!!

```html
<form>
  <button type="button">중복확인</button>
</form>
```

- form 태그 바깥이라면 일반 버튼
- 아니면 아래 코드 처럼 작성
  : `<input type="button" value="중복확인" />`

### 6.4. form 데이터 전송 이벤트 처리

```js
  <legend>버튼들</legend>
  <input type="reset" value="다시작성" />
  <input type="submit" value="작성완료" />
  <button type="submit">버튼 작성 완료</button>
  <input type="image" src="images/a.jpg" />
```

```js
const handleSubmit = e => {
  // 반드시 처리한다. 기본기능 막는다.
  // 데이터 유효성 검증을 위해서 막음.
  e.preventDefault();
};

<form
  onSubmit={e => {
    handleSubmit(e);
  }}
>
  ............. ............. .............
</form>;
```
