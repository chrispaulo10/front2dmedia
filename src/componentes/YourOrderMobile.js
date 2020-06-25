import React from 'react';
import '../bootstrap.css';
import {Row, Col, ListGroupItem} from 'reactstrap';
import {useSelector, useDispatch} from 'react-redux';
import {removeItem} from '../store/cart';

export default function YouOrderMobile() {
  
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const qtd = 2;

    function removeItemCart(id){
      dispatch(removeItem(id));
    }
    
    return (
        <ul className="shadow-lg list-group">
        
        {cart.length === 0 ?
        (
        <li className="list-group-item">
        Sem itens no carrinho
        </li>) : 
        (
          <React.Fragment>
            {cart.map((item, index) => (
              <div key={index}>
              <li className="list-group-item">
                <div className="d-flex w-100 justify-content-between">
                  <h6>{item.name}</h6>
                  <small onClick={() => removeItemCart(index)}><i className="fas fa-trash"></i></small>
                </div>
                <p className="mb-2"></p>
                <Row>
                  <Col>
                    <h6>Qtd: &nbsp;
                      <i className="fas fa-minus-circle text-danger"></i> &nbsp;
                      <span> {qtd} </span> &nbsp;
                      <i className="fas fa-plus-circle text-success"></i>
                    </h6>
                  </Col>
                  <Col>
                    <h6 className="float-right">R$ {item.price * qtd}  </h6>
                  </Col>
                </Row>
              </li>
              </div>              
            ) )}
          </React.Fragment>
        )
        }
      </ul>
    );
}