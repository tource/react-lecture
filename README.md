# 회원기능

## 1. form 태그의 이해 및 활용

### 1.1. 컴포넌트 생성

- /src/pages/member/test.html

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>회원가입</title>
  </head>
  <body>
    <h1>입력양식(Form)</h1>
    <h2>회원가입</h2>
    <div class="join-wrap">
      <form
        action="/member/join.php"
        method="get"
        enctype="multipart/form-data"
      >
        <div class="form-group">
          <label for="name">이름</label>
          <input type="text" id="name" name="name" class="name" />
        </div>
        <div class="form-group">
          <label for="email">이메일</label>
          <input type="email" id="email" name="email" class="email" />
        </div>
        <div class="form-group">
          <label for="pw">비밀번호</label>
          <input type="password" id="pw" name="pw" class="pw" />
        </div>
        <div class="form-group">
          <label for="pwcheck">비밀번호확인</label>
          <input type="password" id="pwcheck" name="pwcheck" class="pwcheck" />
        </div>
        <div class="form-group">
          <label for="phone">전화번호</label>
          <input type="tel" id="phone" name="phone" class="phone" required />
        </div>
        <div class="form-group">
          <label for="address">주소</label>
          <input
            type="text"
            id="address"
            name="address"
            class="address"
            required
          />
        </div>
        <div class="form-group">
          <label for="address2">상세주소</label>
          <input
            type="text"
            id="address2"
            name="address2"
            class="address2"
            readonly
          />
        </div>
        <div class="form-group">
          <label for="birthday">생년월일</label>
          <input type="date" id="birthday" name="birthday" class="birthday" />
        </div>
        <div class="form-group">
          <label for="gender">성별</label>
          <select id="gender" name="gender" class="gender">
            <option value="">선택하세요.</option>
            <option value="male">남성</option>
            <option value="female">여성</option>
            <option value="other">기타</option>
          </select>
        </div>
        <div class="form-group">
          <label>취미생활</label>
          <div class="form-list">
            <input type="checkbox" id="hobby1" name="hobby" value="reading" />
            <label for="hobby1">독서</label>

            <input type="checkbox" id="hobby2" name="hobby" value="travling" />
            <label for="hobby2">여행</label>

            <input type="checkbox" id="hobby3" name="hobby" value="cooking" />
            <label for="hobby3">요리</label>

            <input type="checkbox" id="hobby4" name="hobby" value="sprots" />
            <label for="hobby4">운동</label>
          </div>
        </div>

        <div class="form-group">
          <label>학생여부</label>
          <div class="form-list">
            <input type="radio" id="student-yes" name="student" value="yes" />
            <label for="student-yes">예</label>

            <input type="radio" id="student-no" name="student" value="no" />
            <label for="student-no">아니오</label>
          </div>
        </div>
        <div class="form-group">
          <label for="profile-img">프로필 이미지</label>
          <input
            type="file"
            id="profile-img"
            name="profile"
            class="profile-img"
          />
        </div>
        <div class="form-group">
          <label for="memo">메모</label>
          <textarea id="memo" name="memo" rows="4" cols="50"></textarea>
        </div>

        <div class="form-group">
          <input type="submit" value="확인" />
          <button type="submit">submit 확인</button>
          <button type="button">button type 확인</button>
          <button>그냥 버튼 확인</button>
        </div>
      </form>
    </div>
  </body>
</html>
```

## 2. 회원가입

- /src/pages/member/Join.js

### 2.1. 컴포넌트에 html 마이그레이션

- React 문법에 맞게 class를 className으로 변경
- React 문법에 맞게 for를 htmlFor로 변경
- css 변경 불필요
- JS
  : html 태그를 찾으려고 useRef를 사용하는것은 비권장

```js
const joinName = document.querySelector(".join-name");
// 아래로 변경
const joinName = useRef(null);
// ref로 참조
<input type="text" name="join-name" className="join-name" ref={joinName} />;
// 사용시에는 current 활용
// joinName.current
```

### 2.2. JS 적용

- useState 변수 쓰자.
- onClick 사용
- onChange 사용
- event.preventDefault()로 웹브라우저 자동 갱신 막음.

```js
import { useEffect, useState } from "react";
import "../../css/member.css";
const Join = () => {
  const [joinName, setJoinName] = useState("");
  const [joinEmail, setJoinEmail] = useState("");
  // 회원가입시 처리할 함수
  const joinMember = event => {
    // 데이터를 최종적으로 전달하는 submit 실행시에는
    // 웹브라우저가 자동으로 갱신되므로 무조건 기본 기능을 막는다.
    event.preventDefault();
    console.log(joinName, joinEmail);
    setJoinEmail("");
    setJoinName("");
  };
  // 회원내용 재 작성 함수
  const joinReset = () => {
    setJoinEmail("");
    setJoinName("");
  };

  useEffect(() => {
    // 화면에 보일때 할일 작성
    // 일반 js 내용을 복사해서 넣고, React 스럽게 수정

    return () => {
      // cleanup 함수
      // 화면에서 사라질때 할일 작성
    };
  }, []);

  return (
    <div className="join-wrap">
      <form className="join-form">
        <div className="form-group">
          <label htmlFor="name">이름</label>
          <input
            type="text"
            value={joinName}
            onChange={event => {
              setJoinName(event.target.value);
              console.log(event.target.value);
            }}
            className="join-name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            value={joinEmail}
            onChange={event => {
              setJoinEmail(event.target.value);
              console.log(event.target.value);
            }}
            className="join-email"
          />
        </div>
        <div className="form-group">
          <button
            type="submit"
            className="bt-submit"
            onClick={event => {
              joinMember(event);
            }}
          >
            회원가입
          </button>
          <button
            type="reset"
            className="bt-cancel"
            onClick={() => {
              joinReset();
            }}
          >
            재작성
          </button>
        </div>
      </form>
    </div>
  );
};

export default Join;
```

### 2.3. 응용

```js
import { useEffect, useState } from "react";
import "../../css/member.css";
import axios from "axios";
const Join = () => {
  // 입력할 항목 변수
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  const [userPass2, setUserPass2] = useState("");
  const [userName, setUserName] = useState("");

  // 회원가입시 처리할 함수
  const joinMember = event => {
    // 데이터를 최종적으로 전달하는 submit 실행시에는
    // 웹브라우저가 자동으로 갱신되므로 무조건 기본 기능을 막는다.
    event.preventDefault();
    // console.log(userEmail, userPass, userName);

    const sendData = {
      id: userEmail,
      pwd: userPass,
      name: userName,
      email: userEmail,
    };
    postUser(sendData);
  };

  // 월요일 apis 폴더에 memberapi.js 만들고 axios 관련 컨벤션
  const postUser = async ({ id, pwd, name, email }) => {
    try {
      const response = await axios.post("/api/user", { id, pwd, name, email });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // 회원내용 재 작성 함수
  const joinReset = () => {
    setUserEmail("");
    setUserPass("");
    setUserPass2("");
    setUserName("");
  };

  useEffect(() => {
    // 화면에 보일때 할일 작성
    // 일반 js 내용을 복사해서 넣고, React 스럽게 수정

    return () => {
      // cleanup 함수
      // 화면에서 사라질때 할일 작성
    };
  }, []);

  return (
    <div className="join-wrap">
      <form className="join-form">
        {/* 사용자 이메일 */}
        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            value={userEmail}
            onChange={event => {
              setUserEmail(event.target.value);
            }}
            className="join-email"
          />
        </div>
        {/* 사용자 패스워드 */}
        <div className="form-group">
          <label htmlFor="pass">패스워드</label>
          <input
            type="password"
            id="pass"
            value={userPass}
            onChange={event => {
              setUserPass(event.target.value);
            }}
            className="join-email"
          />
        </div>
        {/* 사용자 패스워드 2 */}
        <div className="form-group">
          <label htmlFor="pass2">패스워드 확인</label>
          <input
            type="password"
            id="pass2"
            value={userPass2}
            onChange={event => {
              setUserPass2(event.target.value);
            }}
            className="join-email"
          />
        </div>
        {/* 사용자 이름 */}
        <div className="form-group">
          <label htmlFor="name">이름</label>
          <input
            type="text"
            value={userName}
            onChange={event => {
              setUserName(event.target.value);
            }}
            className="join-email"
          />
        </div>

        <div className="form-group">
          <button
            type="submit"
            className="bt-submit"
            onClick={event => {
              joinMember(event);
            }}
          >
            회원가입
          </button>
          <button
            type="reset"
            className="bt-cancel"
            onClick={() => {
              joinReset();
            }}
          >
            재작성
          </button>
        </div>
      </form>
    </div>
  );
};

export default Join;
```

## 3. 회원로그인

## 4. 회원정보수정
