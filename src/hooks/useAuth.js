import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, storage, db } from "../firebaseConfig";

const useAuth = () => {
  const [user, setUser] = useState(false);
  // FB 는 로그인 시도를 하면 사용자의 로그인 상태를 실시간으로 변경
  useEffect(() => {
    const onAuth = onAuthStateChanged(auth, async who => {
      if (who) {
        // 로그인 실시간처리
        const uid = who.uid;
        console.log("사용자 상태가 바뀜 who : ", who);
        console.log("사용자 상태가 바뀜 uid : ", uid);
        // setUser(true);
      } else {
        // 로그아웃 실시간 처리
      }
    });

    return () => onAuth();
  }, []);

  return { user };
};
export default useAuth;
