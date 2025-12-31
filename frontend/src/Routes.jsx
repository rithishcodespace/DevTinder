import { createBrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import App from "./App";
import Home from "./components/Home";
import Feed from "./components/Feed";
import EditProfile from "./components/EditProfile";
import Profile from "./components/Profile";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Chat from "./components/Chat"
import Premium from "./components/Premium";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "feed",
        element: <Feed />
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "connections",
        element: <Connections />
      },
      {
        path: "request",
        element: <Requests />
      },
      {
        path: "connections/chat/:targetUserId",
        element: <Chat />
      },
      {
        path: "premium",
        element: <Premium />
      }
    ]
  }
]);


export default router;
