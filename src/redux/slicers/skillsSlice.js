import { createSlice } from '@reduxjs/toolkit';

const name = 'APP';

const initialState = {
  isShown: true,
  skillsInfo:
    [
      {
        id: Math.random(),
        skillType: "",
        
      }
    ]

};


const skillsSlice = createSlice({
  name,
  initialState,
  reducers: {
    setSkillsInfo(state, { payload }) {
      state.skillsInfo = payload;
    },
    setIsShown(state, {payload}) {
      state.isShown = payload;
    }
  },

});

export const { setSkillsInfo } = skillsSlice.actions;
export const { setIsShown } = skillsSlice.actions;


export const selectSkill = (state) => state.skills.skillsInfo;
export const selectIsShown = (state) => state.skills.isShown;


export default skillsSlice.reducer;

