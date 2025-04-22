import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import "../src/index.css";
import router from "./Routes";
import { RouterProvider } from "react-router-dom";
import Store from "./utils/ReduxStore";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={Store}>
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
