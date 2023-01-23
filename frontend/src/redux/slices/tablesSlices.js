import { createSlice } from '@reduxjs/toolkit'
import { fetchObj } from '../data/fetchObj'

const tablesSlice = createSlice({
  name: 'tables',
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

export const { setData, setLoading, setError } = tablesSlice.actions;

export const fetchTablesData = (param) => async (dispatch) => {
  try {
    const res = await fetch(`${global.backendUrl}/table/infos/`, { method: 'GET' });
    const data = await res.json();
    dispatch(setData(data));
  } catch (err) {
    dispatch(setError(err.message));
  }
};

export default tablesSlice.reducer
