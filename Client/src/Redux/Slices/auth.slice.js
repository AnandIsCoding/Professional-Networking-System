import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Initially null, will be set via API later
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
