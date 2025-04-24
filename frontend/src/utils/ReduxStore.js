import {configureStore} from "@reduxjs/toolkit";
import userSliceReducer from "./userSlice";
import feedReducer from "./feedSlice";
import requestReducer from "./requestSlice";

const Store = configureStore({
    reducer:{
      userSlice : userSliceReducer,
      feedSlice : feedReducer,
      requestSlice : requestReducer,
    }
})

export default Store;