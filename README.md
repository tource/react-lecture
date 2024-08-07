# Firebase 인증

- [인증도움말](https://firebase.google.com/docs/auth/web/start?authuser=0&hl=ko&_gl=1*1feq5n7*_up*MQ..*_ga*MjA5MTY0NzU2Mi4xNzIyODE5NzQw*_ga_CW55HF8NVT*MTcyMjgyNjg0OC4zLjEuMTcyMjgyNjg3My4zNS4wLjA.)

## 1. 인증의 구조 만들기

- 인증을 한번 하고 나면 사용자 정보를 전체 컴포넌트에서 수시로 활용
- 로그인 정보를 hook을 이용해서 수시로 사용하는 구조 구성

## 2. 로그인 정보를 위한 hook 작업

- /src/hooks/useAuth.js

```js
import { useState } from "react";

const useAuth = () => {
  const [user, setUser] = useState(null);

  return { user };
};
export default useAuth;
```

## 3. 로그인 안되면 Navbar 안보이기

- /src/App.js

```js
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditProfile from "./components/EditProfile";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Todo from "./components/Todo";
import useAuth from "./hooks/useAuth";

const App = () => {
  // 커스텀 훅에서 user State 가져와서 활용
  const { user } = useAuth();
  return (
    <BrowserRouter>
      // 사용자 정보가 있으면 메뉴 보여주기
      {user && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/edit-profile" element={<EditProfile />}></Route>
        <Route path="/todo" element={<Todo />}></Route>
        <Route path="*" element={<h1>경로가 잘못되었습니다.</h1>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
```

## 4. 로그인 된 경우에만 출력할 컴포넌트처리

- user 라는 State가 있다면, 메뉴 보임

```js
{
  user && <Navbar />;
}
```

- user 라는 State가 있다면, 패스에 따라서
  : Profile, EditProfile, Todo 컴포넌트를 보여줌.
  : user 정보가 있느냐 없느냐에 따라서 children으로 보여줄 처리 진행
  : ProtectedRouter 컴포넌트를 이용하고, children으로
- /src/components/

```js
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
```

- /src/App.js

```js
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditProfile from "./components/EditProfile";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Todo from "./components/Todo";
import useAuth from "./hooks/useAuth";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const { user } = useAuth();
  return (
    <BrowserRouter>
      {user && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/todo"
          element={
            <ProtectedRoute>
              <Todo />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="*" element={<h1>경로가 잘못되었습니다.</h1>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
```

## 5. 로그인 및 회원가입 구성하기

- /src/components/Login.js

```js
import React, { useState } from "react";

const Login = () => {
  // 현재 화면 상태 관리
  const [isScene, setIsScene] = useState("login");
  // 입력 항목 상태관리
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  // 입력 에러 상태관리
  const [error, setError] = useState("");
  // 미리보기 이미지 상태관리
  const handleImageChange = e => {
    // input type="file"
    const file = e.target.files[0];
    if (file) {
      // file 원본을 보관한다.
      setImage(file);
      // file 을 미리보기로 만든다.
      // FileReader 사용해 보기 (Blob 처리)
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log(reader);
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  // 로그인 시도시 처리
  const handleKeyPress = e => {
    if (e.code === "Enter") {
      handleAuth();
    }
  };
  const handleAuth = () => {
    if (!email) {
      setError("이메일을 입력하세요.");
      return;
    }
    if (!pw) {
      setError("비밀번호를 입력하세요.");
      return;
    }
    console.log("FB 로그인 시도 처리");
  };
  // 회원가입시 처리
  const handleJoin = () => {
    if (!name) {
      setError("닉네임을 입력하세요.");
      return;
    }
    if (!email) {
      setError("이메일을 입력하세요.");
      return;
    }
    if (!pw) {
      setError("비밀번호를 입력하세요.");
      return;
    }
    console.log("FB 회원정보 등록 시도 처리");
    setError("");
    setName("");
    setEmail("");
    setPw("");
    setPreviewImage(null);
    setImage(null);
    setIsScene("login");
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">
        {isScene == "login" ? "로그인" : "회원가입"}
      </h1>
      {/* FB 에 로그인 또는 회원가입시 에러메시지 출력 */}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {isScene == "login" ? (
        <>
          <div className="mb-2 w-80">
            <label className="block text-gray-700">이메일</label>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => {
                handleKeyPress(e);
              }}
              type="email"
              placeholder="이메일"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="mb-2 w-80">
            <label className="block text-gray-700">비밀번호</label>
            <input
              value={pw}
              onChange={e => setPw(e.target.value)}
              onKeyDown={e => {
                handleKeyPress(e);
              }}
              type="password"
              placeholder="비밀번호"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <button
            className="mb-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-80"
            onClick={() => {
              handleAuth();
            }}
          >
            로그인
          </button>
          <button
            className="text-blue-500 hover:underline"
            onClick={() => {
              setIsScene("join");
              setError("");
              setEmail("");
              setPw("");
            }}
          >
            계정만들기
          </button>
        </>
      ) : (
        <>
          <div className="mb-2 w-80">
            <label className="block text-gray-700">이름</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              type="text"
              placeholder="이름"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>

          <div className="mb-2 w-80">
            <label className="block text-gray-700">이메일</label>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              placeholder="이메일"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>

          <div className="mb-2 w-80">
            <label className="block text-gray-700">비밀번호</label>
            <input
              value={pw}
              onChange={e => setPw(e.target.value)}
              type="password"
              placeholder="비밀번호"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
            <p className="text-xs text-red-500 mt-1">
              비밀번호는 최소 6자입니다.
            </p>
          </div>

          <div className="mb-2 w-80">
            <label className="block text-gray-700">프로필 이미지</label>
            <div className="flex items-center mt-1">
              <label className="cursor-pointer p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                파일선택
                <input
                  onChange={e => {
                    // 파일 선택시 이미지 미리보기도 작성해야 함.
                    // 파일도 보관해야 함.
                    handleImageChange(e);
                  }}
                  type="file"
                  placeholder="이름"
                  className="hidden"
                />
              </label>

              {/* 이미지가 선태된 경우는 미리보기 아니면 일반 */}
              {previewImage && (
                <img
                  src={previewImage}
                  className="ml-4 w-16 h-16 object-cover rounded-full"
                />
              )}
            </div>
          </div>

          <button
            className="mb-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-80"
            onClick={() => handleJoin()}
          >
            회원가입
          </button>
          <button
            className="text-blue-500 hover:underline"
            onClick={() => {
              setError("");
              setName("");
              setEmail("");
              setPw("");
              setPreviewImage(null);
              setImage(null);
              setIsScene("login");
            }}
          >
            이미 계정이 있습니까?
          </button>
        </>
      )}
    </div>
  );
};

export default Login;
```
