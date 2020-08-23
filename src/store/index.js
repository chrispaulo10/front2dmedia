import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './cart';
import isOpenModal from './extras';
import isOpenModal2 from './modal2';
import addressReducer from './address';

export default configureStore({
    reducer: {
        isOpen2 : isOpenModal2,
        isOpen : isOpenModal,
        cart : cartReducer,
        address : addressReducer,
    }
});