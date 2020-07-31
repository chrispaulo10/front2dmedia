import React from 'react';
import ModalTeste from '../modal';
import {useSelector, useDispatch} from 'react-redux';
import { hideModal } from '../../store/extras';
import ResumeRequest from './ResumeRequest';
import Delivery from '../requests/delivery';

export default function FinishRequestPending(){
    const dispatch = useDispatch();
    // ABRIR E FECHAR MODAL
    const opening = useSelector(state => state.isOpen)
    const fecha = () => dispatch(hideModal());
    return(
        <div>
            <ModalTeste open={opening} size="xl" header="Aprovar orçamento"
            body={
                <div>
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="row justify-content-center"> 
                            <ul className="list-group list-group-horizontal-sm mb-3">
                                <li className="list-group-item list-group-item-success">Christian Paulo da Costa Almeida</li>
                                <li className="list-group-item list-group-item-success">85988759706</li>
                            </ul>
                            </div>
                        <Delivery />
                        <h5> Forma de pagamento </h5>
                        <select className="custom-select">
                            <option>Dinheiro</option>
                            <option>Boleto bancário</option>
                            <option>Transferência</option>
                            <option>Cartão de crédito</option>
                            <option>Cartão de débito</option>
                        </select>
                        </div>
                        <div className="col-lg-4">
                            <ResumeRequest />
                        </div>
                    </div>
                </div>
            }
            footer={
                <div> 
                    <button className="btn btn-danger" onClick={fecha}> <i className="fas fa-times"></i> Cancelar </button> &nbsp;
                    <button className="btn btn-success">
                    <i className="fas fa-check"></i> Finalizar orçamento
                    </button>
                </div>
            }
            />
        </div>
    );
}