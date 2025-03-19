import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    token: string | null;
    user: {
        sub: string;
        roles: string[];
    } | null;
}

const initialState: AuthState = {
    token: localStorage.getItem("token") || null,
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<{ token: string; decoded: { sub: string; roles: string[] } }>) => {
            state.token = action.payload.token;
            state.user = action.payload.decoded;
            localStorage.setItem('auth', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem('auth');
        }
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
