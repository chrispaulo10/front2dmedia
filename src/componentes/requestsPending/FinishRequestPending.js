import React,{useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { hideModal2 } from '../../store/modal2';
import { Alert, ListGroupItem, Row, Col } from 'reactstrap';
import ModalSecond from '../modal/modalSecond';
import axios from '../../server/axios';

export default function FinishRequestPending({dados, id_proprietario = 1 , valor}){
    const dispatch = useDispatch();
    // ABRIR E FECHAR MODAL
    const opening = useSelector(state => state.isOpen2)
    const fecha = () => dispatch(hideModal2());
    // ALERT
    const [alertCad, setAlertCad] = useState(false);
    function alertarSucesso(){setAlertCad(true)}
    function fecharSucesso(){setAlertCad(false)}

    // ALERT
    const [alertErr, setAlertErr] = useState(false);
    function alertarErro(){setAlertErr(true)}
    function fecharErr(){setAlertErr(false)}    
    
    // TUDO DE ENDEREÇO E ENTREGA 
    const [addressOwner, setAddressOwner ] = useState([]);
    const [addressClient, setAddressClient ] = useState([]);
    const [frete, setFrete] = useState({
        tipo : 1,
        address : '',
        valor : 0,
    });
    function handleChange(event){
        var value = parseInt(event.target.name);
        // SE FOR RETIRADA, TIPO DE FRETE 1 E LOCAL = ID_PONTO_DISTRIBUIÇÃO
        // SE FOR ENTREGA, TIPO DE FRETE 2 E LOCAL = ID_CLIENTE PARA PEGAR O BAIRRO DELE
        // SE FOR CORREIOS, TIPO DE FRETE 3 LOCAL = ID_CLIENTE E VALOR DO FRETE CORREIO PEGO COM A API  
        setFinal({...final, local: event.target.value, valor_frete : value, valor_final: valor.total + value})
    };
    function mudaEntrega(event){
        setFrete({...frete, tipo : parseInt(event.target.value,10)})
        setFinal({...final, tipo_frete : parseInt(event.target.value,10)});
    }
    useEffect(()=>{
        axios.get(`ControllerPontoDistribuicao.php?listar&id_proprietario=${id_proprietario}`).then(
            retorna => {
                setAddressOwner(retorna.data);
                }
        )
    },[id_proprietario])
    useEffect(()=>{
        frete.tipo === 2 &&
        axios.get(`ControllerCliente.php?consultar_endereco&id_cliente=${dados.id}`).then(
            retornando => {
                setAddressClient(retornando.data)
            }
        )
    },[dados.id, frete.tipo])

    // TUDO DE PAGAMENTO 
    const [pagamento, setPagamento] = useState({
        forma : 0,
        pag_inicial : 0,
        valor_total : 0,
    });
    function escolhaPagamento(event){
        setFinal({...final, forma_pagamento: parseInt(event.target.value,10)});
        setPagamento({...pagamento, forma: parseInt(event.target.value,10) })
        
    }
    function pegarObservacao(event){
        setFinal({...final, observacao : event.target.value})
    }

    function pegarDataPrevisao(event){
        setFinal({...final, data_previsao : event.target.value})
    }
    // OBJETO FINAL PARA ENVIO

    const [final, setFinal] = useState({
        cadastrar: true,
        id_cliente : dados.id,
        id_pedido : valor.iden,
        data_hora : '',
        // VALORES DO ORÇAMENTO
        subtotal_bruto : valor.valor_s,
        desconto : valor.descon,
        subtotal_desconto : valor.valor_desc,
        // ENTREGA
        tipo_frete : frete.tipo,
        local : frete.address,
        valor_frete: frete.valor,
        // PAGAMENTO
        forma_pagamento : pagamento.forma,
        pagamento_inicial : pagamento.pag_inicial,
        valor_final: valor.total,
        // OBSERVAÇÃO
        observacao : '',
        data_previsao: '',
    });
    
    const [restante, setRestante] = useState(final.valor_final + final.valor_frete);
    function pegarInicial(event){
        var value = parseFloat(event.target.value); 
        setFinal({...final, pagamento_inicial : value})
        setRestante(final.valor_final - value)
    }

    useEffect(()=>{
        setFinal({...final, id_cliente: dados.id})
    },[dados.id])


    const enviarTudo = event => {

            var url = `ControllerCompra.php?cadastrar&data_previsao=${final.data_previsao}&desconto=${final.desconto}&id_cliente=${final.id_cliente}&id_pedido=${final.id_pedido}&forma_pagamento=${final.forma_pagamento}&observacao=${final.observacao}&pagamento_inicial=${final.pagamento_inicial}&subtotal_bruto=${final.subtotal_bruto}&subtotal_desconto=${final.subtotal_desconto}&tipo_frete=${final.tipo_frete}&valor_final=${final.valor_final}&valor_frete=${final.valor_frete}&local=${final.local}`;  
            axios.get(url).then(
                retorna => { 
                    if(retorna.data.error){
                        alertarErro()
                        setTimeout(()=>{ fecharErr() },2200)
                    }
                    else{
                        alertarSucesso();
                        setTimeout(()=>{ fecharSucesso() },1500)
                        setTimeout(()=>{ document.location.reload(true); },2000)
                    }
                }
            ).catch(function (error) {
                console.log(error);
            })
    }

    console.log(final)
    return(
        <div>
            <ModalSecond open={opening} size="xl" header="Aprovar orçamento"
            body={
                <div>
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="row justify-content-center"> 
                            <ul className="list-group list-group-horizontal-sm mb-3">
                                <li className="list-group-item list-purple">{dados.nome}</li>
                                <li className="list-group-item list-purple">{dados.telefone}</li>
                            </ul>
                            </div>
                            <div>
                    <div className="row justify-content-between mb-3 mt-2">
                        <div className="col-lg-8"> 
                            <h5 className="mb-0">Forma de entrega</h5>
                        </div>
                        <div className="col-lg-4">
                        <select className="custom-select custom-select-sm" value={final.tipo_frete} onChange={mudaEntrega}>
                            <option value={1}>Retirada</option>
                            <option value={2}>Delivery</option>
                            <option value={3}>Envio pelos correios</option>                    
                        </select>
                        </div>
                    </div>
                    <ul className="list-group shadow-sm mb-4" >
                    {frete.tipo === 1 && addressOwner.map((item, index) => (
                        <ListGroupItem key={index}>     
                                <Row>
                                    <Col xs="2" sm="2" md="2" lg="1">
                                        {/* VALOR DO FRETE ZERO NO NAME */}
                                        <input type="radio" name={0} onChange={handleChange} value={item.id_ponto_distribuicao}
                                        className="option-input radio"/>
                                    </Col>
                                    <Col xs="10" sm="10" md="10" lg="11">
                                    <h6 className="tituloEndereco">
                                        {item.rua} , {item.numero} - {item.bairro} 
                                    </h6>
                                    <h6 className="taxaEntrega">
                                        Taxa de entrega: &nbsp;
                                    </h6>
                                    <h6 className="valor">
                                        R$ 0.00
                                    </h6>        
                                    </Col>  
                                </Row>
                        </ListGroupItem>
                    ))}
                    {frete.tipo === 2 && addressClient.length > 0 && addressClient.map((item, index) => (
                        <ListGroupItem key={index}>     
                                <Row>
                                    <Col xs="2" sm="2" md="2" lg="1">
                                        {/* NAME É O VALOR DO FRETE */}
                                        <input type="radio" name={item.preco} onChange={handleChange} value={dados.id}
                                        className="option-input radio"/>
                                    </Col>
                                    <Col xs="10" sm="10" md="10" lg="11">
                                    <h6 className="tituloEndereco">
                                        {item.rua} , {item.numero} - {item.bairro} 
                                    </h6>
                                    <h6 className="taxaEntrega">
                                        Taxa de entrega: &nbsp;
                                    </h6>
                                    <h6 className="valor">
                                        R$ {item.preco}
                                    </h6>        
                                    </Col>  
                                </Row>
                        </ListGroupItem>
                    ))}
                    {frete.tipo === 3 && <h4> Calculo de responsabilidade do administrador </h4>}                    
                    </ul>
                    </div>                        
                        <h5> Forma de pagamento </h5>
                        <select className="custom-select mb-4" value={final.forma_pagamento} onChange={escolhaPagamento}>
                            <option value="0">Dinheiro</option>
                            <option value="1">Boleto bancário</option>
                            <option value="2">Transferência</option>
                            <option value="3">Cartão de crédito</option>
                            <option value="4">Cartão de débito</option>
                        </select>

                        <div className="form-group">
                            <h5>Observações</h5>
                    <textarea className="form-control" onChange={pegarObservacao} id="obs" rows="3">{final.observacao}</textarea>
                        </div>

                        </div>
                        <div className="col-lg-4">
                            <div className="shop-total">
                                <h3>Resumo do pedido</h3>
                                <ul>
                                    <li>
                                        <div className="row justify-content-between">
                                            <div className="col-lg-5 col-md-2 col-sm-4 col-6"> Previsão </div>
                                            <div className="col-lg-7 col-md-10 col-sm-8 col-6">
                                                <div className="col-auto">
                                                    <input type="date" onChange={pegarDataPrevisao} className="form-control form-control-sm"/>
                                                </div>                            
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        Subtotal s/ desconto
                                        <span>R${final.subtotal_bruto}</span>
                                    </li>
                                    {final.desconto &&
                                    <div>
                                        <li>
                                            Desconto
                                            <span>{final.desconto}% </span>
                                        </li>
                                        <li>
                                            Subtotal c/desconto
                                            <span>R${final.subtotal_desconto}</span>
                                        </li>                                        
                                    </div>}
                                    <li>
                                        Frete
                                        <span>R$ {final.valor_frete}</span>
                                    </li>
                                    <li>
                                        <div className="row justify-content-between">
                                            <div className="col-lg-4 col-md-6 col-sm-6 col-6"> Valor inicial </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                                <div className="col-auto">
                                                    <div className="input-group input-group-sm">
                                                        <div className="input-group-prepend">
                                                        <div className="input-group-text">R$ </div>
                                                        </div>
                                                        <input type="text" className="form-control" onChange={pegarInicial} />
                                                    </div>
                                                </div>                            
                                            </div>
                                        </div>
                                    </li>
                                    <li className="order-total">
                                        Valor restante
                                        <span>R$ {restante}</span>
                                    </li>
                                    <li>
                                        Valor total
                                        <span>R$ {final.valor_final} </span>
                                    </li>
                                <Alert color="warning" className="text-center mt-2 mb-0" isOpen={alertErr} fade={false}>
                                    <i className="fas fa-exclamation-triangle"></i> Informe todos os campos!
                                </Alert>
                                <Alert color="success" className="text-center mt-2 mb-0" isOpen={alertCad} fade={false}>
                                    <i className="fas fa-check"></i> Orçamento aprovado!
                                </Alert>
                                </ul>
                            </div>        
                        </div>
                    </div>
                </div>
            }
            footer={
                <div> 
                    <button className="btn btn-danger" onClick={fecha}> <i className="fas fa-times"></i> Cancelar </button> &nbsp;
                    <button className="btn btn-success" onClick={enviarTudo}>
                    <i className="fas fa-check"></i> Finalizar orçamento
                    </button>
                </div>
            }
            />
        </div>
    );
}