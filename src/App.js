import { Navigate, Route, Routes } from "react-router-dom";
import { useRecoilState } from "recoil";
import { recoil_UserData } from "./atoms/userAtom";
import EditProfile from "./components/EditProfile";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Todo from "./components/Todo";

const App = () => {
  const [rUserData, setRUserData] = useRecoilState(recoil_UserData);
  return (
    <>
      {rUserData ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to={"/todo"} />}></Route>
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/edit-profile"
              element={
                <ProtectedRoute>
                  <EditProfile />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/todo"
              element={
                <ProtectedRoute>
                  <Todo />
                </ProtectedRoute>
              }
            ></Route>
          </Routes>
        </>
      ) : (
        <Login />
      )}
    </>
  );
};

export default App;
