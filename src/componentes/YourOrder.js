import React from 'react';
import '../bootstrap.css';
import {
    Collapse,
    UncontrolledCollapse,
    Container,
    Row,
    Col,
    ListGroupItem,
  } from 'reactstrap';

  export default function YourOrder() {
    return(
        <div>
            <div className="your-order wow bounceInRight mt-5" data-wow-delay="0.2s" data-wow-duration="1.1s">
                    <h3>Carrinho</h3>
                    <div className="your-order-table table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th className="product-name">Produto</th>
                                    <th className="product-total">Qtd.</th>
                                    <th className="product-total">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="cart_item">
                                    <td className="product-name">
                                        MISTA
                                    </td>
                                    <td>
                                        <div className="quantity">
                                            
                                        </div>
                                    </td>
                                    <td className="product-total">
                                        <span className="amount">£165.00</span>
                                        &nbsp;
                                    </td>

                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="3" id="observacao">
                                        <a href="" data-toggle="modal" data-target="#obsModal">
                                            <i className="fa fa-plus"></i> &nbsp;
                                            Adicionar observação</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        Tempo de entrega estimado
                                    </td>
                                    <td>30min</td>
                                </tr>
                                <tr className="order-total">
                                    <th>Subtotal</th>
                                    <td colspan="2"><strong><span className="amount">R$215,00</span></strong>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <center>
                        <button>Finalizar Pedido</button>
                    </center>
                </div>
            </div>
    );
}