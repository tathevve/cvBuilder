import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const name = 'APP';

const initialState = {
    userInfo:
      {
        id:1,
        firstName: " ",
        lastName:" ",
        subtitle: " ",
        firstAddress: " ",
        secondAddress:" ",
        phoneNumber:" ",
        email:" ",
        objective:" ",
      }
      
    
  };


const personalSlice = createSlice({
    name,
    initialState,
    reducers:{ 
        setUserInfo(state, {payload}) {
           state.userInfo = payload;
         }
        },
    
  }); 
    
export const {setUserInfo} = personalSlice.actions;

export const selectUser = (state) => state.personal.userInfo;
  
export default personalSlice.reducer;

