import {configureStore} from "@reduxjs/toolkit";
import userSliceReducer from "./userSlice";
import feedReducer from "./feedSlice";

const Store = configureStore({
    reducer:{
      userSlice : userSliceReducer,
      feedSlice : feedReducer,
    }
})

export default Store;