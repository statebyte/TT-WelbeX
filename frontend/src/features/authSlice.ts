import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface AuthState {
    token: string | null
    login: string | null
}

const initialState: AuthState = {
    token: localStorage.getItem('token'),
    login: localStorage.getItem('login')
}

export const loginThunk = createAsyncThunk(
    'auth/login',
    async ({ login, password }: { login: string; password: string }) => {
        localStorage.removeItem('token')
        localStorage.removeItem('login')

        const res = await axios.post('/api/auth/login', { login, password })
        
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('login', res.data.login)
        return { token: res.data.token, login: res.data.login }
    }
)

export const registerUser = createAsyncThunk(
    'auth/register',
    async ({ login, password }: { login: string; password: string }) => {
        await axios.post('/api/auth/register', { login, password })
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('token')
            localStorage.removeItem('login')
            state.token = null
            state.login = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginThunk.fulfilled, (state, action) => {
            state.token = action.payload.token
            state.login = action.payload.login
        })
    }
})

export const { logout } = authSlice.actions

export default authSlice.reducer