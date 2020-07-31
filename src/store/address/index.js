import { createAction, createReducer } from '@reduxjs/toolkit';

const INITIAL_STATE = [
    {
        street : "Retirar no estabelecimento - Rua São Teste",
        number : "155",
        neighborhood : "Guabiraba",
        rate : 0.00,
    },
    {
        street : "Rua Cel Antonio B",
        number : "150",
        neighborhood : "Parque Santa Fé",
        rate : 12.00,
    }
]

export const addAddress = createAction('ADD_ADDRESS');

export default createReducer(INITIAL_STATE, {
    [addAddress.type] : (state, action) => [...state , action.payload],
});