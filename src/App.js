import { Navigate, Route, Routes } from "react-router-dom";
import { useRecoilState } from "recoil";
import { recoil_UserData } from "./atoms/userAtom";
import EditProfile from "./components/EditProfile";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Todo from "./components/Todo";
import FindPass from "./components/FindPass";
import Loading from "./components/Loading";
import useAuth from "./hooks/useAuth";
import TodoList from "./components/TodoList";
import TodoAdd from "./components/TodoAdd";
import TodoEdit from "./components/TodoEdit";

const App = () => {
  const { isLoading } = useAuth();
  const [rUserData, setRUserData] = useRecoilState(recoil_UserData);

  // 로그인이 되어 있는 경우인지, 아니면 로그인이 필요한지
  // 체크를 하는 동안 보여줄 컴포넌트를 배치하자.
  if (isLoading) {
    return <Loading />;
  }

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
                  <TodoList />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/add-todo"
              element={
                <ProtectedRoute>
                  <TodoAdd />
                </ProtectedRoute>
              }
            ></Route>

            <Route
              path="/edit-todo/:id"
              element={
                <ProtectedRoute>
                  <TodoEdit />
                </ProtectedRoute>
              }
            ></Route>
          </Routes>
        </>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/findpass" element={<FindPass />} />
            {/* 모든 경로는 로그인으로 이동 */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </>
      )}
    </>
  );
};

export default App;
