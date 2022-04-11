import { createSlice } from '@reduxjs/toolkit';

const name = 'APP';

const initialState = {
  isShown: true,
  educationInfo:
    [
      {
        id: Math.random(),
        name: "",
        major: "",
        grade:"",
        startDate: null,
        endDate: null,
        description: "",

      }
    ]

};


const educationSlice = createSlice({
  name,
  initialState,
  reducers: {
    setEducationInfo(state, { payload }) {
      state.educationInfo = payload;
    },
    setIsShown(state, {payload}) {
      state.isShown = payload;
    }
  },

});

export const { setEducationInfo } = educationSlice.actions;
export const { setIsShown } = educationSlice.actions;


export const selectEducation = (state) => state.edu.educationInfo;
export const selectIsShown = (state) => state.edu.isShown;


export default educationSlice.reducer;

