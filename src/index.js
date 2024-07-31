import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
// js 버전
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
