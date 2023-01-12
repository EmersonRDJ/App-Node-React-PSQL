import { configureStore } from "@reduxjs/toolkit";

import tableHeaderReducer from './slices/tableHeaderSlice'
import tableContentReducer from './slices/tableContentSlice'

export const store = configureStore({
    reducer: {
        tableHeader: tableHeaderReducer,
        tableContent: tableContentReducer
    }
})