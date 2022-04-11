import {combineReducers, configureStore} from '@reduxjs/toolkit';
import personalReducer from './slicers/personalSlice';
import workReducer from './slicers/workSlice';
import educationReducer from './slicers/educationSlice';
import honorsReducer from './slicers/honorsSlice';
import skillsReducer from './slicers/skillsSlice';
import hobbiesReducer from './slicers/hobbiesSlice';
import languagesSlice from './slicers/languagesSlice';




const combinedReducers = combineReducers({
  personal: personalReducer,
  work: workReducer,
  edu: educationReducer,
  honors: honorsReducer,
  skills: skillsReducer,
  hobbies: hobbiesReducer,
  languages: languagesSlice,
});


const rootReducer = (state, action) =>
  combinedReducers(state, action);

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false
  }),
});

export default store;