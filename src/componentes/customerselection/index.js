import React, { useState } from 'react';
import ModalTeste from '../modal';
import {useSelector, useDispatch} from 'react-redux';
import { hideModal } from '../../store/extras';
import SearchClient from './SearchClient';
import RegisterClient from '../registerClient';

export default function CustomerSelection({valores}){

    const [tela, setTela] = useState(1);

    const setarTela = number =>{
        setTela(number);
    }

    const dispatch = useDispatch();
    // ABRIR E FECHAR MODAL
    const opening = useSelector(state => state.isOpen)
    const fecha = () => dispatch(hideModal());
    return(
            <ModalTeste open={opening} size="lg" header="Selecione o cliente" body={
            <div>
                <div className="row justify-content-right mb-4 mt-1">   
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                        <button className={tela === 0 ? "btn btn-selection-purple" : "btn btn-selection-purple-active" } onClick={() => setarTela(1)}>
                            <i className="fas fa-search"></i> Pesquisar cliente </button>
                    </div>
                </div>
                {tela === 1 ? <SearchClient valores={valores} /> : <RegisterClient /> }
            </div>  
            } footer={
                <div>
                {tela === 1 ?
                <button className="btn btn-danger" onClick={fecha}> <i className="fas fa-times"></i> Cancelar </button>
                :
                <div>
                <button className="btn btn-danger" onClick={fecha}> <i className="fas fa-times"></i> Cancelar </button> &nbsp;
                <button className="btn btn-success"> <i className="fas fa-plus"></i>  Adicionar cliente</button>
                </div>
                }
                </div>
            } />
    );
}