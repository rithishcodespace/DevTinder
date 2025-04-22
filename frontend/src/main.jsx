import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import "../src/index.css";
import router from "./Routes";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
