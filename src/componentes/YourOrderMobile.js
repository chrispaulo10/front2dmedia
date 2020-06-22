import React from 'react';
import '../bootstrap.css';
import {
    Row,
    Col,
    ListGroupItem,
  } from 'reactstrap';

export default function YouOrderMobile() {
    return (
        <ul className="shadow-lg list-group">
        {/* ITEM DO CARRINHO */}
        <li className="list-group-item">
          <div className="d-flex w-100 justify-content-between">
            <h6>Pizza Mista</h6>
            <small><i className="fas fa-trash"></i></small>
          </div>
          <p className="mb-2"></p>
          <Row>
            <Col>
              <h6>Qtd: &nbsp;
                <i className="fas fa-minus-circle text-danger"></i> &nbsp;
                <span> 2 </span> &nbsp;
                <i className="fas fa-plus-circle text-success"></i>
              </h6>
            </Col>
            <Col>
              <h6 className="float-right">R$20,00</h6>
            </Col>
          </Row>
        </li>

        <li className="list-group-item">
          <div className="d-flex w-100 justify-content-between">
            <h6>Açaí (175g)</h6>
            <small><i className="fas fa-trash"></i></small>
          </div>
          <p className="mb-2">Com calda de morango, Com creme 3 leites, Com creme de morango, Com leite em po</p>
          <Row>
            <Col>
              <h6>Qtd: &nbsp;
                <i className="fas fa-minus-circle text-danger"></i> &nbsp;
                <span> 2 </span> &nbsp;
                <i className="fas fa-plus-circle text-success"></i>
              </h6>
            </Col>
            <Col>
              <h6 className="float-right">R$20,00</h6>
            </Col>
          </Row>
        </li>
        {/* FIM ITEM DO CARRINHO */}
        <a href="" className="list-group-item text-center">
          <i className="fas fa-plus"></i> &nbsp;
          Adicionar observação</a>
        <li className="list-group-item list-group-item-dark">
          <div className="d-flex w-100 justify-content-between">
            <h6>SUBTOTAL</h6>
            <h6>R$ 40,00</h6>
          </div>
        </li>
        {/* BOTÃO DE FINALIZAR */}
        <ListGroupItem color="dark" tag="button">
         <h6 className="tituloEndereco"> <i className="fas fa-shopping-cart"/> &nbsp;
         FINALIZAR PEDIDO </h6>
        </ListGroupItem>
      </ul>
    );
}