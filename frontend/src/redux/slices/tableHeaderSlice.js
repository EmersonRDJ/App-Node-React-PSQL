import { createSlice } from '@reduxjs/toolkit'
import { fetchObj } from '../data/fetchObj'

const tableHeaderSlice = createSlice({
  name: 'tableHeader',
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

export const { setData, setLoading, setError } = tableHeaderSlice.actions;

export const fetchHeaderData = (param) => async (dispatch) => {
  try {
    const res = await fetch(`${global.backendUrl}/table/infos/${param}/`, { method: 'GET' });
    const data = await res.json();
    dispatch(setData(data));
  } catch (err) {
    dispatch(setError(err.message));
  }
};

export default tableHeaderSlice.reducer
