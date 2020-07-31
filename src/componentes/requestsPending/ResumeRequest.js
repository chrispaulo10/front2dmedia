import React from 'react';

export default function ResumeRequest(){
return(
    <div>
        <div className="shop-total">
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
                <li>
                    <div className="row justify-content-between">
                        <div className="col-lg-4 col-md-6 col-sm-6 col-6"> Valor inicial </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                            <div className="col-auto">
                                <div className="input-group input-group-sm">
                                    <div className="input-group-prepend">
                                    <div className="input-group-text">R$</div>
                                    </div>
                                    <input type="text" className="form-control" />
                                </div>
                            </div>                            
                        </div>
                    </div>
                </li>
                <li className="order-total">
                    Valor restante
                    <span>0</span>
                </li>
                <li>
                    Valor total
                    <span>$918.00</span>
                </li>
            </ul>
        </div>        
    </div>
);
}