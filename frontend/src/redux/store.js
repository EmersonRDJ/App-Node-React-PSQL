import { configureStore } from "@reduxjs/toolkit";

import tablesReducer from './slices/tablesSlices'
import tableHeaderReducer from './slices/tableHeaderSlice'
import tableContentReducer from './slices/tableContentSlice'

export const store = configureStore({
    reducer: {
        tables: tablesReducer,
        tableHeader: tableHeaderReducer,
        tableContent: tableContentReducer
    }
})