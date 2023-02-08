import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPaychecks } from "../../utils/firebaseStorage.utils";
import { Paycheck } from "../../components/TableAdmin";

type HoleritsState = {
  readonly holerits: Paycheck[];
  readonly isLoading: boolean;
  readonly error: boolean;
};

const initialState: HoleritsState = {
  holerits: [],
  isLoading: false,
  error: false,
};

export const fetchHoleritsData = createAsyncThunk(
  "holerits/fetchData",
  async (paychecksListPeriods: string[]): Promise<Paycheck[]> => {
    try {
      const newPaychecks = await Promise.all(
        paychecksListPeriods.map((period) => {
          console.log(period);
          return getPaychecks(period);
        })
      );
      const arr: Paycheck[] = [];
      console.log(newPaychecks);
      return arr.concat(...newPaychecks);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const holeritsSlice = createSlice({
  name: "holeritsState",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHoleritsData.fulfilled, (state, action) => {
      state.holerits = action.payload;
      state.isLoading = false;
      state.error = false;
    }),
      builder.addCase(fetchHoleritsData.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      }),
      builder.addCase(fetchHoleritsData.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export default holeritsSlice.reducer;
