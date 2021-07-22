import { createReducer } from '@reduxjs/toolkit';

import {
    ADD_SALE_ITEM,
    SHOW_DATE_WARNING,
    HIDE_DATE_WARNING,
    TOGGLE_INTERESTED_IN
} from './actions'

const initialState = {
    sales: [],
    dateWarning: "hidden",
    savedSales: []
}


export const reducer = createReducer(initialState, (builder) => {
    builder
        .addCase(ADD_SALE_ITEM, (state, action) => {
            state.sales.push(action.sale)
        })
        .addCase(SHOW_DATE_WARNING, (state, action) => {
            state.dateWarning = "visible"
        })
        .addCase(HIDE_DATE_WARNING, (state, action) => {
            state.dateWarning = "hidden"
        })
        .addCase(TOGGLE_INTERESTED_IN, (state, action) => {
            let isInterested = state.savedSales.includes(action.saleID);
            if (isInterested) {
                state.savedSales.filter((saleID) => saleID !== action.saleID)
            } else {
                state.savedSales.push(action.saleID)
            }
        })
})