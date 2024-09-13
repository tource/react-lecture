import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { recoil_UserData } from "../atoms/userAtom";
import { auth, db } from "../firebaseConfig";

const useAuth = () => {
  const [userCurrent, setUserCurrent] = useState(null); // FB 사용자 인증 정보
  const [rUserData, setRUserData] = useRecoilState(recoil_UserData); // 사용자 정보를 Recoil 에 저장함
  const [isLoading, setIsLoading] = useState(true); // 로딩은 상태읽기, FB 정보읽기, 새로고침시 필요함
  const [error, setError] = useState(null); // 에러가 발생하면 에러메시지를 관리함.
  const [uid, setUid] = useState(null);
  // 사용자 정보를 읽어들임
  const fetchUserData = async who => {
    if (!who) {
      return;
    }
    // 사용자 UID 보관
    setUid(who.uid);

    const userInfoGetDoc = doc(db, "users", who.uid);
    const docSnap = await getDoc(userInfoGetDoc);
    if (docSnap.exists()) {
      setRUserData(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    // Firebase 실시간 인증상태 감지진행
    const onAuth = onAuthStateChanged(auth, async who => {
      setIsLoading(true); // 로딩창을 보여줌.

      if (who) {
        // who == auth.currentUser 이다.
        setUserCurrent(who);
        // DataBase 에 진입해서 사용자 정보관련 내용을 읽어들인다.
        await fetchUserData(who);
      } else {
        // 로그아웃 실시간 처리
        setRUserData(null);
        setUserCurrent(null);
      }

      setIsLoading(false); // 로딩 완료한다.
    });

    return () => onAuth();
  }, []);

  return {
    // userData,
    // setUserData,
    userCurrent,
    setUserCurrent,
    isLoading,
    uid,
  };
};
export default useAuth;
