import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import tablesReducer from './slices/tablesSlices'
import tableHeaderReducer from './slices/tableHeaderSlice'
import tableContentReducer from './slices/tableContentSlice'

const store = configureStore({
    reducer: {
        tables: tablesReducer,
        tableHeader: tableHeaderReducer,
        tableContent: tableContentReducer
    }
})

export const wrapper = createWrapper(store)