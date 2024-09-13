import { updatePassword } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { recoil_UserData } from "../atoms/userAtom";
import { db, storage } from "../firebaseConfig";
import useAuth from "../hooks/useAuth";

// React Hook Form
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

// 회원정보 폼의 기본값
const initEditState = {
  name: "",
  email: "",
  image: null,
};
const initPassState = {
  pw: "",
  confirmPw: "",
};

// 회원정보수정시 유효성 검사(yup)
const editSchema = yup.object().shape({
  name: yup.string().required("이름은 필수항목입니다."),
});
const passSchema = yup.object().shape({
  pw: yup
    .string()
    .required("비밀번호를 입력해주세요.")
    .min(8, "비밀번호는 최소 8자이상입니다.")
    .max(16, "비밀번호는 최대 16자입니다.")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}[^\s]*$/,
      "알파벳, 숫자, 공백을 제외한 특수문자를 모두 포함한 8자리 이상 입력해주세요",
    ),
  confirmPw: yup
    .string()
    .oneOf([yup.ref("pw"), null], "비밀번호가 일치하지 않습니다")
    .required("비밀번호를 한번 더 입력해주세요"),
});

const EditProfile = () => {
  const navigate = useNavigate();
  // 커스텀 훅 사용
  const { userCurrent } = useAuth();
  // console.log("EditProfile userCurrent : ", userCurrent);
  // 사용자 정보를 저장함
  const [rUserData, setRUserData] = useRecoilState(recoil_UserData);

  // Hook Form 설정
  const editForm = useForm({
    defaultValues: initEditState,
    resolver: yupResolver(editSchema),
    mode: "onChange",
  });
  const passForm = useForm({
    defaultValues: initPassState,
    resolver: yupResolver(passSchema),
    mode: "onChange",
  });
  // Recoil 값 읽어서 처리하기
  // initEditState.email = rUserData.email;
  // initEditState.name = rUserData.name;
  // React Hook Form setValue(rUserData.email)
  // React Hook Form setValue(rUserData.name)

  // 변경해야할 변수
  const [orginName, setOriginName] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [originImage, setOriginImage] = useState(null);

  // 이미지 수정하기
  const handleChangeImage = e => {
    const file = e.target.files[0];
    if (file) {
      // 전송용 파일
      editForm.setValue("image", file);
      // file 을 미리보기로 만든다.
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  // FB 데이터 업데이트
  const handleClickUpdate = async data => {
    // 업데이트 할 내용을 모아준다.
    // 아래는 DB 를 업데이트 할 내용
    const update = {};
    if (data.name != orginName) {
      update.name = data.name;
    }
    // 새로운 이미지 파일이 있다면
    if (data.image) {
      // Storage 에 보관
      // users폴더 / 사용자폴더 / profile.png
      const imageRef = ref(storage, `users/${userCurrent?.uid}/profile.png`);
      await uploadBytes(imageRef, data.image);
      // db 에 저장하려고 파일의 URL 파악한다.
      update.imageUrl = await getDownloadURL(imageRef);
    }

    // 문서를 업데이트 한다.
    if (Object.keys(update).length > 0) {
      // 문서 만들고 업데이트 실행
      const userDoc = doc(db, "users", userCurrent?.uid);
      await updateDoc(userDoc, update);
      const nowData = { ...rUserData, ...update };
      console.log("업데이트된 문서내용 : ", nowData);
      setRUserData(nowData);
    }
    alert("정보가 수정 되었습니다.");
    navigate("/profile");
  };
  // 비밀번호 변경
  const handleChangePass = async data => {
    try {
      // 사용자 인증 중 비밀번호 업데이트
      if (data.pw) {
        try {
          await updatePassword(userCurrent, data.pw);
          alert("비밀번호가 수정 되었습니다.");
        } catch (error) {
          console.log("비밀번호 업데이트 중 오류가 발생하였습니다.", error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  // 초기값 설정
  useEffect(() => {
    if (rUserData) {
      editForm.setValue("name", rUserData.name);
      // 기존 이름을 보관
      setOriginName(rUserData.name);
      editForm.setValue("email", rUserData.email);
      setPreviewImage(rUserData.imageUrl || "");
      // 이미지 변경을 고려해서 기존 내용 보관
      setOriginImage(rUserData.imageUrl || "");
    }
  }, [rUserData]);

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-gray-100 py-10">
        <h2 className="text-2xl font-bold mb-4">프로필 수정</h2>

        <form onSubmit={editForm.handleSubmit(handleClickUpdate)}>
          <div className="p-4 bg-white shadow-md rounded w-80">
            <div className="mb-2">
              <label className="block text-gray-700">이름</label>
              <input
                type="text"
                // value={name}
                // onChange={e => setName(e.target.value)}
                {...editForm.register("name")}
                placeholder="이름"
                className="mt-1 p-2 border border-gray-300 rounder w-full"
              />
              {editForm.formState.errors.name && (
                <span className="text-red-500 mb-4">
                  {editForm.formState.errors.name.message}
                </span>
              )}
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">이메일</label>
              <input
                type="email"
                // value={email}
                {...editForm.register("email")}
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
            <div className="flex space-x-2">
              <button
                type="submit"
                // onClick={() => {
                //   handleClickUpdate();
                // }}
                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
              >
                수정
              </button>
              <button className="p-2 bg-gray-400 text-white rounded hover:bg-gray-500 w-full">
                취소
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="flex flex-col items-center justify-center bg-gray-100 py-10">
        <h2 className="text-2xl font-bold mb-4">비밀번호 수정</h2>
        <form onSubmit={passForm.handleSubmit(handleChangePass)}>
          <div className="p-4 bg-white shadow-md rounded w-80">
            <div className="mb-2">
              <label className="block text-gray-700">새 비밀번호</label>
              <input
                type="password"
                // value={pw}
                // onChange={e => setPw(e.target.value)}
                {...passForm.register("pw")}
                placeholder="새 비밀번호"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
              {passForm.formState.errors.pw && (
                <span className="text-red-500 mb-4">
                  {passForm.formState.errors.pw.message}
                </span>
              )}
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">비밀번호 확인</label>
              <input
                type="password"
                // value={confirmPw}
                // onChange={e => setConfirmPw(e.target.value)}
                {...passForm.register("confirmPw")}
                placeholder="비밀번호 확인"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
              {passForm.formState.errors.confirmPw && (
                <span className="text-red-500 mb-4">
                  {passForm.formState.errors.confirmPw.message}
                </span>
              )}
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                // onClick={() => {
                //   handleClickUpdate();
                // }}
                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
              >
                수정
              </button>
              <button className="p-2 bg-gray-400 text-white rounded hover:bg-gray-500 w-full">
                취소
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
