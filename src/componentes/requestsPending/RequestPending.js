import React, { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import { showModal } from '../../store/extras';
import CustomerSelection from '../customerselection';
import axios from '../../server/axios';
import { UncontrolledCollapse } from 'reactstrap';
import Loading from '../loading';
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
        setTimeout(()=>{ 
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
        } , 700)
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
    const [pesquisa, setPesquisa] = useState({
        nome_cliente : '',
        date: '',
        date_input: '',
        resetDate: 'none',
    });

    function pesquisandoPendente(e) {
        setPesquisa({...pesquisa, [e.target.name] : e.target.value.toUpperCase(), date_input: '', date: ''});
    }

    function pesquisandoData(e) {
        var data = e.target.value;
        var dateObj = new Date(data);
        var di = dateObj.getDate()+1;
        var dia  = di.toString();
        var diaF = (dia.length === 1) ? '0'+dia : dia;
        var mes  = (dateObj.getMonth()+1).toString(); //+1 pois no getMonth Janeiro começa com zero.
        var mesF = (mes.length === 1) ? '0'+mes : mes;
        var newData = `${diaF}/${mesF}/${dateObj.getFullYear()}`;

        setPesquisa({...pesquisa, date : newData, date_input : data, resetDate: 'block', nome_cliente : ''});
    }

    const filterName = all => all.nome_cliente.toUpperCase().indexOf(pesquisa.nome_cliente) !== -1 ;

    const requestsName = all.filter(filterName);

    const filterDate = all => all.data_hora.indexOf(pesquisa.date) !== -1 ;

    const requestsDate = all.filter(filterDate);

    var finalArray = []

    if (pesquisa.date_input && pesquisa.nome_cliente.length === 0) {
        finalArray = requestsDate
    }else{
        finalArray = requestsName
    }
    
    function resetarData(e) {
        setPesquisa({...pesquisa, date : '', date_input : '', resetDate: 'none'});
    }

return(
    <div>
    <CustomerSelection valores={id} /> 
        <div>
            <hr />
            <div className="mt-5">
            <div className="row justify-content-between">
                <div className="col-lg-5">
                    <h3 className="text-purple text-uppercase">Orçamentos Pendentes</h3>
                </div>
                <div className="col-lg-7 mb-0 mt-0">
                    <div className="row justify-content-end">
                        <div className="col-lg-5">
                            <div className="input-group input-group-sm mb-3">
                                <input type="text" className="form-control " name="nome_cliente"
                                value={pesquisa.nome_cliente} onChange={pesquisandoPendente}
                                placeholder="Nome do cliente" />
                                <div className="input-group-append">
                                    <button className="btn btn-purple" type="button"><i className="fas fa-search"></i> </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="input-group input-group-sm mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text bg-purple text-light border-purple">Data do pedido</span>
                                </div>
                                <input type="date" className="form-control text-right" name="date"
                                value={pesquisa.date_input} onChange={pesquisandoData}
                                placeholder="Nome do cliente" />
                                <div className="input-group-append">
                                    <button className="btn btn-purple" onClick={resetarData} style={{display: pesquisa.resetDate}} > <i className="fas fa-times"></i> </button>
                                </div>
                            </div>
                        </div>
                    </div>    
                </div>
            </div>
                    {finalArray.length === 0 ?
                        <center className="mt-5">
                            <Loading />
                        </center>
                    : 
                    (
                    <div className="row mb-3">
                        {finalArray.map((item, index) => (
                        <div className="col-lg-4 col-md-6 col-sm-12 col-12 mb-3" key={index}>
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
                                <UncontrolledCollapse  toggler={`#detalhes${item.id_pedido}`}>
                                {item.produtos.map((produto,index2) =>
                                    <li className="list-group-item" key={index2}>
                                        <div className="row justify-content-between">
                                            <div className="col-8 text-left">
                                            <h6 className="mb-0">{produto.nome_categoria}: {produto.nome_subcategoria} - {produto.nome_produto}</h6>
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
                                                <h6 className="text-purple"> R$ {produto.sub_total_produto.toFixed(2)}  </h6>
                                            </div>
                                        </div>
                                    </li>                                        
                                    )}
                                </UncontrolledCollapse>
                                <div>
                                    <li className="list-group-item text-uppercase text-purple">
                                        <div className="d-flex w-100 justify-content-between">
                                            <h6 className="mb-0" >Subtotal bruto: </h6>
                                            <h6 className="mb-0">R$ {item.sub_total_bruto.toFixed(2)}</h6> 
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
                            <li className="list-group-item text-center text-uppercase text-purple">
                                <a href="" className="text-purple" id={`detalhes${item.id_pedido}`} > Mostrar/Fechar detalhes </a>
                            </li>                            
                            </ul>    
                            <div className="card-body text-right">
                                <button className="btn btn-success btn-sm" onClick={()=> aprovar(item.id_pedido)}>
                                <i className="fas fa-check"></i> Aprovar
                                </button>
                            </div>
                        </div>
                    </div>  
                    ))}
                    </div>
                    )}
            </div>
        </div>
    </div>
);
}