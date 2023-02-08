import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { User } from "firebase/auth";

type UserInfo = {
  name: string;
  role: string;
  numberRegistration: string;
} | null;

export type UserState = {
  user: User | null;
  userInfo: UserInfo;
};

const initialState: UserState = {
  user: null,
  userInfo: null,
};

export const userSlice = createSlice({
  name: "userStatePH",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    setUserInfo(state, action: PayloadAction<UserInfo>) {
      state.userInfo = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    },
  },
});

export const { setUser, setUserInfo } = userSlice.actions;

export default userSlice.reducer;
