import { Navigate, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { recoil_UserData } from "../atoms/userAtom";

const ProtectedRoute = ({ children }) => {
  // const userCurrent = useAuth(); // 사용자 정보를 저장함
  const [rUserData, setRUserData] = useRecoilState(recoil_UserData);
  const location = useLocation();
  console.log("location ", location);
  return rUserData ? children : <Navigate to={location.pathname} />;
};

export default ProtectedRoute;
