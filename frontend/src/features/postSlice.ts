import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../store'

export interface Post {
    id: number
    content: string
    mediaUrl: string
    createdAt: string
    author: { id: number; login: string }
}

interface PostState {
    posts: Post[]
}

const initialState: PostState = {
    posts: []
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const res = await axios.get('/api/posts')
    return res.data as Post[]
})

export const createPost = createAsyncThunk(
    'posts/createPost',
    async ({ content, mediaUrl }: { content: string; mediaUrl?: string }, { getState }) => {
        const state = getState() as RootState
        const token = state.auth.token
        const res = await axios.post('/api/posts', { content, mediaUrl }, {
            headers: { Authorization: `Bearer ${token}` }
        })
        return res.data
    }
)

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.posts = action.payload
        })
        builder.addCase(createPost.fulfilled, (state, action) => {
            state.posts!.push(action.payload)
        })
    }
})

export default postSlice.reducer
