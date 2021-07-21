import { createReducer } from '@reduxjs/toolkit';

import {
    ADD_SALE_ITEM,
    SHOW_DATE_WARNING,
    HIDE_DATE_WARNING
} from './actions'

const initialState = {
    sales: [],
    dateWarning: "hidden"
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
})