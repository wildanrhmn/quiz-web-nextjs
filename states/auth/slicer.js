import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";

const authSlicer = createSlice({
    name: 'auth',
    initialState: {},
    reducers: {
        LoginAction(state, action){
            return state = action.payload
        },

        LogoutAction(state, action){
            return state = action.payload
        }
    }
    
})

export const { actions, reducer } = authSlicer

export const { LoginAction, LogoutAction } = actions

export default reducer;