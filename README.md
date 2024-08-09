# FB 인증 디버깅

## 1. index.js 파일의 수정사항

- 왜 BrowserRouter 가 index 로 이동을 한 것은?
  : App.js 에서 인증이 안된경우와 인증이 된 경우 useNavigate() 를 활용
  : path 를 이동시키려고
  : React-Router-Dom 의 기능을 쓰려면 BrowserRouter 안쪽에 코딩이 되어야 함.

```js
.......
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
```

## 2. hooks/useAuth.js

- user 는 조금 불명확하다.
  : 강제로 true, false 라고 개발자가 셋팅했었음.
  : 명확하게 FB 의 auth.currentUser 정보가 좀 더 정확하다.
  : auth.currentUser 는 인증상태, uid 도 존재함.
  : 이러한 제거함.

- userCurrent 를 생성함.
  : auth.currentUser 를 useState 로 보관함.

- 해당 파일의 state 들은 Recoil 에서 변경 예정

- onAuthStateChanged 는 FB 에서 소켓으로 실시간 인증 상태를 체크 해줌.

```js
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, storage, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const useAuth = () => {
  // FB 사용자 인증 정보
  const [userCurrent, setUserCurrent] = useState(null);

  // 사용자 유무
  // const [user, setUser] = useState(false);

  // 사용자 정보를 저장함
  // Navbar 또는 Profile, EditProfile 에 출력할 내용
  const [userData, setUserData] = useState(null);

  // 사용자 정보를 읽어들임
  const fetchUserData = async who => {
    // console.log("인증 실시간 결과 알려줌. fetchUserData ", who);
    if (!who) {
      return;
    }
    // 문서를 만든다.
    const userInfoGetDoc = doc(db, "users", who.uid);
    const docSnap = await getDoc(userInfoGetDoc);
    // 위의 구문을 실행후 문서가 존재한다면 실행하라.
    if (docSnap.exists()) {
      // {name:"홍길동", email:"a@a.net", imageUrl: "~~~"}
      setUserData(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  // FB 는 로그인 시도를 하면 사용자의 로그인 상태를 실시간으로 변경
  useEffect(() => {
    // FB 연결하면 사용자의 인증 즉, 로그인, 회원가입, 로그인 실행
    // 자동으로 onAuthStateChanged 가 실행된다.
    const onAuth = onAuthStateChanged(auth, async who => {
      console.log("인증 실시간 결과 알려줌. onAuthStateChanged ", who);

      if (who) {
        // console.log(who);
        // console.log(auth.currentUser);
        // who == auth.currentUser 이다.
        setUserCurrent(who);

        // const uid = who.uid;
        // console.log("사용자 상태가 바뀜 uid : ", uid);
        // 로그인에 의해 리턴된 모든 정보를 보관해 둔다.
        // console.log("사용자 정보 : ", who);
        // 로그인했으므로 true
        // setUser(true);
        // DataBase 에 진입해서 사용자 정보관련 내용을 읽어들인다.
        await fetchUserData(who);
      } else {
        // 로그아웃 실시간 처리
        setUserData(null);
        // setUser(false);
        setUserCurrent(null);
      }
    });

    // 클린업 함수
    return () => onAuth();
  }, []);

  return {
    // user,
    // setUser,
    userData,
    setUserData,
    userCurrent,
    setUserCurrent,
  };
};
export default useAuth;
```

## 3. 기타파일

- Login.js

```js
import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

import { auth, storage, db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const { userCurrent, setUserCurrent } = useAuth();
  // 패스이동하기
  const navigate = useNavigate();
  // 현재 화면 상태 관리
  const [isScene, setIsScene] = useState("login");
  // 입력 항목 상태관리
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  // Storage 보관용 원본 파일
  const [image, setImage] = useState(null);
  // 사용자 이미지 미리보기
  const [previewImage, setPreviewImage] = useState(null);
  // 입력 에러 상태관리
  const [error, setError] = useState("");
  // 미리보기 이미지 상태관리
  const handleImageChange = e => {
    // input type="file"
    const file = e.target.files[0];
    if (file) {
      // storage 업로드 할 file 원본을 보관한다.
      setImage(file);
      // file 을 미리보기로 만든다.
      // FileReader 사용해 보기 (Blob 처리)
      const reader = new FileReader();
      reader.onloadend = () => {
        // console.log(reader);
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  // 키보드로 로그인 시도시 처리
  const handleKeyPress = e => {
    if (e.code === "Enter") {
      handleAuth();
    }
  };
  // 실제로 FB 는 이메일 기준
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
    fbLogin();
  };

  const fbLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, pw);
      // 추후 useAuth 의 user 항목을 true 코드 위치;
      navigate("/todo");
    } catch (error) {
      // console.log("error.code ", error.code);
      // console.log("error.message ", error.message);
      switch (error.code) {
        case "auth/user-not-found":
          setError("사용자를 찾을 수 없습니다.");
          break;
        case "auth/wrong-password":
          setError("비밀번호가 틀렸습니다.");
          break;
        case "auth/invalid-email":
          setError("유효하지 않은 이메일 주소입니다.");
          break;
        default:
          setError("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    }
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
    // 사용자 이미지 파일은 체크 하지 않았어요.
    // 만약, 이미지 업로드 안한 경우는 기본형 이미지 제공 예정
    // console.log("FB 회원정보 등록 시도 처리");

    fbJoin();
  };

  const fbJoin = async () => {
    try {
      // 인증기능과, 이메일, 비밀번호를 통해서 사용자 추가 API 실행
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        pw,
      );
      // useState 는 실시간 갱신이 안되고, 함수종료되어야 갱신
      setUserCurrent(userCredential.user);
      // storage : 이미지 파일 업로드
      let imageUrl = "";
      // 사용자가 이미지를 업로드 한다면
      if (image) {
        // Storage 에 보관
        // users폴더 / 사용자폴더 / profile.png
        const imageRef = ref(
          storage,
          `users/${userCredential.user.uid}/profile.png`,
        );
        await uploadBytes(imageRef, image);
        // db 에 저장하려고 파일의 URL 파악한다.
        imageUrl = await getDownloadURL(imageRef);
        console.log("업로드된 이미지의 경로 ", imageUrl);
      }
      // database : 사용자 닉네임, 이메일, 사용자 이미지 URL 추가
      const userDoc = doc(db, "users", userCredential.user.uid);
      await setDoc(userDoc, { name, email, imageUrl });
      // 사용자 등록을 하면 즉시 FB 는 로그인 상태로 처리.
      // UI 와 흐름이 맞지 않으므로 강제로 로그아웃을 시킨다.
      await signOut(auth);

      setUserCurrent(null); // 인증정보삭제
      setError("");
      setName("");
      setEmail("");
      setPw("");
      setPreviewImage(null);
      setImage(null);
      // 로그인 화면으로 이동시킨다.
      setIsScene("login");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("errorCode : ", errorCode);
      console.log("errorMessage : ", errorMessage);
      switch (errorCode) {
        case "auth/invalid-email":
          setError("이메일을 바르게 입력해주세요.");
          break;
        case "auth/weak-password":
          setError("비밀번호가 너무 쉬워요.");
          break;
        case "auth/email-already-in-use":
          setError("등록된 이메일 입니다.");
          break;
        default:
          alert("회원가입 실패");
          break;
      }
    }
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

- Navbar.js

```js
import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

const Navbar = () => {
  const { userCurrent, userData, setUserCurrent } = useAuth();
  console.log("Navbar refreshUserData : ", userData);
  const navigate = useNavigate();
  const handleLogout = async () => {
    // FB 에서 로그아웃
    await signOut(auth);
    setUserCurrent(null);
    // 로그인으로 이동
    navigate("/");
  };
  console.log("리랜더링이 되요..");
  useEffect(() => {
    console.log("Navbar userData :  ", userData);
  }, [userCurrent]);

  // 사용자가 로그인을 안 했다면 Navbar 출력하지 않는다.
  // if (!userCurrent) {
  //   return null;
  // }

  return (
    <nav className="bg-gray-400 p-4">
      <ul className="flex justify-around items-center">
        <li>
          <Link to={"/todo"} className="text-white hover:underline">
            할일 목록
          </Link>
        </li>
        {userData && (
          <li className="text-white ml-4 flex items-center">
            <Link
              to={"/profile"}
              className="flex items-center mr-4 hover:underline"
            >
              {userData.imageUrl ? (
                <img
                  src={userData.imageUrl}
                  alt="Profile Image"
                  className="w-8 h-8 rounded-full mr-2"
                />
              ) : (
                <FaUserCircle className="w-8 h-8 text-gray-200 mr-2" />
              )}
              {userData.name} {userData.email}
            </Link>
            <button
              onClick={() => {
                handleLogout();
              }}
              className="p-2 bg-red-500 rounded text-white hover:bg-red-600"
            >
              로그아웃
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
```

- ProtectedRoute.js

```js
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const userCurrent = useAuth();
  return userCurrent ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
```

- Profile.js

```js
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../firebaseConfig";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { deleteUser } from "firebase/auth";
import useAuth from "../hooks/useAuth";

const Profile = () => {
  const { userCurrent, userData } = useAuth();

  const navigate = useNavigate();
  const handleClickEdit = () => {
    navigate("/edit-profile");
  };

  const handleClickDeleteUser = async () => {
    // console.log(userObject.userCurrent);

    // 탈퇴 여부 확인
    const flag = window.confirm(
      "정말 탈퇴 하시겠습니까? \n이 작업은 되돌릴 수 없습니다.",
    );

    if (flag) {
      try {
        // 1. db 문서 삭제
        const userDocRef = doc(db, "users", userCurrent?.uid);
        await deleteDoc(userDocRef);
        // 2. image 파일 삭제
        if (userData?.imageUrl) {
          const imageRef = ref(
            storage,
            `users/${userCurrent?.uid}/profile.png`,
          );
          await deleteObject(imageRef);
        }
        // 3. 사용자 삭제
        await deleteUser(userCurrent);
        // 4. 안내창
        alert("회원탈퇴가 완료되었습니다.");
        // 5. 패스이동("/")
        navigate("/");
      } catch (error) {
        console.log("회원탈퇴 실패 : ", error);
        alert("회원탈퇴에 실패하였습니다. 다시 시도해 주세요.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">프로필</h1>
      {userData && (
        <div className="flex flex-col items-center">
          {userData?.imageUrl ? (
            <img
              src={userData?.imageUrl}
              alt="Profile Image"
              className="w-32 h-32 rounded-full mr-2"
            />
          ) : (
            <FaUserCircle className="w-32 h-32 text-gray-400 mr-2" />
          )}
          <p className="text-lg mb-2">이름 : {userData?.name}</p>
          <p className="text-lg mb-4">이메일 : {userData?.email}</p>
          <div className="flex space-x-4">
            <button
              onClick={() => {
                handleClickEdit();
              }}
              className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              프로필 수정
            </button>
            <button
              onClick={() => {
                handleClickDeleteUser();
              }}
              className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600"
            >
              회원탈퇴
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
```

- EditProfile.js

```js
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { auth, db, storage } from "../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updatePassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  // 커스텀 훅 사용
  const { userData, userCurrent, setUserData } = useAuth();
  // console.log("EditProfile userData : ", userData);
  // console.log("EditProfile userCurrent : ", userCurrent);

  // 변경해야할 변수
  const [name, setName] = useState("");
  const [orginName, setOriginName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [originImage, setOriginImage] = useState(null);

  // 이미지 수정하기
  const handleChangeImage = e => {
    const file = e.target.files[0];
    if (file) {
      // 전송용 파일
      setImage(file);
      // file 을 미리보기로 만든다.
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  // FB 데이터 업데이트
  const handleClickUpdate = async () => {
    if (!name) {
      alert("이름을 입력하세요.");
      return;
    }
    if (!pw) {
      //alert("비밀번호를 입력하세요.");
      return;
    }
    if (!confirmPw) {
      alert("비밀번호 확인를 입력하세요.");
      return;
    }
    if (pw !== confirmPw) {
      alert("비밀번호를 확인해주세요.");
      return;
    }

    // 업데이트 할 내용을 모아준다.
    // 아래는 DB 를 업데이트 할 내용
    const update = {};
    if (name != orginName) {
      update.name = name;
    }
    // 새로운 이미지 파일이 있다면
    if (image) {
      // Storage 에 보관
      // users폴더 / 사용자폴더 / profile.png
      const imageRef = ref(storage, `users/${userCurrent?.uid}/profile.png`);
      await uploadBytes(imageRef, image);
      // db 에 저장하려고 파일의 URL 파악한다.
      update.imageUrl = await getDownloadURL(imageRef);
    }

    // 문서를 업데이트 한다.
    if (Object.keys(update).length > 0) {
      // 문서 만들고 업데이트 실행
      const userDoc = doc(db, "users", userCurrent?.uid);
      await updateDoc(userDoc, update);
      const nowData = { ...userData, ...update };
      // console.log("업데이트된 문서내용 : ", nowData);
      setUserData(nowData);
    }

    // 사용자 인증 중 비밀번호 업데이트
    if (pw) {
      try {
        await updatePassword(userCurrent, pw);
      } catch (error) {
        console.log("비밀번호 업데이트 중 오류가 발생하였습니다.", error);
      }
    }

    alert("정보가 수정 되었습니다.");
    navigate("/profile");
  };

  // 초기값 설정
  useEffect(() => {
    if (userData) {
      setName(userData.name);
      // 기존 이름을 보관
      setOriginName(userData.name);
      setEmail(userData.email);
      setPreviewImage(userData.imageUrl || "");
      // 이미지 변경을 고려해서 기존 내용 보관
      setOriginImage(userData.imageUrl || "");
    }
  }, [userData]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">프로필 수정</h1>

      <div className="p-4 bg-white shadow-md rounded w-80">
        <div className="mb-2">
          <label className="block text-gray-700">이름</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="이름"
            className="mt-1 p-2 border border-gray-300 rounder w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">이메일</label>
          <input
            type="email"
            value={email}
            readOnly
            disabled
            placeholder="이메일"
            className="mt-1 p-2 border border-gray-300 rounder w-full"
          />
        </div>
        <div>
          <label className="block text-gray-700">프로필 이미지</label>
          <div className="flex items-center mt-1">
            <label className="cursor-pointer p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              파일선택
              <input
                type="file"
                onChange={e => handleChangeImage(e)}
                className="hidden"
              />
            </label>
            {previewImage && (
              <img
                src={previewImage}
                className="ml-4 w-16 h-16 object-cover rounded-full"
              />
            )}
          </div>
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">새 비밀번호</label>
          <input
            type="password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            placeholder="새 비밀번호"
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">비밀번호 확인</label>
          <input
            type="password"
            value={confirmPw}
            onChange={e => setConfirmPw(e.target.value)}
            placeholder="비밀번호 확인"
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => {
              handleClickUpdate();
            }}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
          >
            수정
          </button>
          <button className="p-2 bg-gray-400 text-white rounded hover:bg-gray-500 w-full">
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
```
