import React, { useState } from 'react';
import '../bootstrap.css';
import { ListGroupItem, Row, Col, Collapse } from 'reactstrap';

function Payment() {
    const [collapse, setCollapse] = useState(false);

    const [status, setStatus] = useState('fas fa-angle-right');

    const onEntered = () => setStatus('fas fa-angle-down');
    
    const onExited = () => setStatus('fas fa-angle-right');

    const openCreditCard = () => setCollapse(!collapse);

    return(
        <div>
        <h5>Escolha a forma de pagamento</h5>
        <ul className="list-group shadow-sm mb-4">
            <li className="list-group-item">     
                    <Row>
                        <Col xs="2" sm="2" md="2" lg="1">
                            <input type="radio" className="option-input radio"/>
                        </Col>
                        <Col xs="10" sm="10" md="10" lg="11">
                        <h5 class="tituloEndereco">
                            Dinheiro na entrega
                        </h5>
                        <h6 class="taxaEntrega">
                            Troco para: &nbsp;
                        </h6>
                        <h6 class="valor">
                            R$4,56
                        </h6>                            
                        </Col>  
                    </Row>
            </li>
        </ul>

        <ul className="list-group shadow-sm mb-4">
            <ListGroupItem onClick={openCreditCard}>     
                <h5 class="tituloEndereco">
                    <i className="far fa-credit-card"></i> &nbsp;
                    Cartão de crédito
                    <span className="float-right"> <i className={status}></i> </span>
                </h5>                         
            </ListGroupItem>
            <Collapse isOpen={collapse}
                        onEntered={onEntered}
                        onExited={onExited}>
            <ListGroupItem>
                <Row>
                    <Col xs="2" sm="2" md="2" lg="1">
                        <input type="radio" className="option-input-card radio"/>
                    </Col>
                    <Col xs="10" sm="10" md="10" lg="11">
                        <h5 class="tituloEndereco">
                            Mastercard
                        </h5>                            
                    </Col>  
                </Row>
            </ListGroupItem>
            </Collapse>
        </ul>

        <ul className="list-group shadow-sm mb-4">
            <ListGroupItem onClick={openCreditCard}>     
                <h5 class="tituloEndereco">
                    <i className="fas fa-credit-card"></i> &nbsp;
                    Cartão de dédito
                    <span className="float-right"> <i className={status}></i> </span>
                </h5>                         
            </ListGroupItem>
            <Collapse isOpen={collapse}
                        onEntered={onEntered}
                        onExited={onExited}>
            <ListGroupItem>
                <Row>
                    <Col xs="2" sm="2" md="2" lg="1">
                        <input type="radio" className="option-input-card radio"/>
                    </Col>
                    <Col xs="10" sm="10" md="10" lg="11">
                        <h5>
                            Mastercard
                        </h5>                            
                    </Col>  
                </Row>
            </ListGroupItem>
            </Collapse>
        </ul>
        <ul className="list-group shadow-sm mb-5">
            <li className="list-group-item">     
                    <h5>
                        <i className="fas fa-comments-dollar"></i> &nbsp;
                        Cupom de desconto
                    </h5>
                    <input type="text"/>
            </li>
        </ul>
        </div>
    );
}

export default Payment;