import React, { useState, useEffect } from 'react';
import axios from '../../server/axios';
import { UncontrolledCollapse } from 'reactstrap';
import Loading from '../loading';
export default function RequestApproved() {

    const [all, setAll] = useState([]);

    const [all2, setAll2] = useState([]);

    const [situacao, setSituacao] = useState(1);

    const trocaSituacao = event => {
        setSituacao(event.target.value);
    }

    useEffect(() => {
        setTimeout(() => {
            axios.get(`ControllerPedidoProduto.php?listar_aprovados&id_situacao=${situacao}`).then(
                retorno => {
                    if (retorno.data.error) {
                        setAll([]);
                    } else {
                        let modify = retorno.data
                        console.log(modify)
                        setAll(modify)
                        setAll2(
                            modify.map(item => {
                                return ({
                                    id: item.id_pedido,
                                    id_comprar: item.id_compra,
                                    situacao: situacao,
                                    valorFinal: 0,
                                })
                            }
                            )
                        )
                    }
                }
            )
        }, 100)
    }, [situacao,])

    const selectMudarStatus = event => {
        let identifica = event.target.id;
        let valor = event.target.value;
        setAll2(
            all2.map(item => {
                if (item.id === identifica) {
                    item.situacao = valor
                }
                return item
            })
        )
    }

    const mudarStatus = event => {
        let id = event.target.id;
        all2.map(item => {
            if (item.id === id && item.situacao === "4") {
                axios.get(`ControllerCompra.php?editar_detalhes_compra&id_compra=${item.id_comprar}&coluna_banco=pagamento_final&valor=${item.valorFinal}&coluna_bunita=DeuCerto`)
                    .then(
                        retornan => {
                            retornan.data.error && console.log("ERRRO111")
                        }
                    )
                axios.get(`ControllerPedido.php?editarSituacao&id_pedido=${item.id}&id_situacao=${item.situacao}`)
                    .then(
                        retornan => {
                            retornan.data.error ? console.log("ERRRO") : (document.location.reload(true))
                        }
                    )
            }
            else if (item.id === id) {
                axios.get(`ControllerPedido.php?editarSituacao&id_pedido=${item.id}&id_situacao=${item.situacao}`)
                    .then(
                        retornan => {
                            retornan.data.error ? console.log("ERRRO") : (document.location.reload(true))
                        }
                    )
            }
            return item
        })
    }

    const mudarValor = event => {
        let identifica = event.target.id;
        let valor = event.target.value;
        setAll2(
            all2.map(item => {
                if (item.id === identifica) {
                    item.valorFinal = valor
                }
                return item
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

    const filterName = all => all.cliente.nome_cliente.toUpperCase().indexOf(pesquisa.nome_cliente) !== -1 ;

    const requestsName = all.filter(filterName);

    const filterDate = all => all.compras.data_hora_compra.indexOf(pesquisa.date) !== -1 ;

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

    console.log(finalArray)

    return (
        <div>
            <div className="mt-5"> <hr />
                <div className="mt-5 mb-3">
                    <div className="row justify-content-between">
                        <div className="col-lg-5"> 
                            <div className="form-inline">
                                <h4 className="text-purple text-uppercase mt-0 mb-0">Orçamento: </h4> &nbsp; &nbsp;
                                <select className="custom-select custom-select-sm" value={situacao} onChange={trocaSituacao}>
                                    <option value="1">Aprovado</option>
                                    <option value="2">Em produção</option>
                                    <option value="6">Disponível para retirada</option>
                                    <option value="3">Saiu para Entrega</option>
                                    <option value="4">Concluído</option>
                                    <option value="5">Cancelado</option>
                                </select>
                            </div>
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
                </div>
                {finalArray.length === 0 ?
                    <center className="mt-5">
                        <Loading />
                    </center>
                    :
                    <div className="row mb-5">
                        {finalArray.map((item, index) => (
                            <div className="col-lg-4 col-md-6 col-sm-12 col-12 mb-3" key={index}>
                                <div className="card mt-4 shadow-sm">
                                    <h6 className="card-header bg-light">
                                        <div className="row justify-content-between">
                                            <div className="col-4 text-left">
                                                <a href={`http://gestao.2dmedia.com.br/pedidos/cupom_fiscal/${item.id_pedido}`} className="text-purple"
                                                    target="_blank" >
                                                    <i className="fas fa-print"></i>
                                                </a> &nbsp;
                                    #{item.id_pedido}
                                            </div>
                                            <div className="col-8 text-right">
                                                <i className="far fa-calendar-alt"></i> {item.compras.data_hora_compra}
                                            </div>
                                        </div>
                                    </h6>

                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item text-center text-uppercase text-light bg-purple">
                                            <h6 className="mb-0">
                                                {item.cliente.nome_cliente} - &nbsp;
                                        <a target="_blank" className="text-light" href={`https://api.whatsapp.com/send?phone=55${item.cliente.fone}`}>
                                                    {item.cliente.fone}
                                                </a>
                                            </h6>
                                        </li>
                                        <li className="list-group-item text-center text-uppercase text-purple">
                                            <h6 className="mb-0">
                                                Previsão - {item.compras.previsao_entrega}
                                            </h6>
                                        </li>
                                        {item.data_conclusao &&
                                            <li className="list-group-item text-center text-uppercase text-purple">
                                                <h6 className="mb-0">
                                                    Conclusão - {item.data_conclusao}
                                                </h6>
                                            </li>
                                        }
                                        <UncontrolledCollapse toggler={`#detalhes${item.id_compra}`}>
                                            {item.produtos.map((produto, index2) =>
                                                <li className="list-group-item" key={index2}>
                                                    <div className="row justify-content-between">
                                                        <div className="col-8 text-left">
                                                            <h6 className="mb-0">{produto.nome_categoria}:  {produto.nome_subcategoria} - {produto.nome_produto}</h6>
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
                                            {item.compras.compras_observacao &&
                                                <li className="list-group-item">
                                                    <h6 className="mb-0">
                                                        Observação: {item.compras.compras_observacao}
                                                    </h6>
                                                </li>
                                            }

                                            {item.compras.frete === "delivery" &&
                                                <div>
                                                    <li className="list-group-item text-uppercase text-purple">
                                                        <div className="d-flex w-100 justify-content-between">
                                                            <h6 className="mb-0">Entrega</h6>
                                                            <h6 className="mb-0">{item.compras.frete} - R${item.cliente.preco_delivery}  </h6>
                                                        </div>
                                                    </li>
                                                    <li className="list-group-item text-uppercase text-purple">
                                                        <div className="row justify-content-between">
                                                            <div className="col-5 text-left">
                                                                <h6>CEP/CIDADE:</h6>
                                                            </div>
                                                            <div className="col-7 text-right">
                                                                <small className="text-purple mb-0">{item.cliente.cep} / {item.cliente.cidade_cliente}  </small>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="list-group-item text-uppercase text-purple">
                                                        <div className="row justify-content-between">
                                                            <div className="col-5 text-left">
                                                                <h6>Endereço:</h6>
                                                            </div>
                                                            <div className="col-7 text-right">
                                                                <p className="text-purple mb-0"> {item.cliente.rua}, {item.cliente.numero} - {item.cliente.bairro_cliente}  </p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    {item.cliente.complemento &&
                                                        <li className="list-group-item text-uppercase text-purple">
                                                            <div className="row justify-content-between">
                                                                <div className="col-5 text-left">
                                                                    <h6>Complemento:</h6>
                                                                </div>
                                                                <div className="col-7 text-right">
                                                                    <p className="text-purple mb-0"> {item.cliente.complemento} </p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    }
                                                    {item.cliente.ponto_referencia &&
                                                        <li className="list-group-item text-uppercase text-purple">
                                                            <div className="row justify-content-between">
                                                                <div className="col-5 mb-0 text-left text-purple">
                                                                    <h6>Referência:</h6>
                                                                </div>
                                                                <div className="col-7 text-right">
                                                                    <p className="text-purple mb-0"> {item.cliente.ponto_referencia} </p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    }
                                                </div>
                                            }
                                            {item.compras.frete === "retirar" && item.compras.id_ponto !== "0" &&
                                                <div>
                                                    <li className="list-group-item text-uppercase text-purple">
                                                        <div className="d-flex w-100 justify-content-between">
                                                            <h6 className="mb-0">Entrega</h6>
                                                            <h6 className="mb-0">{item.compras.frete} - R$0,00  </h6>
                                                        </div>
                                                    </li>
                                                    <li className="list-group-item text-uppercase text-purple">
                                                        <div className="row justify-content-between">
                                                            <div className="col-5 text-left">
                                                                <h6>CEP/CIDADE:</h6>
                                                            </div>
                                                            <div className="col-7 text-right">
                                                                <h6 className="text-purple mb-0">{item.ponto_distribucao.cidade_distribuicao}  </h6>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="list-group-item text-uppercase text-purple">
                                                        <div className="row justify-content-between">
                                                            <div className="col-4 text-left">
                                                                <p className="font-weight-bold">Endereço:</p>
                                                            </div>
                                                            <div className="col-8 text-right">
                                                                <p className="text-purple mb-0"> {item.ponto_distribucao.rua_distribuicao}, {item.ponto_distribucao.numero} -
                                                {item.ponto_distribucao.bairro_distribuicao}  </p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </div>
                                            }
                                            <li className="list-group-item text-center text-uppercase">
                                                <h6 className="mb-0">
                                                    <div className="row justify-content-between">
                                                        <div className="col-5 text-left text-purple">
                                                            <h6>Pagamento:</h6>
                                                        </div>
                                                        <div className="col-7 text-right">
                                                            <h6 className="text-purple">{item.compras.forma_pagamento}  </h6>
                                                        </div>
                                                    </div>
                                                </h6>
                                            </li>
                                            <li className="list-group-item text-center text-uppercase">
                                                <h6 className="mb-0">
                                                    <div className="row justify-content-between">
                                                        <div className="col-8 text-left text-purple">
                                                            <h6>Pagamento inicial:</h6>
                                                        </div>
                                                        <div className="col-4 text-right">
                                                            <h6 className="text-purple"> R$ {item.compras.pagamento_inicial}</h6>
                                                        </div>
                                                    </div>
                                                </h6>
                                            </li>
                                            {item.data_conclusao ?
                                                <li className="list-group-item text-center text-uppercase">
                                                    <h6 className="mb-0">
                                                        <div className="row justify-content-between">
                                                            <div className="col-8 text-left text-purple">
                                                                <h6>Pagamento final:</h6>
                                                            </div>
                                                            <div className="col-4 text-right">
                                                                <h6 className="text-purple"> R$ {item.compras.pagamento_final}</h6>
                                                            </div>
                                                        </div>
                                                    </h6>
                                                </li>
                                                :
                                                <li className="list-group-item text-center text-uppercase">
                                                    <h6 className="mb-0">
                                                        <div className="row justify-content-between">
                                                            <div className="col-8 text-left text-purple">
                                                                <h6>Pagamento restante:</h6>
                                                            </div>
                                                            <div className="col-4 text-right">
                                                                <h6 className="text-purple"> R$ {(item.compras.preco_total - item.compras.pagamento_inicial).toFixed(2)}</h6>
                                                            </div>
                                                        </div>
                                                    </h6>
                                                </li>
                                            }
                                        </UncontrolledCollapse>
                                        <li className="list-group-item text-center text-uppercase">
                                            <h6 className="mb-0">
                                                <div className="row justify-content-between">
                                                    <div className="col-8 text-left text-purple">
                                                        <h6>Valor total:</h6>
                                                    </div>
                                                    <div className="col-4 text-right">
                                                        <h6 className="text-purple"> R$ {item.compras.preco_total}</h6>
                                                    </div>
                                                </div>
                                            </h6>
                                        </li>
                                        <li className="list-group-item text-center text-uppercase text-purple">
                                            <a href="" id={`detalhes${item.id_compra}`} > Mostrar/Fechar detalhes </a>
                                        </li>
                                        {item.situacao === "saiu para a entrega" || item.situacao === "disponível para retirada" ?
                                            <li className="list-group-item">
                                                <div className="col-auto">
                                                    <div className="input-group input-group-sm">
                                                        <div className="input-group-prepend">
                                                            <div className="input-group-text">R$ </div>
                                                        </div>
                                                        <input type="number" className="form-control"
                                                            min={(item.compras.preco_total - item.compras.pagamento_inicial).toFixed(2)} id={item.id_pedido} onChange={mudarValor} placeholder="Valor final" />
                                                    </div>
                                                </div>
                                            </li> : (" ")
                                        }
                                    </ul>
                                    {!item.data_conclusao &&
                                        <div className="card-body text-right">
                                            <div className="input-group mb-3">
                                                <select className="custom-select custom-select-sm" onChange={selectMudarStatus} id={item.id_pedido}>
                                                    <option selected disabled>Mudar status para:</option>
                                                    <option value="1">Aprovado</option>
                                                    <option value="2">Em produção</option>
                                                    <option value="6">Disponível para retirada</option>
                                                    <option value="3">Saiu para Entrega</option>
                                                    <option value="4">Concluído</option>
                                                    <option value="5">Cancelado</option>
                                                </select>
                                                <div className="input-group-append">
                                                    <button className="btn btn-success btn-sm situa1" id={item.id_pedido} onClick={mudarStatus}>
                                                        <i className="fas fa-sync-alt"></i> Atualizar
                                        </button>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                }

            </div>
        </div>
    );
}