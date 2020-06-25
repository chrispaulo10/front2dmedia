import React, { useState } from 'react';
import '../bootstrap.css';
import { Container, Row, Col } from 'reactstrap';
import Delivery from '../componentes/Delivery';
import Payment from '../componentes/Payment';
import OrderFinished from '../componentes/OrderFinished';
function Request(){
    return(
        <div>
            <Container>
                <Row className="justify-content-center mt-4 mb-4">
                    <Col xs="12" sm="6" md="5" lg="4">
                        <div className="etapAtiva text-center">
                            <i className="fas fa-receipt"></i> &nbsp; 
                            Entrega e Pagamento
                        </div>
                    </Col>
                    <Col xs="12" sm="6" md="5" lg="4">
                        <div className="etapa text-center">
                        <i className="fas fa-check"></i> &nbsp; 
                            Pedido Concluído
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col xs="12" sm="12" md="8" lg="8">
                        <Delivery />
                        <Payment />
                    </Col>
                    <Col xs="12" sm="12" md="4" lg="4">
                        <div class="shop-total">
                            <h3>Resumo do pedido</h3>
                            <ul>
                                <li>
                                Subtotal
                                <span>$909.00</span>
                                </li>
                                <li>
                                Frete
                                <span>$9.00</span>
                                </li>
                                <li class="order-total">
                                Cupom
                                <span>0</span>
                                </li>
                                <li>
                                Valor total
                                <span>$918.00</span>
                                </li>
                            </ul>
                        </div>
                    </Col>
                </Row>
                <Row className="justify-content-between">
                    <Col xs="12" md="4" sm="6" lg="3">
                        <div className="continue-shopping-btn text-center mb-3">
                        <button title="Continuar comprando">
                            <i className="fa fa-angle-left"></i> &nbsp;
                            Voltar
                        </button>
                        </div>
                    </Col>
                    <Col xs="12" md="4" sm="6" lg="3">
                        <div className="finished-request text-center mb-5">
                        <button title="Continuar comprando">
                            <i className="fa fa-check"></i> &nbsp;
                            Finalizar
                        </button>
                        </div>
                    </Col>
                </Row>             
            </Container>
        </div>
    );
}

export default Request;