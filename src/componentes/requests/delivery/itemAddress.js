import React, {useState} from 'react';
import {Row, Col, ListGroupItem} from 'reactstrap';
import {useSelector} from 'react-redux';

export default function ItemAddress() {

    const address = useSelector(state => state.address);

    const [value, setValue] = useState({
        address : 0
    });

    function handleChange(event){
        console.log(event.target.value);
        setValue({...value, [event.target.name] : event.target.value });
        console.log(value);
    };
    
    return(
        <div>
            {address.map((item, index) => (
            <ListGroupItem key={index}>     
                    <Row>
                        <Col xs="2" sm="2" md="2" lg="1">
                            <input type="radio" name="address" onChange={handleChange} value={index}
                            className="option-input radio"/>
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