import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    token?: string | null;
    user?: any; 
}

const initialState: AuthState = {
    token: undefined,
    user: undefined
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userLoggedIn: (state, action: PayloadAction<{ token: string; user: any }>) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        userLoggedOut: (state) => {
            state.token = undefined;
            state.user = undefined;
            localStorage.removeItem("auth");
            
        }
    }
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
