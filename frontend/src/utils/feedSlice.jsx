import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name:"feedSlice",
    initialState:[],
    reducers:{
        addUserToFeed:(state,action) => {
            return action.payload;
        },
        removeUserFromFeed:(state,action) => {
            const newFeed = state.filter((user) => user.id != action.payload);
            return newFeed
        }
    }
})

export const{addUserToFeed,removeUserFromFeed} = feedSlice.actions;
export default feedSlice.reducer;