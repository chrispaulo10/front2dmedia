import React, { useState } from 'react';
import {Row, Col} from 'reactstrap';
import {useSelector, useDispatch} from 'react-redux';
import {removeItem} from '../../store/cart';

export default function YouOrderMobile() {
  
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
    
    return (
        <ul className="shadow-lg list-group">
        
        {cart.length === 0 ?
        (
        <li className="list-group-item text-center">  
        <h6>  Sem itens no carrinho </h6>
        </li>
        ) : (
          <React.Fragment>
            {cart.map((cart,index) => 
                <div key={index}>
                <li className="list-group-item">
                  <div className="d-flex w-100 justify-content-between">
                    <h6>{cart.cat} - {cart.produto.nome_produto} </h6>
                    <small onClick={() => removeItemCart(index)}><i className="fas fa-trash"></i></small>
                  </div>
                  <div className="mb-2">
                  </div>
                  <Row>
                    <Col>
                      <h6>Qtd: &nbsp;
                        <i className="fas fa-minus-circle text-danger" onClick={rmQtd}></i> &nbsp;
                        <span> {cart.quantidade} </span> &nbsp;
                        <i className="fas fa-plus-circle text-success" onClick={addQtd}></i>
                      </h6>
                    </Col>
                    <Col>
                      <h6 className="float-right">R$ {parseFloat(cart.produto.preco)}  </h6>
                    </Col>
                  </Row>
                </li>
                </div> 
            
            )}

            <li className="list-group-item">
              <div className="d-flex w-100 justify-content-between">
                <h6>Subtotal: </h6>
                <h6>R$ {total}</h6> 
              </div>
            </li>
            <li className="list-group-item text-center subtotal-mobile">
                <h6>Finalizar orçamento</h6>            
            </li>
          </React.Fragment>
        ) 
        }
      </ul>
    );
}