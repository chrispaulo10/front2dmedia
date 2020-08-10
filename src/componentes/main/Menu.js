import React, {useEffect, useState} from 'react';
import Accordion from './Accordion';
import Product from './Product';
import {addItem} from '../../store/cart';
import {useDispatch } from 'react-redux';
import axios from '../../server/axios';


export default function Menu() {

    const [all, setAll] = useState([]);

    useEffect(() => {
        axios.get('ControllerCategoria.php?consultar_categoria_produtos&id_proprietario=1').then(
            response => {
            setAll(response.data);
        })
    }, [])

    const dispatch = useDispatch();

    function addItemCart(product, categoriaa){
        let passe = {
            produto : product,
            quantidade : 1,
            cat : categoriaa,

        }
        dispatch(addItem(passe))
    }    

    return(
        <div>
        <div className="mt-5 mb-2">
        <div className="input-group mb-3 mt-4">
                <input type="text" className="form-control" placeholder="Digite o que você precisa" aria-label="Recipient's username" aria-describedby="button-addon2" />
                <div className="input-group-append">
                    <button className="btn btn-purple" type="button" id="button-addon2">
                        <i className="fas fa-search"></i>
                    </button>
                </div>
                </div>
        </div>
        {all.map((item) => (

            <Accordion key={item.id_categoria} category={item.nome_categoria} 
            content={
                <div className="row mt-3">
                    {item.produtos.map(product => <Product key={product.id_produto} categoria={item.nome_categoria} product={product}
                    addItemCart={addItemCart} /> )}
                </div>
            } />)
        )}

        </div>
    );    
}