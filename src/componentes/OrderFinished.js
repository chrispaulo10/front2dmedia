import React from 'react';
import { Row,Col } from "reactstrap";
import '../bootstrap.css';

export default function OrderFinished(){
    return(
        <div>
                <Row className="mt-3 mb-4">
                    <Col lg="4" xs="12" sm="12" md="12">
                        <div className="card card-body text-center shadow-sm mb-2">
                            <h3 className="title-final">Finalizado</h3>
                            <h6 className="subtitle-final">Pedido Concluído</h6>
                        </div>
                    </Col>
                    <Col lg="4" xs="12" sm="12" md="12">
                        <div className="card card-body text-center shadow-sm mb-2">
                            <h3 className="title-final"> 30 min</h3>
                            <h6 className="subtitle-final"> Previsão: 21:00H</h6>
                        </div>
                    </Col>
                    <Col lg="4" xs="12" sm="12" md="12">
                        <div className="card card-body text-center shadow-sm mb-2">
                            <h3 className="price-final">R$ 10,00</h3>
                            <h6 className="subtitle-final">Rua, Bairro, Número</h6>
                        </div>
                    </Col>
                </Row>
        </div>
    );
}