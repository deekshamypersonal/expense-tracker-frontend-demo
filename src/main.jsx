import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename={"/expense-tracker-frontend-demo/"}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
