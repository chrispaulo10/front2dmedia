import { configureStore } from '@reduxjs/toolkit';

import categories from './categories';
import productReducer from './products';
import cartReducer from './cart';
import isOpenModal from './extras';
import addressReducer from './address';

export default configureStore({
    reducer: {
        categories : categories ,
        products: productReducer,
        isOpen : isOpenModal,
        cart : cartReducer,
        address : addressReducer,
    }
});