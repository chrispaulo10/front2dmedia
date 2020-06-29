import React from 'react';
import {Row, Col, ListGroupItem} from 'reactstrap';
import {useSelector} from 'react-redux';

export default function ItemAddress() {

    const address = useSelector(state => state.address);
    
    return(
        <div>
            {address.map((item, index) => (
            <ListGroupItem key={index}>     
                    <Row>
                        <Col xs="2" sm="2" md="2" lg="1">
                            <input type="radio" className="option-input radio"/>
                        </Col>
                        <Col xs="10" sm="10" md="10" lg="11">
                        <h6 className="tituloEndereco">
                            {item.street} , {item.number} - {item.neighborhood} 
                        </h6>
                        <h6 className="taxaEntrega">
                            Taxa de entrega: &nbsp;
                        </h6>
                        <h6 className="valor">
                            R$ {item.rate}
                        </h6>        
                        </Col>  
                    </Row>
            </ListGroupItem>
            )) }            
        </div>
    );
}