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
        setFinal({...final, local: Number(event.target.value), valor_frete : value, valor_final: valor.total + value})
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
        axios.get(`ControllerCliente.php?consultar_endereco&id_cliente=${dados.id}`)
        .then(
            retornando => {
                if (retornando.data.error) {
                    alert(`Nenhum endereço cadastrado no cliente : ${dados.nome}`)
                        setFrete({...frete, tipo: 1})
                        setFinal({...final, tipo_frete : 1})
                } else {
                    setAddressClient(retornando.data)
                }
                
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
            if (final.local !== 0) {
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
            } else {
                alertarErro()
                setTimeout(()=>{ fecharErr() },2200)
            }
    }

    const [consultaCorreio, setConsultaCorreio] = useState({
        cep_origem: '',
        cep_destino: '',
        formato: 1,
        comprimento: 0,
        altura: 0,
        largura: 0,
        peso: 0,
        valor: 0,
    })

    const mudaConsulta = e =>{
        setConsultaCorreio({...consultaCorreio, [e.target.name]: e.target.value});
    }
    
    const [resultCorreioPAC, setResultConsult] = useState("");
    const [resultCorreioSED, setResultConsultSED] = useState("");

    const pesquisarCorreio = e =>{
        var url1 = `ControllerCompra.php?consultar_valor_frete&cep_origem=${consultaCorreio.cep_origem}&cep_destino=${consultaCorreio.cep_destino}&formato=${consultaCorreio.formato}&peso=${consultaCorreio.peso}&valor=${consultaCorreio.valor}&tipo_frete=04510&altura=${consultaCorreio.altura}&largura=${consultaCorreio.largura}&comprimento=${consultaCorreio.comprimento}`
        axios.get(url1).then(retorno => {
            setResultConsult(retorno.data.cServico)
            console.log(retorno.data);
        }).catch(function (error) {
            console.log(error);
        })
        var url2 = `ControllerCompra.php?consultar_valor_frete&cep_origem=${consultaCorreio.cep_origem}&cep_destino=${consultaCorreio.cep_destino}&formato=${consultaCorreio.formato}&peso=${consultaCorreio.peso}&valor=${consultaCorreio.valor}&tipo_frete=04014&altura=${consultaCorreio.altura}&largura=${consultaCorreio.largura}&comprimento=${consultaCorreio.comprimento}`
        axios.get(url2).then(retorno => {
            setResultConsultSED(retorno.data.cServico)
            console.log(retorno.data);
        }).catch(function (error) {
            console.log(error);
        })
    }
    console.log(consultaCorreio)

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
                    {frete.tipo === 3 && 
                        <ListGroupItem> 
                            <div className="row"> 
                                <div className="co-lg-3 col-md-3">
                                    <div className="input-formula">
                                        <input required type="number" name="cep_origem" 
                                        onChange={mudaConsulta} value={consultaCorreio.cep_origem}
                                        id="cep_origem" className="input-float" placeholder=" " maxLength="8"/>
                                        <label for="cep_origem" id="label" className="label-float">
                                            CEP DE ORIGEM
                                        </label>
                                    </div>
                                </div>
                                <div className="co-lg-3 col-md-3">
                                    <div className="input-formula">
                                        <input required type="number"
                                        onChange={mudaConsulta} value={consultaCorreio.cep_destino}
                                        name="cep_destino" id="cep_destino" className="input-float" placeholder=" " maxLength="8" />
                                        <label for="cep_destino" id="label" className="label-float">
                                            CEP DE DESTINO
                                        </label>
                                    </div>
                                </div>
                                <div className="co-lg-3 col-md-3">
                                    <div className="input-formula">
                                    <select className="input-float" onChange={mudaConsulta} value={consultaCorreio.formato}
                                    name="formato">
                                        <option value="1"> Pacote </option>
                                        <option value="3"> Envelope </option>
                                    </select> 
                                        <label for="formato" id="label" className="label-float">
                                            Formato
                                        </label>
                                    </div>
                                </div>
                                <div className="co-lg-3 col-md-3">
                                    <div className="input-formula">
                                        <input required type="number" name="valor" 
                                        onChange={mudaConsulta} value={consultaCorreio.valor}
                                        id="valor" className="input-float" placeholder=" " />
                                        <label for="valor" id="label" className="label-float">
                                            VALOR (R$)
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {/* ///////////////////////////////////////////////// */}
                            <div className="row"> 
                                <div className="co-lg-3 col-md-3">
                                    <div className="input-formula">
                                        <input required type="number" 
                                        onChange={mudaConsulta} value={consultaCorreio.comprimento}
                                        name="comprimento" id="comprimento" className="input-float" placeholder=" " />
                                        <label for="comprimento" id="label" className="label-float">
                                            COMPRIMENTO(cm)
                                        </label>
                                    </div>
                                </div>
                                <div className="co-lg-3 col-md-3">
                                    <div className="input-formula">    
                                        <input required type="number"
                                        onChange={mudaConsulta} value={consultaCorreio.altura}
                                        name="altura" id="altura" className="input-float" placeholder=" " />
                                        <label for="altura" id="label" className="label-float">
                                            ALTURA(cm)
                                        </label>
                                    </div>
                                </div>
                                <div className="co-lg-3 col-md-3">
                                    <div className="input-formula">
                                        <input required type="number"
                                        onChange={mudaConsulta} value={consultaCorreio.largura}
                                        name="largura" id="largura" className="input-float" placeholder=" " />
                                        <label for="largura" id="label" className="label-float">
                                            LARGURA(cm)
                                        </label>
                                    </div>
                                </div>
                                <div className="co-lg-3 col-md-3">
                                    <div className="input-formula">
                                        <input required type="number"
                                        onChange={mudaConsulta} value={consultaCorreio.peso}
                                        name="peso" id="peso" className="input-float" placeholder=" " />
                                        <label for="peso" id="label" className="label-float">
                                            PESO(kg)
                                        </label>
                                    </div>
                                </div>
                            </div> 
                            <button className="btn btn-purple" onClick={pesquisarCorreio}><i className="fas fa-search"></i> &nbsp; Pesquisar</button>

                            {resultCorreioPAC !== "" &&
                                <div> 
                                <h5 className="mt-3 mb-2">Resultados:</h5>
                                    <table className="table table-hover table-bordered text-center table-sm">
                                        <tr className="font-weight-bold">
                                            <td> CORREIOS </td>
                                            <td> SEDEX </td>
                                            <td> PAC </td>
                                        </tr>
                                        <tr>
                                            <td> Prazo </td>
                                            <td> Dia da Postagem + {resultCorreioSED.PrazoEntrega} dias úteis</td>
                                            <td> Dia da Postagem + {resultCorreioPAC.PrazoEntrega} dias úteis</td>
                                        </tr>
                                        <tr>
                                            <td> Preço Serv. </td>
                                            <td> R${resultCorreioSED.ValorSemAdicionais} </td>
                                            <td> R${resultCorreioPAC.ValorSemAdicionais} </td>
                                        </tr>
                                        <tr>
                                            <td> Valor Dec. </td>
                                            <td> R${resultCorreioSED.ValorValorDeclarado} </td>
                                            <td> R${resultCorreioPAC.ValorValorDeclarado} </td>
                                        </tr>
                                        <tr className="table-info vl-total">
                                            <td> Valor Total </td>
                                            <td> R${resultCorreioSED.Valor} </td>
                                            <td> R${resultCorreioPAC.Valor} </td>
                                        </tr>
                                        
                                    </table>
                                </div>
                            }   

                        </ListGroupItem>
                    }                    
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
                                        <span>R${final.subtotal_bruto.toFixed(2)}</span>
                                    </li>
                                    {final.desconto &&
                                    <div>
                                        <li>
                                            Desconto
                                            <span>{final.desconto}% </span>
                                        </li>
                                        <li>
                                            Subtotal c/desconto
                                            <span>R${final.subtotal_desconto.toFixed(2)}</span>
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
                                        <span>R$ {restante.toFixed(2)}</span>
                                    </li>
                                    <li>
                                        Valor total
                                        <span>R$ {final.valor_final.toFixed(2)} </span>
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