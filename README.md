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
    <h2>postime 회원가입</h2>
    <div class="join-wrap">
      <form action="/member/join.php" method="get">
        <label for="email">email</label>
        <input type="text" id="email" name="email" class="email" />
      </form>
    </div>
  </body>
</html>
```

## 2. 회원가입

- /src/pages/member/Join.js

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
    <h2>postime 회원가입</h2>
    <div class="join-wrap">
      <form action="/member/join.php" method="get" enctype="multipart/form-data">
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
          <label for="pwcheck">비밀번호 확인</label>
          <input type="password" id="pwcheck" name="pwcheck" class="pwcheck" />
        </div>
        <div class="form-group">
          <label for="phone">전화번호</label>
          <input type="tel" id="phone" name="phone" class="phone" />
        </div>
        <div class="form-group">
          <label for="address">주소</label>
          <input type="text" id="address" name="address" class="address" />
        </div>
        <div class="form-group">
          <label for="address2">상세주소</label>
          <input type="text" id="address2" name="address2" class="address2" />
        </div>
        </div>
        <div class="form-group">
          <label for="birthday">생년월일</label>
          <input type="date" id="birthday" name="birthday" class="birthday" />
        </div>
        <div class="form-group">
          <label for="gender">성별</label>
          <select id="gender" name="gender" class="gender">
            <option value="">선택하세요</option>
            <option value="mail">남성</option>
            <option value="female">여성</option>
            <option value="other">기타</option>
          </select>
        </div>
        <div class="form-group">
          <label>취미생활</label>
          <div class="form-list">
            <input type="checkbox" id="hobby1" name="hobby" value="reading"/>
            <label for="hobby1">독서</label>
          </div>
          <div>
            <input type="checkbox" id="hobby2" name="hobby" value="travling"/>
            <label for="hobby2">여행</label>
          </div>
          <div>
            <input type="checkbox" id="hobby3" name="hobby" value="cooking"/>
            <label for="hobby3">요리</label>
          </div>
          <div>
            <input type="checkbox" id="hobby4" name="hobby" value="sports"/>
            <label for="hobby4">운동</label>
          </div>
        </div>
        <div class="form-group">
          <label>학생여부</label>
          <div class="form-list">
            <input type="radio" id="student_yes" name="student" value="yes"/>
            <label for="student_yes">예</label>

            <input type="radio" id="student_no" name="student" value="no"/>
            <label for="student_no">아니오</label>
          </div>
        </div>
        <div class="form-group">
          <label for="profile-img">프로필 이미지</label>
          <input type="file" id="profile-img" name="profile" class="profile-img"/>
        </div>
        <div class="form-group">
          <label for="memo">메모</label>
          <textarea id="memo" name="memo" rows="4" cols="50"></textarea>
        </div>
        <div class="form-group">
          <input type="color">
          <input type="range">
        </div>
        <div class="form-group">
            <input type="submit" value="확인"/>
            <button type="submit">submit 확인</button>
            <button type="button">button 확인</button>
            <button>저스트버튼</button>
        </div>
      </form>
    </div>
  </body>
</html>
```

### 2.1. 컴포넌트에 html 마이그레이션

- React 문법에 맞게 class를 className으로 변경
- React 문법에 맞게 for를 htmlFor로 변경
- css 변경 불필요
- JS
  : html 태그를 찾으려고 useRef를 사용하는 것은 권장하지 않는다.
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

- useState 변수 사용하자
- onClick 사용
- onChange 사용
- event.preventDefault() 로 웹브라우저 자동 갱신 막기

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
  };
  // 회원내용 재 작성 함수
  const joinReset = () => {
    setJoinName("");
    setJoinEmail("");
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
              console.log(event.target);
              setJoinName(event.target.value);
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
              console.log(event.target);
              setJoinEmail(event.target.value);
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

### 2.3. Postman 테스트

- 새 탭을 연다

#### 2.3.1. POST 예

: api 주소를 알아낸다. (http://192.168.0.148:8080/api/user)
: body 탭 > raw 선택
: 데이터를 넣는다.

```json
{
  "id": "qorckus183",
  "pwd": "Ckdgusdlqkqh@@3",
  "name": "백창현",
  "email": "asdqwe@naver.com"
}
```

: Send 버튼을 선택 후 결과 확인

```json
{
  "statusCode": 4,
  "resultMsg": "이미 사용중인 아이디입니다",
  "resultData": 0
}
```

#### 2.3.2. 파일 업로드 테스트(Swagger 에서는 테스트 안됨)

: api 주소를 알아낸다. (http://192.168.0.148:8080/api/board/file)
: body 탭 > form-data 선택
: 주어진 형식 파악

```json
{
  "file": "파일입니다.",
  "p": {
    "boardId": 1,
    "calendarId": 1
  }
}
```

: key 의 단어로 file 작성함 ==> 펼치목록에서 file 선택
: value 로 파일을 선택함.

: 추가 key 를 작성한다.
: 추가된 key 에 내용을 넣는다.
: Content-type 에 내용 작성 ==> application/json (중요)

```json
{
  "boardId": 1,
  "calendarId": 1
}
```

- 최종적으로 Headers 탭에 Content-type 이 multipart/form-data 인지확인

### 2.4. Swagger 사용법(F12 선택 후 Network 탭)

- 항목을 선택한다.
- try 버튼 선택
- 필수항목 입력
- Excuete 버튼 선택
- response 확인

### 2.5. Postman 또는 Swagger 쓰는 이유

- react 로 axios 작업 전에 정상적으로 되는지 확인 용도
- Postman 의 결과는 웹브라우저에서도 될지는 판단 곤란
- Swagger 는 웹브라우저이므로 신뢰함.

### 2.6. axios 적용

- FE 컴퓨터와 BE 컴퓨터가 다르다면 (하드웨어가)
  : package.json 에 proxy 설정해야 합니다.
  : "proxy": "http://192.168.0.148:8080"
- package.json 수정되면 반드시 리액트 재 start

```js
// 회원가입시 처리할 함수
const joinMember = event => {
  // form 태그에서 submit 을 하면 웹브라우저 갱신
  // 갱신하면 초기화 되므로 막아줌. (기본기능막기)
  event.preventDefault();

  // 아래의 데이터를 API 로 보낸다.
  const requestData = {
    id: userId,
    pwd: userPass,
    name: userName,
    email: userEmail,
  };
  postUser(requestData);
};
//  회원가입시 실행할 API 함수
const postUser = async data => {
  try {
    // axios.post("주소", "데이터");
    const response = await axios.post("/api/user", data);
    console.log(response.data);
    // 나머지는 리액트에서 처리
    if (response.data.statusCode === "2") {
      alert("회원가입 성공");
    } else {
      alert(response.data.resultMsg);
    }
  } catch (error) {
    console.log(error);
  }
};
```

## 3. axios 기본

### 3.1. /src/axios 폴더 생성 권장

- /src/axios/user 폴더 생성
- /src/axios/user/apiuser.js 파일 생성

```js
import axios from "axios";

//  회원가입시 실행할 API 함수
export const postUser = async data => {
  try {
    // axios.post("주소", "데이터");
    const response = await axios.post("/api/user", data);
    if (response.data.status === "2") {
      return "회원가입 성공";
    } else {
      return response.data;
    }
    // 나머지는 리액트에서 처리
  } catch (error) {
    console.log(error);
  }
};

export const getResetPwd = async ({ userEmail, userId }) => {
  try {
    const rqData = `/api/user/resetpwd?email=${userEmail}&id=${userId}`;
    const response = await axios.get(rqData);
    console.log(response.data);
  } catch (error) {
    console.log("error");
  }
};

export const getUser = async ({ userName, userEmail }) => {
  try {
    const rqData = `/api/user?name=${userName}&email=${userEmail}`;
    const response = await axios.get(rqData);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

// 로그인 API
export const postSignIn = async ({ userId, userPass }) => {
  try {
    const response = await axios.post("/api/user/sign-in", {
      id: userId,
      pwd: userPass,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
```

## 4. 회원로그인

```js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postSignIn } from "../../axios/user/apiuser";
import "../../css/member.css";
const Login = () => {
  // 라우터
  const navigate = useNavigate();
  const [userId, setUserId] = useState("tource1");
  const [userPass, setUserPass] = useState("A123456789!a");

  const handleSubmit = async e => {
    // 새로 고침 막기
    e.preventDefault();
    const result = await postSignIn({ userId, userPass });
    if (result.statusCode !== 2) {
      alert(result.resultMsg);
      return;
    }
    navigate("/");
  };

  return (
    <div className="join-wrap">
      <form className="join-form">
        {/* 사용자 아이디 */}
        <div className="form-group">
          <label htmlFor="userid">아이디</label>
          <input
            type="text"
            value={userId}
            id="userid"
            className="join-email"
            onChange={e => {
              setUserId(e.target.value);
            }}
          />
        </div>

        {/* 사용자 패스워드 */}
        <div className="form-group">
          <label htmlFor="pass">패스워드</label>
          <input
            type="password"
            value={userPass}
            id="pass"
            className="join-email"
            onChange={e => {
              setUserPass(e.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <button
            type="submit"
            className="bt-submit"
            onClick={e => {
              handleSubmit(e);
            }}
          >
            로그인
          </button>
          <button type="reset" className="bt-cancel">
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
```

## 5. 모달창 적용해 보기

- /src/components/modal/Modal.js

```js
import "./modal.css";
const Modal = ({
  title,
  text,
  modalOk,
  modalcancle,
  modalBtOk,
  modalBtCancel,
}) => {
  return (
    <div className="modal-wrap">
      <div className="modal-content">
        <header>
          <h1>{title}</h1>
        </header>
        <main>
          <p>{text}</p>
        </main>
        <footer>
          {modalBtOk ? (
            <button
              onClick={() => {
                modalOk();
              }}
            >
              확인
            </button>
          ) : null}
          {modalBtCancel ? (
            <button
              onClick={() => {
                modalcancle();
              }}
            >
              취소
            </button>
          ) : null}
        </footer>
      </div>
    </div>
  );
};

export default Modal;
```

- /src/components/modal/Modal.css

```css
.modal-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.7);
}
.modal-content {
  position: relative;
  width: 100%;
  max-width: 650px;
  min-height: 400px;
  overflow: hidden;
  background: #fff;
  border-radius: 20px;
}
.modal-content header {
  text-align: center;
}
.modal-content main {
  text-align: center;
}
.modal-content footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  text-align: center;
}
```

- /src/pages/member/Login.js

```js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postSignIn } from "../../axios/user/apiuser";
import "../../css/member.css";
import Modal from "../../components/modal/Modal";
const Login = () => {
  // 라우터
  const navigate = useNavigate();
  // 모달창 전달 변수
  const [modalTitle, setModalTitle] = useState("");
  const [modalText, setModalText] = useState("");
  // 컴포넌트 버튼 보이고, 숨기기 ( children, 새로 컴포넌트도 고민)
  const [modalBtOk, setModalBtOk] = useState(true);
  const [modalBtCancel, setModalBtCancel] = useState(true);
  // 모달 보이는 상태값
  const [isModal, setIsModal] = useState(false);

  // 모달 실행 함수
  const modalOk = () => {
    setIsModal(false);
    if (isSuccess) {
      navigate("/");
    }
  };
  const modalcancel = () => {
    setIsModal(false);
  };

  const [userId, setUserId] = useState("tource1");
  const [userPass, setUserPass] = useState("A123456789!a");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async e => {
    // 새로 고침 막기
    e.preventDefault();
    // 아이디가 입력이 되었는지 확인
    if (!userId) {
      setIsModal(true);
      setModalTitle("로그인 안내");
      setModalText("아이디를 반드시 입력해주세요.");
      setModalBtOk(true);
      setModalBtCancel(true);
      return;
    }
    if (!userPass) {
      setIsModal(true);
      setModalTitle("로그인 안내");
      setModalText("비밀번호를 반드시 입력해주세요.");
      setModalBtOk(true);
      setModalBtCancel(true);
      return;
    }

    const result = await postSignIn({ userId, userPass });
    if (result.statusCode !== 2) {
      setIsModal(true);
      setModalTitle("로그인 안내");
      setModalText(result.resultMsg);
      setModalBtOk(true);
      setModalBtCancel(true);
      return;
    }
    // 성공함
    setIsModal(true);
    setModalTitle("로그인 안내");
    setModalText("로그인에 성공하였습니다.");
    setModalBtOk(true);
    setModalBtCancel(false);

    setIsSuccess(true);
  };

  return (
    <>
      {isModal ? (
        <Modal
          title={modalTitle}
          text={modalText}
          modalOk={modalOk}
          modalcancel={modalcancel}
          modalBtOk={modalBtOk}
          modalBtCancel={modalBtCancel}
        />
      ) : null}

      <div className="join-wrap">
        <form className="join-form">
          {/* 사용자 아이디 */}
          <div className="form-group">
            <label htmlFor="userid">아이디</label>
            <input
              type="text"
              value={userId}
              id="userid"
              className="join-email"
              onChange={e => {
                setUserId(e.target.value);
              }}
            />
          </div>

          {/* 사용자 패스워드 */}
          <div className="form-group">
            <label htmlFor="pass">패스워드</label>
            <input
              type="password"
              value={userPass}
              id="pass"
              className="join-email"
              onChange={e => {
                setUserPass(e.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <button
              type="submit"
              className="bt-submit"
              onClick={e => {
                handleSubmit(e);
              }}
            >
              로그인
            </button>
            <button type="reset" className="bt-cancel">
              취소
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
```

## 6. localStorage에 정보 저장

- 웹브라우저에 영원히 보관됩니다.
- 누구나 f12으로 확인가능합니다.
- 위험한 장소
- `localStorage.setItem("키명", 값)`
- `localStorage.getItem("키명")`
- `localStorage.removeItem("키명")`
- `localStorage.clear()`
- 새로고침한 경우에 정보를 useState에 담는다.
- 각 컴포넌트에 props를 통해 정보를 전달한다.
- 이러한 props가 전달되는 과정을 Drilling이라고 합니다.
- 컴포넌트 드릴링은 많은 부작용이 있다.
- props는 3단계 이상 연속으로 전달하지 않도록 노력하자.
- 3단계 이상 넘어간다면 전역상태관리를 권장한다.

### 6.1. Context API 와 localStorage 활용

- 어느 컴포넌트에서 전역관리 코드를 해줄까?
  : App.js 를 추천함.
- react 라이브러리에 내장되어 있다.
- step 1.
  : Context 를 생성한다. createContext()
  : `export const userInfoContext = createContext();`
- step 2. Provider 생성 및 value 지정

```js
const [isUser, setIsUser] = useState("");
....
<userInfoContext.Provider
  value={{ isUser, setIsUser }}
>
  컴포넌트 배치
</userInfoContext.Provider>;
```

- step 3. Context를 사용. useContext()
  : ` const { isUser, setIsUser } = useContext(userInfoContext);`

## 7. sessionStorage에 정보 저장

- 위험한 장소이지만 그래도 휘발성이다
- `sessionStorage.setItem("키명", 값)`
- `sessionStorage.getItem("키명")`
- `sessionStorage.removeItem("키명")`
- `sessionStorage.clear()`

## 8. cookie에 정보 저장

- https://www.npmjs.com/package/react-cookie
- `npm i react-cookie`
- https://velog.io/@defaultkyle/react-cookie
- /src/utils/cookie.js

```js
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name, value, options) => {
  return cookies.set(name, value, { ...options });
};

export const getCookie = name => {
  return cookies.get(name);
};
```

## 9. Context API로 정보 출력 및 수정

## 10. 회원정보수정
