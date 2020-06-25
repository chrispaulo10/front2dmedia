import { configureStore } from '@reduxjs/toolkit';

import productReducer from './products';
import cartReducer from './cart';

export default configureStore({
    reducer: {
        products: productReducer,
        cart : cartReducer,
    }
});