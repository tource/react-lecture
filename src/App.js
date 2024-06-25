import { Home } from "./pages/Home";
import "./App.css";

const App = () => {
  // js 자리
  const WrapStyle = { backgroundColor: "red", fontSize: "12px" };

  return (
    <div className="wrap" style={WrapStyle}>
      <Home />
    </div>
  );
};

export default App;
