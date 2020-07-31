import React,{useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import axios from '../../server/axios';
import ModalTeste from '../modal';
import { hideModal } from '../../store/extras';
import { addItem } from '../../store/cart';

export default function Extras({produto, categoriaa}) {

    // ABRIR E FECHAR MODAL
    const opening = useSelector(state => state.isOpen)
    const fecha = () => {dispatch(hideModal()); setExtrasSelected([]); setExtrasPrice(0)};

    // PEGAR OS ADICIONAIS DA API
    const [all, setAll] = useState([]);
    const [extraState, setExtraState] = useState([]);

    useEffect(() => {
        axios.get(`/user/productsExtras/${produto.id}`).then(response => {
            let modify = response.data
            setAll(modify);
            setExtraState(
                modify.map(item => 
                            item.extras.map(extraa => {
                            return{
                            group : item.name_group,
                            id : extraa.id_extra,
                            name : extraa.extra_name,
                            price : extraa.price,
                    }
                    }
                    )
                )
                );
        });
    }, [produto.id, produto.price]);

    // ADICIONAIS SELECIONADOS PELO CLIENTE
    const [extrasSelected , setExtrasSelected] = useState([]);

    const [extrasPrice , setExtrasPrice] = useState(0);

    function addExtras(event){
        let id_do_extra = parseInt(event.target.id, 10);
        let check = event.target.checked;
        extraState.map(item10 => item10.map(item20 => {
            if(item20.id === id_do_extra && check === true){
                setExtrasSelected([...extrasSelected, item20]);
                let price2 = parseInt(item20.price,10)
                setExtrasPrice(extrasPrice + price2);
            }else if(item20.id === id_do_extra && check === false){
                let price3 = parseInt(item20.price,10)
                setExtrasPrice(extrasPrice - price3);
                let apagar = extrasSelected.indexOf(item20)
                extrasSelected.splice(apagar,1)
            }
        }
            )
            )
    }
    const produtoExtras = {
            cat : categoriaa,
            produto : produto,
            adicionais : extrasSelected,
            priceExtras : extrasPrice,
            priceTotal : parseInt(produto.price,10) + extrasPrice,    
            quantidade : 1,
        }
    
    // COLOCAR OS ADICIONAIS NO CARRINHO
    const dispatch = useDispatch();
    function testeCart(produtoExtra){
        dispatch(addItem(produtoExtra));
        setExtrasSelected([]);
        fecha();
    }

    return(
        <div>
        <ModalTeste open={opening} toggle={fecha} size="md"
        header={<h6 className="title-extras">{categoriaa} : {produto.product_name}</h6>}
        body={
        <div>
            {all.map((group_extras,index) => (
                <div key={index}>
                <h6 className="text-uppercase" >{group_extras.name_group}</h6>
                    {extraState.map((extras) => (
                        extras.map((item,index) =>  (
                            item.group === group_extras.name_group ? (
                                <div key={index} className="row justify-content-between mt-1">
                                <div className="col-lg-10 col-md-10 col-sm-10 col-10 text-left">
                                    <label> {item.name}  -  
                                    <span> R$ {item.price}</span>
                                    </label>
                                </div>
                                <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                                <input type="checkbox" id={item.id} onChange={addExtras}
                                className="option-input-adc checkbox" /> 

                                </div>
                                </div>
                            ) : ("")
                        ))
                    )
                        )}
                </div>
            )
            )} 
        </div>
        } footer={
                <button onClick={() => testeCart(produtoExtras)} className="btn btn-purple">Adicionar ao orçamento
                R${parseInt(produto.price,10) + extrasPrice}</button>
        } />
        </div>
    );
}