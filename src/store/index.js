import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './cart';
import isOpenModal from './extras';
import addressReducer from './address';

export default configureStore({
    reducer: {
        isOpen : isOpenModal,
        cart : cartReducer,
        address : addressReducer,
    }
});