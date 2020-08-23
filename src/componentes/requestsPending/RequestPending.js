import React, { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import { showModal } from '../../store/extras';
import CustomerSelection from '../customerselection';
import axios from '../../server/axios';
export default function RequestPending(){

    const [all, setAll] = useState([])
    
    const [all2, setAll2] = useState([])
    
    const [id, setId] = useState();

    const dispatch = useDispatch()
    const aprovar = (id_pedido) => {
        all2.map(item => id_pedido === item.iden && setId(item) )
        dispatch(showModal());
    }

    useEffect(() => {
        
        axios.get('ControllerPedidoProduto.php?listar_pendentes').then(
            response => {
            let modify = response.data
            if (modify.error) {
                console.log(modify)
            }else{
                setAll(modify);
                setAll2(
                    modify.map(item => {
                        return({
                            iden : item.id_pedido,
                            valor_s : item.sub_total_bruto,
                            descon : '',
                            valor_desc: '',
                            total: item.sub_total_bruto,
                        })
                    } 
                    )
                )
            }
            }
        )
    }, [])

    function addDesconto(event){
        let identifica = event.target.name;
        let valor = event.target.value;
        setAll2(
            all2.map(itemzada => {
                if (itemzada.iden === identifica) {
                    itemzada.descon = valor
                    itemzada.valor_desc = itemzada.valor_s - itemzada.valor_s * (valor/100)
                    itemzada.total = itemzada.valor_desc
                }
                return itemzada
            })
        )
        
    }

return(
    <div>
    <CustomerSelection valores={id} /> 
        <div>
            <hr />
            <div className="mt-5">
            <h3 className="text-purple text-uppercase">Orçamentos Pendentes</h3>
                <div className="row mb-3">
                    {all.length === 0 ? 
                    <alert className="alert alert-warning mt-3"> NENHUM ORÇAMENTO PENDENTE! </alert>
                    : 
                    (
                    all.map((item, index) => (
                        <div className="col-lg-4 col-md-6 col-sm-12 col-12 mb-4" key={index}>
                        <div className="card mt-4 shadow-sm">
                            <h6 className="card-header bg-light">
                            <div className="row justify-content-between">
                                <div className="col-3 text-left">                                  
                                    #{item.id_pedido}
                                </div>
                                <div className="col-9 text-right">
                                <i className="far fa-calendar-alt"></i> {item.data_hora}
                                </div>
                            </div>
                            </h6>
                            
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item text-center text-uppercase text-light bg-purple">
                                    <h6 className="mb-0 font-weight-bold">
                                        {item.nome_cliente}
                                    </h6>
                                </li>
                                {item.produtos.map((produto,index2) =>
                                    <li className="list-group-item" key={index2}>
                                        <div className="row justify-content-between">
                                            <div className="col-8 text-left">
                                            <h6 className="mb-0">{produto.nome_categoria} - {produto.nome_produto}</h6>
                                            </div>
                                            <div className="col-4 text-right">
                                            <h6 className="text-purple">R$ {produto.preco_unitario} </h6>
                                            </div>
                                        </div>
                                        <div className="row justify-content-between mb-0">
                                            <div className="col-8 text-left">
                                            <h6 className="mb-0">Quantidade:</h6>
                                            </div>
                                            <div className="col-4 text-right">
                                            <h6 className="text-purple"> {produto.quantidade}  </h6>
                                            </div>
                                        </div>
                                        <div className="row justify-content-between">
                                            <div className="col-8 text-left">
                                                <h6>Subtotal:</h6>
                                            </div>
                                            <div className="col-4 text-right">
                                                <h6 className="text-purple"> R$ {produto.sub_total_produto}  </h6>
                                            </div>
                                        </div>
                                    </li>                                        
                                    )}
                                <div>
                                    <li className="list-group-item text-uppercase text-purple">
                                        <div className="d-flex w-100 justify-content-between">
                                            <h6 className="mb-0" >Subtotal bruto: </h6>
                                            <h6 className="mb-0">R$ {item.sub_total_bruto}</h6> 
                                        </div>
                                    </li>                                        
                                    <li className="list-group-item">
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Desconto"
                                            name={item.id_pedido} maxLength="2" onChange={addDesconto}/>
                                            <div className="input-group-append">
                                                <span className="input-group-text" id="basic-addon2">%</span>
                                            </div>
                                        </div>
                                    </li>
                                </div>
                            {all2.map(xesq => (
                            xesq.descon && xesq.iden=== item.id_pedido &&
                            <div>
                                <li className="list-group-item item-orcamento">
                                    <div className="d-flex w-100 text-uppercase text-purple justify-content-between">
                                        <h6 className="mb-0" >Subtotal c/ desconto: </h6>
                                        <h6 className="mb-0">R$ {xesq.valor_desc.toFixed(2)}</h6> 
                                    </div>
                                </li>                                        
                            </div>
                            ))}
                                
                            </ul>    
                            <div className="card-body text-right">
                                <button className="btn btn-danger btn-sm">
                                <i className="fas fa-trash"></i> Excluir
                                </button> &nbsp;
                                <button className="btn btn-success btn-sm" onClick={()=> aprovar(item.id_pedido)}>
                                <i className="fas fa-check"></i> Aprovar
                                </button>
                            </div>
                        </div>
                    </div>  
                    ))
                    )}
                </div>
            </div>
        </div>
    </div>
);
}