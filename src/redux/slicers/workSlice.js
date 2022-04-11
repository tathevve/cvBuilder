import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const name = 'APP';

const initialState = {
  isShown: true,
  workingInfo:
    [
      {
        id: 5,
        name: "",
        role: "",
        jobStart: null,
        jobEnd: null,
        description: "",

      }
    ]

};


const workSLice = createSlice({
  name,
  initialState,
  reducers: {
    setWorkingInfo(state, { payload }) {
      state.workingInfo = payload;
    },
    setIsShown(state, {payload}) {
      state.isShown = payload;
    }
  },

});

export const { setWorkingInfo } = workSLice.actions;
export const { setIsShown } = workSLice.actions;


export const selectWorkingUser = (state) => state.work.workingInfo;
export const selectIsShown = (state) => state.work.isShown;

export default workSLice.reducer;

