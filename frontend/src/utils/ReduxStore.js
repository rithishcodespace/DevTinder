import {configureStore} from "@reduxjs/toolkit";
import userSliceReducer from "./userSlice";

const Store = configureStore({
    reducer:{
      userSlice : userSliceReducer
    }
})

export default Store;