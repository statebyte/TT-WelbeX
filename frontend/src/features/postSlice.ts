import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

export interface Post {
    id: number;
    content: string;
    mediaUrl?: string;
    author: {
        login: string;
    };
    createdAt: string;
}

interface PostState {
    posts: Post[];
}

const initialState: PostState = {
    posts: []
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const res = await axios.get('/api/posts');
    return res.data as Post[];
});

export const createPost = createAsyncThunk(
    'posts/createPost',
    async ({ content, mediaUrl }: { content: string; mediaUrl?: string }, { getState }) => {
        const state = getState() as RootState;
        const token = state.auth.token;
        const res = await axios.post('/api/posts', { content, mediaUrl }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return res.data;
    }
);

export const updatePost = createAsyncThunk(
    'posts/updatePost',
    async ({ id, content, mediaUrl }: { id: number; content: string; mediaUrl?: string }, { getState }) => {
        const state = getState() as RootState;
        const token = state.auth.token;
        const res = await axios.put(`/api/posts/${id}`, { content, mediaUrl }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return res.data;
    }
);

export const deletePost = createAsyncThunk(
    'posts/deletePost',
    async (id: number, { getState }) => {
        const state = getState() as RootState;
        const token = state.auth.token;
        await axios.delete(`/api/posts/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return id;
    }
);

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.posts = action.payload;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.posts.push(action.payload);
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                const index = state.posts.findIndex(post => post.id === action.payload.id);
                if (index !== -1) {
                    state.posts[index] = action.payload;
                }
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.posts = state.posts.filter(post => post.id !== action.payload);
            });
    }
});

export default postSlice.reducer;
