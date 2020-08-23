import {createAction, createReducer} from '@reduxjs/toolkit';

const INITIAL_STATE = false;

export const showModal2 = createAction('SHOW_MODAL2');
export const hideModal2 = createAction('HIDE_MODAL2');

export default createReducer(INITIAL_STATE,{
    [showModal2.type] : (state) => state = true,
    [hideModal2.type] : (state) => state = false,
})