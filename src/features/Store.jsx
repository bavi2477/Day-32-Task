import { configureStore } from "@reduxjs/toolkit";
import Reducer from "./Slice";
export const store = configureStore({
    reducer:{
        blogs: Reducer
    },
})

export default store;