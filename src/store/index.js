import { configureStore } from '@reduxjs/toolkit';

import productReducer from './products';
import cartReducer from './cart';
import openModal from './extras';
import addressReducer from './address';

export default configureStore({
    reducer: {
        products: productReducer,
        modal_open : openModal,
        cart : cartReducer,
        address : addressReducer,
    }
});