import { configureStore } from "@reduxjs/toolkit";
import modalReducer from '../redux/slices/modal.slice.js'
import authReducer from '../Redux/Slices/auth.slice.js'

const appStore = configureStore({
    reducer:{
        modal:modalReducer,
        isAuthenticated:authReducer
    }
})

export default appStore