import { createReducer } from '@reduxjs/toolkit';

import {
    ADD_SALE_ITEM
} from './actions'

const initialState = {
    sales: []
}


export const reducer = createReducer(initialState, (builder) => {
    builder
        .addCase(ADD_SALE_ITEM, (state, action) => {
            state.sales.push(action.sale)
        })
})