import { createSlice } from '@reduxjs/toolkit';

const name = 'APP';

const initialState = {
  isShown: true,
  hobbiesInfo:
    [
      {
        id: Math.random(),
        hobbieType: "",
        
      }
    ]

};


const hobbiesSlice = createSlice({
  name,
  initialState,
  reducers: {
    setHobbieInfo(state, { payload }) {
      state.hobbiesInfo = payload;
    },
    setIsShown(state, {payload}) {
      state.isShown = payload;
    }
  },

});

export const { setHobbieInfo } = hobbiesSlice.actions;
export const { setIsShown } = hobbiesSlice.actions;


export const selectHobbie = (state) => state.hobbies.hobbiesInfo;
export const selectIsShown = (state) => state.hobbies.isShown;


export default hobbiesSlice.reducer;

