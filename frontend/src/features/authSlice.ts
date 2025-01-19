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

export const login = createAsyncThunk(
    'auth/login',
    async ({ loginValue, password }: { loginValue: string; password: string }) => {
        const res = await axios.post('/api/auth/login', { loginValue, password })
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('login', res.data.login)
        return res.data.token
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
        logout(state) {
            state.token = null
            state.login = null
            localStorage.removeItem('token')
            localStorage.removeItem('login')
        }
    },
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.token = action.payload
        })
    }
})

export const { logout } = authSlice.actions
export default authSlice.reducer
