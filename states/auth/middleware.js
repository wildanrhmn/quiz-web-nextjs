import handler from "@/pages/api/auth"
import { createAsyncThunk } from "@reduxjs/toolkit"
import Cookies from "js-cookie"
import { LoginAction, LogoutAction } from "./slicer"
import axios from "axios"
import { useRouter } from "next/router"

export const AsyncLogin = createAsyncThunk(
    'async/login',
    async ({ email, password }, { dispatch }) => {
        console.info(email, password)
        const data = {
            email: email,
            password: password
        }
        try{
            const response= await axios.post('/api/auth', data);
            Cookies.remove('token')
            Cookies.set('token', response.data.token)
            
            sessionStorage.setItem('Quiz-session-login', JSON.stringify(response.data.token))
            dispatch(LoginAction(response.data.token))
        } catch (err){
            console.info(err)
        }
    }
)

export const AsyncLogout = createAsyncThunk(
    'async/logout',
    async(_, { dispatch, rejectWithValue }) => {
        try{
            console.info("cheese")
            Cookies.remove('token')
            sessionStorage.clear()

            await axios.get('/api/logout')
            dispatch(LogoutAction())
            
        }catch(err){
            return rejectWithValue(err.response.data)
        }
    }
)
