import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditProfile from "./components/EditProfile";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Todo from "./components/Todo";
import useAuth from "./hooks/useAuth";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const { user } = useAuth();
  return (
    <BrowserRouter>
      {user && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />}></Route>
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
        <Route path="*" element={<h1>경로가 잘못되었습니다.</h1>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
