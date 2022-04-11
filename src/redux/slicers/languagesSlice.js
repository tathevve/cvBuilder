import { createSlice } from '@reduxjs/toolkit';

const name = 'APP';

const initialState = {
  isShown: true,
  languagesInfo:
    [
      {
        id: Math.random(),
        name: "",
        level:"", 
      }
    ]

};


const languagesSlice = createSlice({
  name,
  initialState,
  reducers: {
    setLanguagesInfo(state, { payload }) {
      state.languagesInfo = payload;
    },
    setIsShown(state, {payload}) {
      state.isShown = payload;
    }
  },

});

export const { setLanguagesInfo } = languagesSlice.actions;
export const { setIsShown } = languagesSlice.actions;


export const selectLanguage = (state) => state.languages.languagesInfo;
export const selectIsShown = (state) => state.languages.isShown;


export default languagesSlice.reducer;

