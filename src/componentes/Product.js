import React, { useState } from 'react';
import { ListGroupItem, Row, Col} from 'reactstrap';

export default function Product({ product }){
return(
    <ListGroupItem tag="button">
        <div className="p-1">
            <Row>
                <Col lg="2" md="3" sm="2" xs="3">
                    {/* THUMBNAIL */}
                    <img src={product.img} className="thumb" />
                </Col>
                <Col lg="7" md="6" sm="7" xs="9">
                    {/* PRODUCT */}
                    <div className="float-left text-justify">
                    <div className="produto text-uppercase"> {product.name} </div>
                    <div className="descricao"> {product.description} </div>
                    </div>
                </Col>
                <Col lg="3" md="3" sm="3">
                    {/* PRICE */}
                    <span className="preco"> R$ {product.price} </span> 
                </Col>
            </Row>
        </div>
    </ListGroupItem>

);
}
