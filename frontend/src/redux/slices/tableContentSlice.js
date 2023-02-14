import { createSlice } from '@reduxjs/toolkit'
import { fetchObj } from '../data/fetchObj'

const tableContentSlice = createSlice({
  name: 'tableContent',
  initialState: fetchObj,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setData, setLoading, setError } = tableContentSlice.actions;

export const fetchContentData = (param) => async (dispatch) => {
  try {
    const res = await fetch(`http://localhost:8088/table/${param}/`, { method: 'GET' });
    const data = await res.json();
    dispatch(setData(data));
  } catch (err) {
    dispatch(setError(err.message));
  }
};

export default tableContentSlice.reducer
