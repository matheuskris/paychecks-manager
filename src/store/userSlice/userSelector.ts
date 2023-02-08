import { RootReducer } from "../store";

export const selectUser = (state: RootReducer) => state.userStatePH.user;

export const selectUserInfo = (state: RootReducer) =>
  state.userStatePH.userInfo;
