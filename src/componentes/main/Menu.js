import React, {useEffect, useState} from 'react';
import {ListGroup} from 'reactstrap';
import Accordion from './Accordion';
import Product from './Product';
import {addItem} from '../../store/cart';
import {useDispatch } from 'react-redux';
import axios from '../../server/axios';
import { showModal } from '../../store/extras';
import Extras from './Extras';


export default function Menu() {


    const [componentExtra, setComponentExtra] = useState(0);

    const [all, setAll] = useState([]);

    useEffect(() => {
        axios.get('/user/categoryProducts/2').then(
            response => {
            setAll(response.data);
        })
    }, [])

    const [categoriaa,setCategoriaa] = useState();
    const [produto,setProduto] = useState();

    const dispatch = useDispatch();

    function addItemCart(product){
        dispatch(addItem(product))
    }    

    function abrirModal(product, categoria){

        if (product.id > 10) {

            addItemCart(product);
            setProduto(product);

        } else {
            setProduto(product);
            setCategoriaa(categoria)
            setComponentExtra(1)
            dispatch(showModal());
        } 
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

            <Accordion key={item.id_category} category={item.category} 
            content={
                <ListGroup className="mt-3">
                    {item.products.map(product => <Product key={product.id} categoria={item.category} product={product}
                    abrirModal={abrirModal} /> )}
                </ListGroup>
            } />)
        )}

            {componentExtra === 1 ? <Extras produto={produto} categoriaa={categoriaa} /> : ("")}

        </div>
    );    
}