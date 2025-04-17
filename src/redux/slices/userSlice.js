import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    nickname: '',
    avatar: null,
    personalityType: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setProfile: (state, action) => {
            const { nickname, avatar, personalityType } = action.payload;
            state.nickname = nickname;
            state.avatar = avatar;
            state.personalityType = personalityType;
        },
    },
});

export const { setProfile } = userSlice.actions;

export default userSlice.reducer;
