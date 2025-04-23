import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import {Provider} from "react-redux";
import Store from "../src/utils/ReduxStore";
const App = () => {
  return(
    <div className="flex flex-col min-h-screen">
    <Provider store={Store}>
      <div className="flex-grow">
      <Navbar/>
      <Outlet/>
      </div>
      <Footer/>
    </Provider>
    </div>
  )
}

export default App;