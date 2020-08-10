import React, { useState } from 'react';
import {Row, Col} from 'reactstrap';
import {useSelector, useDispatch} from 'react-redux';
import {removeItem} from '../../store/cart';
import axios from '../../server/axios';

export default function YourOrder() {

    const cart = useSelector(state => state.cart);

    const dispatch = useDispatch();
    const [qtd,setQtd] = useState(1);

    function addQtd(){
    setQtd(qtd+1);
    }

    function rmQtd(){
    setQtd(qtd-1);
    }

    const [form, setForm] = useState({
        desconto : '',
        nome_cliente : '',
    })

    let concatenar_preco = cart.map(teste => parseFloat(teste.produto.preco));

    let id_dos_produtos = cart.map(pegar_id => pegar_id.produto.id_produto);

    var total = concatenar_preco.reduce((total, numero) => total + numero, 0);

    const [subtotal,setSubtotal] = useState();

    function addDesconto(event){
        setForm({...form, [event.target.name]: event.target.value});
        var valor = parseInt(event.target.value,10)
        setSubtotal(total - total * (valor/100));
    }

    function nomeCliente(event){
        setForm({...form, [event.target.name]: event.target.value });
    }

    function removeItemCart(id){
        dispatch(removeItem(id));
    }
    
    function enviar_post(){

        let data = new Date()
        let ano = data.getFullYear();
        let mes = data.getMonth();
        let dia = data.getDate();
        let hora    = data.getHours();
        let min     = data.getMinutes();        
        let seg     = data.getSeconds();        
        let date_time = `${ano}-${mes}-${dia} ${hora}:${min}:${seg}`;        
        let nome = form.nome_cliente;
        
        let dados = {
            cadastrar : id_dos_produtos
        }

        axios.get(`ControllerPedido.php?cadastrar&nome_cliente=${nome}&data_hora=${date_time}`).then(
            retorno => {
                id_dos_produtos.map(item => (
                    axios.get(`ControllerPedidoProduto.php?cadastrar&id_pedido=${retorno.data.id_pedido}&id_produto=${item}`)
                    .then(
                        retorna =>{
                            console.log(retorna.data)
                        }
                    )
                )
                )
            }
        )

    };
    

    return(
        <div> 
            <div className="your-order wow bounceInRight mt-5" data-wow-delay="0.2s" data-wow-duration="1.1s">
                <h3><i className="fas fa-coins"></i> Orçamento</h3>
                <div className="">
                <ul className="list-group list-group-flush">
                    {cart.length === 0 ?
        (
        <li className="list-group-item item-orcamento text-center">  
        <h6>  Sem itens no orçamento </h6>
        </li>
        ) : (
        <React.Fragment>
            <li className="list-group-item item-orcamento">
            <input type="text" name="nome_cliente" onChange={nomeCliente} value={form.nome_cliente} className="form-control" placeholder="Cliente"/>
            </li>
            {cart.map((cart,index) => 
                <li key={index} className="list-group-item item-orcamento">
                <div className="d-flex w-100 justify-content-between">
                    <h6>{cart.cat} - {cart.produto.nome_produto} </h6>
                    <small onClick={() => removeItemCart(index)}><i className="fas fa-trash"></i></small>
                </div>
                <Row>
                    <Col>
                    <small>Qtd: &nbsp;
                        <i className="fas fa-minus-circle text-danger" onClick={rmQtd}></i> &nbsp;
                        <span> {cart.quantidade} </span> &nbsp;
                        <i className="fas fa-plus-circle text-success" onClick={addQtd}></i>
                    </small>
                    </Col>
                    <Col>
                    <h6 className="float-right">R$ {parseFloat(cart.produto.preco)}  </h6>
                    </Col>
                </Row>
                </li>
                
            )}
            <li className="list-group-item item-orcamento">
            <div className="input-group">
            <input type="text" className="form-control" placeholder="Desconto" name="desconto" value={form.desconto} onChange={addDesconto}/>
            <div className="input-group-append">
                <span className="input-group-text" id="basic-addon2">%</span>
            </div>
            </div>
            </li>               
            <li className="list-group-item item-orcamento">
                <div className="d-flex w-100 justify-content-between">
                    <h6>Subtotal: </h6>
                    <h6>R$ {subtotal ? subtotal.toFixed(2) : total.toFixed(2)}</h6> 
                </div>
            </li>
            <center>
                <button className="glossy_button" onClick={enviar_post}>Finalizar</button>
            </center>
        </React.Fragment>
        ) 
    }
    </ul>
                    </div>
                </div>
            </div>
    );
}