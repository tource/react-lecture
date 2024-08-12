import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, storage, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useRecoilState } from "recoil";
import { recoil_UserCurrent, recoil_UserData } from "../atoms/userAtom";

const useAuth = () => {
  // FB 사용자 인증 정보
  const [userCurrent, setUserCurrent] = useState(null);
  // 사용자 정보를 저장함
  // const [userData, setUserData] = useState(null);

  // FB 사용자 인증 정보
  // const [rUserCurrent, setRUserCurrent] = useRecoilState(recoil_UserCurrent);
  // 사용자 정보를 저장함
  const [rUserData, setRUserData] = useRecoilState(recoil_UserData);

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
      // setUserData(docSnap.data());
      setRUserData(docSnap.data());
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
      //console.log("인증 실시간 결과 알려줌. onAuthStateChanged ", who);

      if (who) {
        // console.log(who);
        // console.log(auth.currentUser);
        // who == auth.currentUser 이다.
        setUserCurrent(who);

        // 이놈이 문제 입니다.
        // (Firebase Auth 관련 문제로 보여짐)
        // setRUserCurrent(who);

        // const uid = who.uid;
        // DataBase 에 진입해서 사용자 정보관련 내용을 읽어들인다.
        await fetchUserData(who);
      } else {
        // 로그아웃 실시간 처리
        // setUserData(null);
        setRUserData(null);
        setUserCurrent(null);
        // setRUserCurrent({});
      }
    });

    // 클린업 함수
    return () => onAuth();
  }, []);

  return {
    // userData,
    // setUserData,
    userCurrent,
    setUserCurrent,
  };
};
export default useAuth;
