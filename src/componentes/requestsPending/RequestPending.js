import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import { showModal } from '../../store/extras';
import CustomerSelection from '../customerselection';
import FinishRequestPending from './FinishRequestPending';
export default function RequestPending(){

    const [tela, setTela] = useState()

    const dispatch = useDispatch()
    const aprovar = number => {
        dispatch(showModal());
        setTela(number)
    } 

    return(
        <div>
        {tela === 1 ? <CustomerSelection /> : <FinishRequestPending />}
            <div className="mt-5">
                <hr />
                <div className="mt-4">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card mt-4">
                                <h6 className="card-header">
                                <div className="row justify-content-between">
                                    <div className="col-5 text-left">                                  
                                        #999999
                                    </div>
                                    <div className="col-7 text-right">
                                    <i className="far fa-calendar-alt"></i> 10/11/2001 22:22h
                                    </div>
                                </div>
                                </h6>
                                
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item text-center"><h6>Reginalda</h6></li>
                                    <li className="list-group-item">
                                        <div className="d-flex w-100 justify-content-between">
                                        <h6>Cartões de Visita - 500 unid Brilho Total Frente</h6>
                                            <small>R$20,00</small>
                                        </div>
                                        <div>
                                        EXTRAS : ARTE DO CARTÃO /
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="d-flex w-100 justify-content-between">
                                        <h6>Cartões de Visita - 1000 unid Fosco</h6>
                                            <small>R$200,00</small>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="d-flex w-100 justify-content-between">
                                            <h6>Subtotal: </h6>
                                            <h6>R$ 20</h6> 
                                        </div>
                                    </li>
                                </ul>    
                                
                                <div className="card-body text-right">
                                    <button className="btn btn-danger btn-sm" onClick={()=>aprovar(0)}>
                                    <i className="fas fa-times"></i> Excluir
                                    </button> &nbsp;
                                    <button className="btn btn-success btn-sm" onClick={()=>aprovar(1)}>
                                    <i className="fas fa-check"></i> Aprovar orçamento
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}