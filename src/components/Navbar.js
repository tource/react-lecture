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
  }, [userData]);

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
