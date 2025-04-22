import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import {Provider} from "react-redux";
import Store from "../src/utils/ReduxStore";
const App = () => {
  return(
    <>
    <Provider store={Store}>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </Provider>
    </>
  )
}

export default App;