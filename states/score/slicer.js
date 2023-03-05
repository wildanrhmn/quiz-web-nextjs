import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";

const scoreSlicer = createSlice({
    name: 'score',
    initialState: {
        totalScore : 0,
    },
    reducers:{
        AddScore(state, action){
            return produce(state, draftState => {
                draftState.totalScore = action.payload
            })
        }
    }
})

export const { actions, reducer } = scoreSlicer

export const { AddScore } = actions

export default reducer;