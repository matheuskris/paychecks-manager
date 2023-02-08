import { RootReducer } from "../store";

export const selectProjectsList = (state: RootReducer) =>
  state.projectsListPH.projects;

export const selectListIsLoading = (state: RootReducer) =>
  state.projectsListPH.isLoading;

export const selectProjectsListError = (state: RootReducer) =>
  state.projectsListPH.error;
