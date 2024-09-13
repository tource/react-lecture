import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { recoil_UserData } from "../atoms/userAtom";
import { auth, db, storage } from "../firebaseConfig";
import useAuth from "../hooks/useAuth";

// React Hook Form
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

// 로그인 입력 폼의 기본값
const initLoginState = {
  email: "",
  pw: "",
};
// 회원가입 입력 폼의 기본값
const initJoinState = {
  name: "",
  email: "",
  pw: "",
  image: null,
};

// 로그인 시 유효성 검사(yup)
const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("이메일은 필수항목입니다.")
    .email("유효한 이메일 주소를 입력하세요."),
  pw: yup
    .string()
    .required("비밀번호를 입력해주세요.")
    .min(6, "비밀번호는 최소 6자이상입니다.")
    .max(16, "비밀번호는 최대 16자입니다."),
  // 추후 대소문자, 특수기호도 입력검사 예정
});

// 회원가입 시 유효성 검사(yup)
const joinSchema = yup.object().shape({
  name: yup.string().required("이름은 필수항목입니다."),
  email: yup
    .string()
    .required("이메일은 필수항목입니다.")
    .email("유효한 이메일 주소를 입력하세요."),
  pw: yup
    .string()
    .required("비밀번호를 입력해주세요.")
    .min(8, "비밀번호는 최소 8자이상입니다.")
    .max(16, "비밀번호는 최대 16자입니다.")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}[^\s]*$/,
      "알파벳, 숫자, 공백을 제외한 특수문자를 모두 포함한 8자리 이상 입력해주세요",
    ),
});

const Login = () => {
  // React Hook Form
  // handleSubmit :  전송 이벤트 처리
  // register : form 의 name 참조 (<input name="uid" />>)
  // formState :  폼의 데이터
  // setValue : 강제로 값 셋팅
  // error : 에러 메시지 출력
  const loginForm = useForm({
    defaultValues: initLoginState,
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });
  const joinForm = useForm({
    defaultValues: initJoinState,
    resolver: yupResolver(joinSchema),
    mode: "onChange",
  });
  const { userCurrent, setUserCurrent } = useAuth();
  // 사용자 정보를 저장함
  const [rUserData, setRUserData] = useRecoilState(recoil_UserData);

  // 패스이동하기
  const navigate = useNavigate();
  // 현재 화면 상태 관리
  const [isScene, setIsScene] = useState("login");
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
      joinForm.setValue("image", file);
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

  const fbLogin = async data => {
    //{email:"dfsdf", pw: "dfdsf"}
    // console.log("사용자가 입력한 값 : ", data.email, data.pw);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.pw);
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

  const fbJoin = async data => {
    // console.log("회원가입 데이터 : ", data);
    try {
      // 인증기능과, 이메일, 비밀번호를 통해서 사용자 추가 API 실행
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.pw,
      );
      // useState 는 실시간 갱신이 안되고, 함수종료되어야 갱신
      setUserCurrent(userCredential.user);
      // storage : 이미지 파일 업로드
      let imageUrl = "";
      // 사용자가 이미지를 업로드 한다면
      if (data.image) {
        // Storage 에 보관
        // users폴더 / 사용자폴더 / profile.png
        const imageRef = ref(
          storage,
          `users/${userCredential.user.uid}/profile.png`,
        );
        await uploadBytes(imageRef, data.image);
        // db 에 저장하려고 파일의 URL 파악한다.
        imageUrl = await getDownloadURL(imageRef);
        // console.log("업로드된 이미지의 경로 ", imageUrl);
      }
      // database : 사용자 닉네임, 이메일, 사용자 이미지 URL 추가
      const userDoc = doc(db, "users", userCredential.user.uid);
      await setDoc(userDoc, { name: data.name, email: data.email, imageUrl });
      // 사용자 등록을 하면 즉시 FB 는 로그인 상태로 처리.
      // UI 와 흐름이 맞지 않으므로 강제로 로그아웃을 시킨다.
      await signOut(auth);
      setUserCurrent(null); // 인증정보삭제
      setRUserData(null);
      setError("");
      setPreviewImage(null);
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

  // 비밀번호 찾기
  const handleClickPass = () => {
    navigate("/findpass");
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
          {/* React Hook Form 에서 submit 처리 */}
          <form
            onSubmit={loginForm.handleSubmit(fbLogin)}
            className="mb-2 w-80"
          >
            <div className="mb-2 w-80">
              <label className="block text-gray-700">이메일</label>
              <input
                {...loginForm.register("email")}
                onKeyDown={e => {
                  loginForm.handleSubmit(fbLogin);
                }}
                type="email"
                placeholder="이메일"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
              {loginForm.formState.errors.email && (
                <span className="text-red-500 mb-4">
                  {loginForm.formState.errors.email.message}
                </span>
              )}
            </div>
            <div className="mb-2 w-80">
              <label className="block text-gray-700">비밀번호</label>
              <input
                {...loginForm.register("pw")}
                onKeyDown={e => {
                  // handleKeyPress(e);
                  loginForm.handleSubmit(fbLogin);
                }}
                type="password"
                placeholder="비밀번호"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
              {loginForm.formState.errors.pw && (
                <span className="text-red-500 mb-4">
                  {loginForm.formState.errors.pw.message}
                </span>
              )}
            </div>

            <button
              className="mb-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-80"
              type="submit"
            >
              로그인
            </button>

            <div className="flex justify-center items-center gap-4 w-80">
              <button
                className="text-blue-500 hover:underline"
                onClick={() => {
                  setIsScene("join");
                  setError("");
                }}
              >
                계정만들기
              </button>

              <button
                className="text-blue-500 hover:underline"
                onClick={() => {
                  handleClickPass();
                }}
              >
                비밀번호찾기
              </button>
            </div>
          </form>
        </>
      ) : (
        <form className="mb-2 w-80" onSubmit={joinForm.handleSubmit(fbJoin)}>
          <div className="mb-2 w-80">
            <label className="block text-gray-700">이름</label>
            <input
              {...joinForm.register("name")}
              type="text"
              placeholder="이름"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
            {joinForm.formState.errors.name && (
              <span className="text-red-500 mb-4">
                {joinForm.formState.errors.name.message}
              </span>
            )}
          </div>

          <div className="mb-2 w-80">
            <label className="block text-gray-700">이메일</label>
            <input
              {...joinForm.register("email")}
              type="email"
              placeholder="이메일"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
            {joinForm.formState.errors.email && (
              <span className="text-red-500 mb-4">
                {joinForm.formState.errors.email.message}
              </span>
            )}
          </div>

          <div className="mb-2 w-80">
            <label className="block text-gray-700">비밀번호</label>
            <input
              {...joinForm.register("pw")}
              type="password"
              placeholder="비밀번호"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />

            {joinForm.formState.errors.pw && (
              <span className="text-red-500 mb-4">
                {joinForm.formState.errors.pw.message}
              </span>
            )}
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
                  // {...joinForm.register("image")}
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
            type="submit"
          >
            회원가입
          </button>
          <button
            className="text-blue-500 hover:underline"
            onClick={() => {
              setError("");
              setPreviewImage(null);
              setIsScene("login");
            }}
          >
            이미 계정이 있습니까?
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;
