import { createBrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import App from "./App";
import Home from "./components/Home";
import Feed from "./components/Feed";
import EditProfile from "./components/EditProfile";
import Profile from "./components/Profile";
import Connections from "./components/Connections";
import Requests from "./components/Requests";

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[{
      path:"",
      element:<Home/>
    },
    {
      path:"/feed",
      element:<Feed/>
    },
    {
      path:"/profile",
      element:<Profile/>
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path:"/connections",
      element:<Connections/>
    },
    {
      path:"/request",
      element:<Requests/>
    }] 
  }
]);

export default router;
