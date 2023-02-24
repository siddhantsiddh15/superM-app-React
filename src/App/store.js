import {configureStore} from '@reduxjs/toolkit';

import { cartSlice } from '../Features/cartSlice';


const store = configureStore({
    reducer: cartSlice.reducer
})

export default store;

