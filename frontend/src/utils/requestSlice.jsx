import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requestSlice",
  initialState: [],
  reducers: {
    addRequests: (state, action) => {
      return action.payload;
    }
  }
});

export const { addRequests } = requestSlice.actions;

export default requestSlice.reducer;
