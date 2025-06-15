import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isAuthenticated : true
}
const authSlice = createSlice({
    name:'isAuthenticated',
    initialState,
    reducers:{
        setIsAuthenticated:(state,action)=>{
            state.isAuthenticated = action.payload
        }
    }
})


  export const {setIsAuthenticated} = authSlice.actions
  export default authSlice.reducer