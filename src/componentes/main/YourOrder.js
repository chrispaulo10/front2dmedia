import React, { useState } from 'react';
import {Row, Col} from 'reactstrap';
import {useSelector, useDispatch} from 'react-redux';
import {removeItem} from '../../store/cart';

export default function YourOrder() {
    const cart = useSelector(state => state.cart);

    const dispatch = useDispatch();
    const [qtd,setQtd] = useState(1);

    function addQtd(){
    setQtd(qtd+1);
    }

    function rmQtd(){
    setQtd(qtd-1);
    }

    let testand = cart.map(teste => teste.priceTotal);

    var total = testand.reduce((total, numero) => total + numero, 0);

    function removeItemCart(id){
        dispatch(removeItem(id));
    }
    
    
    return(
        <div>
            <div className="your-order wow bounceInRight mt-5" data-wow-delay="0.2s" data-wow-duration="1.1s">
                    <h3><i className="fas fa-coins"></i> Orçamento</h3>
                    <div className="">
                    <ul className="list-group list-group-flush">
                    {cart.length === 0 ?
        (
        <li className="list-group-item item-orcamento text-center">  
        <h6>  Sem itens no orçamento </h6>
        </li>
        ) : (
        <React.Fragment>
            <li className="list-group-item item-orcamento">
            <input type="text" className="form-control" placeholder="Cliente"/>
            </li>
            {cart.map((cart,index) => 
                <li key={index} className="list-group-item item-orcamento">
                <div className="d-flex w-100 justify-content-between">
                    <h6>{cart.cat} - {cart.produto.product_name} </h6>
                    <small onClick={() => removeItemCart(index)}><i className="fas fa-trash"></i></small>
                </div>
                <div className="mb-2">
                    {cart.adicionais.map((extra) =>
                    <small className="text-uppercase text-justify">
                    {extra.group} : {extra.name} / &nbsp;
                    </small>                      
                )}
                </div>
                <Row>
                    <Col>
                    <small>Qtd: &nbsp;
                        <i className="fas fa-minus-circle text-danger" onClick={rmQtd}></i> &nbsp;
                        <span> {cart.quantidade} </span> &nbsp;
                        <i className="fas fa-plus-circle text-success" onClick={addQtd}></i>
                    </small>
                    </Col>
                    <Col>
                    <h6 className="float-right">R$ {parseInt(cart.produto.price,10) + cart.priceExtras}  </h6>
                    </Col>
                </Row>
                </li>
                
            )}
            <li className="list-group-item item-orcamento">
                <div className="d-flex w-100 justify-content-between">
                    <h6>Subtotal: </h6>
                    <h6>R$ {total}</h6> 
                </div>
            </li>
            <center>
                <button className="glossy_button">Finalizar</button>
            </center>
        </React.Fragment>
        ) 
    }
    </ul>
                    </div>
                </div>
            </div>
    );
}