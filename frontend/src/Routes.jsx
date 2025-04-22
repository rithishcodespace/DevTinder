import { createBrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import App from "./App";
import Home from "./components/Home";

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[{
      path:"",
      element:<Home/>
    }] 
  },
  {
    path: "/login",
    element: <Login />,
  }
]);

export default router;
