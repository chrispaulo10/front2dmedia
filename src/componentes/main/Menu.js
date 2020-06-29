import React, { useState } from 'react';
import '../bootstrap.css';
import { Collapse, ListGroup} from 'reactstrap';
import Product from './Product';
import {addItem} from '../../store/cart';
import { useSelector, useDispatch } from 'react-redux';
function Menu() {
    
    // ABRIR COLLAPSE DOS PRODUTOS
    const [collapse, setCollapse] = useState(false);

    const [status, setStatus] = useState('fas fa-angle-right');

    const onEntered = () => setStatus('fas fa-angle-down');
    
    const onExited = () => setStatus('fas fa-angle-right');

    const openProducts = () => setCollapse(!collapse);
    // FIM COLLAPSE
    
    const dispatch = useDispatch();

    // VARIÁVEL PARA CHAMAR OS PRODUTOS
    const products = useSelector(state => state.products);

    function addItemCart(product){
        dispatch(addItem(product))
    }    

    return(
        <div>
       <div className="mt-5 mb-2">
       <div className="input-group mb-3 mt-4">
            <input type="text" className="form-control" placeholder="Digite o que você precisa" aria-label="Recipient's username" aria-describedby="button-addon2" />
            <div className="input-group-append">
                <button className="btn btn-outline-danger" type="button" id="button-addon2">
                    <i className="fas fa-search"></i>
                </button>
            </div>
            </div>
        </div>
            <div onClick={openProducts} className="category mb-3">
                PIZZAS
                <span className="float-right"> <i className={status}></i> </span>
            </div>
            {/* PRODUCTS */}
            <Collapse isOpen={collapse}
                    onEntered={onEntered}
                    onExited={onExited}>
            <ListGroup>

                {/* IMPRESSÃO DOS PRODUTOS */}

                {products.map((product, index) => <Product key={index} product={product} addItemCart={addItemCart} /> )}
            </ListGroup>
            </Collapse>
        </div>
    );    
}

export default Menu;