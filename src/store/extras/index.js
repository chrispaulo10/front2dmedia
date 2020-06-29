import {createAction, createReducer} from '@reduxjs/toolkit';

const INITIAL_STATE = [false];

export const openModal = createAction('OPEN_MODAL');

export default createReducer(INITIAL_STATE,{
    [openModal.type] : (state, action) => [...state, action.payload],
})