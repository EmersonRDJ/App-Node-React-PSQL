import {
    combineReducers,
    configureStore,
  } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import tablesReducer from './slices/tablesSlices'
import currTableReducer from './slices/currTableSlice'
import tableHeaderReducer from './slices/tableHeaderSlice'
import tableContentReducer from './slices/tableContentSlice'

const combinedReducer = combineReducers({
    tables: tablesReducer,
    currTable: currTableReducer,
    tableHeader: tableHeaderReducer,
    tableContent: tableContentReducer
});
  
  const reducer = (state, action) => {
    if (action.type === HYDRATE) {
      const nextState = {
        ...state,
        ...action.payload,
      };
      return nextState;
    } else {
      return combinedReducer(state, action);
    }
  };
  
  export const makeStore = () =>
    configureStore({
      reducer,
    });
  
  export const wrapper = createWrapper(makeStore, { debug: false });
  