import React, { useState } from 'react';
import '../bootstrap.css';
import { ListGroupItem, Row, Col } from 'reactstrap';

function Delivery() {
    return(
        <div>
        <h5>Onde devemos entregar?</h5>
        <ul className="list-group shadow-sm mb-4">
            <li className="list-group-item">     
                    <Row>
                        <Col xs="2" sm="2" md="2" lg="1">
                            <input type="radio" className="option-input radio"/>
                        </Col>
                        <Col xs="10" sm="10" md="10" lg="11">
                        <h5 class="tituloEndereco">
                            Retirar no restaurante
                        </h5>
                        <h6 class="taxaEntrega">
                            Taxa de entrega: &nbsp;
                        </h6>
                        <h6 class="valor">
                            R$4,56
                        </h6>                            
                        </Col>  
                    </Row>
            </li>
            <ListGroupItem tag="button" className="text-center" action>
                <i className="fas fa-plus"></i> &nbsp; 
                Adicionar novo endereço
            </ListGroupItem>
        </ul>
        </div>
    );
}

export default Delivery;