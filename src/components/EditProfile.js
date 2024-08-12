import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { auth, db, storage } from "../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updatePassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { recoil_UserCurrent, recoil_UserData } from "../atoms/userAtom";

const EditProfile = () => {
  const navigate = useNavigate();
  // 커스텀 훅 사용
  const { userCurrent } = useAuth();
  // console.log("EditProfile userCurrent : ", userCurrent);

  // FB 사용자 인증 정보
  // const [rUserCurrent, setRUserCurrent] = useRecoilState(recoil_UserCurrent);
  // 사용자 정보를 저장함
  const [rUserData, setRUserData] = useRecoilState(recoil_UserData);

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
      const nowData = { ...rUserData, ...update };
      console.log("업데이트된 문서내용 : ", nowData);
      // setUserData(nowData);
      setRUserData(nowData);
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
    if (rUserData) {
      setName(rUserData.name);
      // 기존 이름을 보관
      setOriginName(rUserData.name);
      setEmail(rUserData.email);
      setPreviewImage(rUserData.imageUrl || "");
      // 이미지 변경을 고려해서 기존 내용 보관
      setOriginImage(rUserData.imageUrl || "");
    }
  }, [rUserData]);

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
