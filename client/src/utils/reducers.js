import { createReducer } from '@reduxjs/toolkit';

import {
    ADD_SALE_ITEM,
    SHOW_DATE_WARNING,
    HIDE_DATE_WARNING,
    TOGGLE_INTERESTED_IN,
    REMOVE_SALE_ITEM
} from './actions'

const initialState = {
    sales: [],
    dateWarning: "hidden",
    savedSales: []
}


export const reducer = createReducer(initialState, (builder) => {
    builder
        .addCase(ADD_SALE_ITEM, (state, action) => {
            if (action?.sale._id) {
                state.sales.push(action.sale)
            } else {
                state.sales.push(
                    action
                )
            }
        })
        .addCase(REMOVE_SALE_ITEM, (state, action) => {
            state.sales = state.sales.filter(({_id}) => _id !== action._id)
        })
        .addCase(SHOW_DATE_WARNING, (state, action) => {
            state.dateWarning = "visible"
        })
        .addCase(HIDE_DATE_WARNING, (state, action) => {
            state.dateWarning = "hidden"
        })
        .addCase(TOGGLE_INTERESTED_IN, (state, action) => {
            console.log(action)
            if (action.isInterested) {
                state.savedSales = state.savedSales.filter(({_id}) => _id !== action.sale._id)
            } else {
                state.savedSales.push(action.sale)
            }
        })
})