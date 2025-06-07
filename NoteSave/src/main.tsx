import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// Entry point 
createRoot(document.getElementById("root")!).render(
  <App />
);
