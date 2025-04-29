import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requestSlice",
  initialState: [],
  reducers: {
    addRequests: (state, action) => {
      return action.payload;
    },
    removeRequests : (state,action) => {
      const newArray = state.filter(r => r.id != action.payload);
      return newArray;
    }
  }
});

export const { addRequests,removeRequests } = requestSlice.actions;

export default requestSlice.reducer;
