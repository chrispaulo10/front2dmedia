import { createStore } from 'redux';

const INITIAL_STATE = [
    {
        img : 'https://img.stpu.com.br/?img=https://s3.amazonaws.com/pu-mgr/default/a0R0f0000104pMhEAI/5d03d089e4b0fc44d6f4ffd5.jpg&w=710&h=462',
        name : 'Mista',
        description : 'Calabresa, Oreo, Amendoim ',
        price : '25.00',
    },
    {
        img : 'https://img.cybercook.com.br/imagens/receitas/619/massa-de-pizza-para-microondas-2.jpeg',
        name : 'Calabresa',
        description : 'Calabresa, blabla, cristian, deu tudo certo ',
        price : '20.00',
    },
];

function reducer(state = INITIAL_STATE, action){
    return state;
}

export default createStore(reducer);