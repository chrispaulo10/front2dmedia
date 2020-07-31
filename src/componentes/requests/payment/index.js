import React from 'react';

function Payment() {

    return(
        <div>
        <h5>Forma de pagamento</h5>
        <ul className="list-group shadow-sm mb-3">
        <div className="list-group-item">
                <div className="row">
                    <div className="col-lg-1 col-md-2 col-sm-2 col-2">
                        <input type="radio" className="option-input-card radio"/>
                    </div>
                    <div className="col-lg-11 col-md-10 col-sm-10 col-10">
                        <h5>
                            Dinheiro
                        </h5>                            
                    </div>  
                </div>
            </div>
            <div className="list-group-item">
                <div className="row">
                    <div className="col-lg-1 col-md-2 col-sm-2 col-2">
                        <input type="radio" className="option-input-card radio"/>
                    </div>
                    <div className="col-lg-11 col-md-10 col-sm-10 col-10">
                        <h5>
                            Boleto bancário
                        </h5>                            
                    </div>  
                </div>
            </div>
            <div className="list-group-item">
                <div className="row">
                    <div className="col-lg-1 col-md-2 col-sm-2 col-2">
                        <input type="radio" className="option-input-card radio"/>
                    </div>
                    <div className="col-lg-11 col-md-10 col-sm-10 col-10">
                        <h5>
                            Transferência
                        </h5>                            
                    </div>  
                </div>
            </div>
            <div className="list-group-item">
                <div className="row">
                    <div className="col-lg-1 col-md-2 col-sm-2 col-2">
                        <input type="radio" className="option-input-card radio"/>
                    </div>
                    <div className="col-lg-11 col-md-10 col-sm-10 col-10">
                        <h5>
                            Cartão de crédito
                        </h5>                            
                    </div>  
                </div>
            </div>
            <div className="list-group-item">
                <div className="row">
                    <div className="col-lg-1 col-md-2 col-sm-2 col-2">
                        <input type="radio" className="option-input-card radio"/>
                    </div>
                    <div className="col-lg-11 col-md-10 col-sm-10 col-10">
                        <h5>
                            Cartão de débito
                        </h5>                            
                    </div>  
                </div>
            </div>
        </ul>
        </div>
    );
}

export default Payment;