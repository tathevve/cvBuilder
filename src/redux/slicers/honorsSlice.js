import { createSlice } from '@reduxjs/toolkit';

const name = 'APP';

const initialState = {
  isShown: true,
  honorsInfo:
    [
      {
        id: Math.random(),
        title: "",
        subtitle: "",
        description: "",

      }
    ]

};


const honorsSlice = createSlice({
  name,
  initialState,
  reducers: {
    setHonorsInfo(state, { payload }) {
      state.honorsInfo = payload;
    },
    setIsShown(state, {payload}) {
      state.isShown = payload;
    }
  },

});

export const { setHonorsInfo } = honorsSlice.actions;
export const { setIsShown } = honorsSlice.actions;


export const selectHonors = (state) => state.honors.honorsInfo;
export const selectIsShown = (state) => state.honors.isShown;


export default honorsSlice.reducer;

