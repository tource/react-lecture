import { useState } from "react";
import "./App.css";
import PostAdd from "./pages/PostAdd";
import PostList from "./pages/PostList";
import PostUpdate from "./pages/PostUpdate";

function App() {
  const [item, setItem] = useState(null);
  return (
    <div>
      <h1> APP 컴포넌트</h1>
      <PostList setItem={setItem} />
      <PostUpdate item={item} />
      <PostAdd />
    </div>
  );
}

export default App;
