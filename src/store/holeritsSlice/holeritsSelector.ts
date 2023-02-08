import { RootReducer } from "../store";

export const selectHolerits = (state: RootReducer) =>
  state.holeritsStatePH.holerits;

export const selectLoading = (state: RootReducer) =>
  state.holeritsStatePH.isLoading;

export const selectError = (state: RootReducer) => state.holeritsStatePH.error;
