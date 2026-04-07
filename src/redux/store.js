import {configureStore} from "@reduxjs/toolkit"
import {setupListeners} from "@reduxjs/toolkit/query/react"
import { apiSlice } from "./api/apiSlice.js"
import authReducer from "./api/slices/authSlices.js"
import profileReducer from "./api/slices/profileSlices.js"
import sidebarSlice from "./api/slices/sidebarSlice.js"
// import courseSlice from "./slices/courseSlice.js"

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath] : apiSlice.reducer,
        auth: authReducer,
        profile: profileReducer,
        sidebar: sidebarSlice,
        // course: courseSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

setupListeners(store.dispatch)

export default store