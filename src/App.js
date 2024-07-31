import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import After from "./pages/member/After";

const App = () => {
  return (
    <BrowserRouter>
      <Login />
      <Routes>
        <Route path="/member/kko" element={<After />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
