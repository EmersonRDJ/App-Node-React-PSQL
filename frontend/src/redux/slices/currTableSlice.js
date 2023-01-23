import { createSlice } from '@reduxjs/toolkit'

const tablesSlice = createSlice({
  name: 'currTable',
  initialState: { tableName: '' },
  reducers: {
    setData: (state, action) => {
      console.log('action.payload', action.payload)
      state.tableName = action.payload;
      localStorage.setItem('currTable', JSON.stringify(action.payload));
      console.log(localStorage.getItem('currTable'))
    },
    setFromLocalStorage: (state) => {
      const payload = localStorage.getItem('currTable')
      if(payload) setData(payload)
    }
  },
});

export const { setData, setFromLocalStorage } = tablesSlice.actions;

export default tablesSlice.reducer
