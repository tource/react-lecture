import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useRecoilState } from "recoil";
import { recoil_UserCurrent, recoil_UserData } from "../atoms/userAtom";

const Navbar = () => {
  const { userCurrent, setUserCurrent } = useAuth();

  // FB 사용자 인증 정보
  // const [rUserCurrent, setRUserCurrent] = useRecoilState(recoil_UserCurrent);
  // 사용자 정보를 저장함
  const [rUserData, setRUserData] = useRecoilState(recoil_UserData);

  const navigate = useNavigate();
  const handleLogout = async () => {
    // FB 에서 로그아웃
    await signOut(auth);
    setUserCurrent(null);
    // 로그인으로 이동
    navigate("/");
  };

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
        {rUserData && (
          <li className="text-white ml-4 flex items-center">
            <Link
              to={"/profile"}
              className="flex items-center mr-4 hover:underline"
            >
              {rUserData.imageUrl ? (
                <img
                  src={rUserData.imageUrl}
                  alt="Profile Image"
                  className="w-8 h-8 rounded-full mr-2"
                />
              ) : (
                <FaUserCircle className="w-8 h-8 text-gray-200 mr-2" />
              )}
              {rUserData.name} {rUserData.email}
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
