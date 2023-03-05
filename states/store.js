import { configureStore } from "@reduxjs/toolkit";
import scoreSlicer from "./score/slicer"
import authSlicer from "./auth/slicer"
const store = configureStore({
    reducer: {
        score : scoreSlicer,
        auth : authSlicer,
    }
})

export default store