import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getPaychecks,
  getProjectsList,
} from "../../utils/firebaseStorage.utils";
import { Paycheck } from "../../components/TableAdmin";

export type Project = {
  id: string;
  projectName: string;
};

type ProjectsListState = {
  readonly projects: Project[];
  readonly isLoading: boolean;
  readonly error: boolean;
};

const initialState: ProjectsListState = {
  projects: [],
  isLoading: false,
  error: false,
};

export const fetchProjectsList = createAsyncThunk(
  "projects/fetchList",
  async () => {
    const projectsList = await getProjectsList();
    return projectsList;
  }
);

export const projectsListSlice = createSlice({
  name: "projectsListState",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProjectsList.fulfilled, (state, action) => {
      state.projects = action.payload;
      state.isLoading = false;
      state.error = false;
    }),
      builder.addCase(fetchProjectsList.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      }),
      builder.addCase(fetchProjectsList.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export default projectsListSlice.reducer;
