import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import RTKSample from "./RTKSample";
import "./index.css";
import store from "./store";
// const root = ReactDOM.createRoot(document.getElementById("root"));
const rootDiv = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootDiv);
// Redux Toolkit 저장소 공급
root.render(
  <Provider store={store}>
    <RTKSample />
  </Provider>,
);
