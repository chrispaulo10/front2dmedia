import React, { useState } from 'react';
import {Row, Col, Alert} from 'reactstrap';
import {useSelector, useDispatch} from 'react-redux';
import {removeItem, resetCart} from '../../store/cart';
import axios from '../../server/axios';

export default function YourOrder() {

    // const[quantidade, setQuantidade] = useState();

    let cart = useSelector(state => state.cart);

    const dispatch = useDispatch();
    const [qtd,setQtd] = useState(1);

    function addQtd(index){
    }

    function rmQtd(idx){
        setQtd(qtd-1);
    }


    const [form, setForm] = useState({
        desconto : 0,
        nome_cliente : '',
    })

    let concatenar_preco = cart.map(teste => parseFloat(teste.produto.preco));

    let id_dos_produtos = cart.map(pegar_id => pegar_id.produto.id_produto);

    var total = concatenar_preco.reduce((total, numero) => total + numero, 0);


    function nomeCliente(event){
        setForm({...form, [event.target.name]: event.target.value });
    }

    function removeItemCart(id){
        dispatch(removeItem(id));
    }
    
    const [alertCad, setAlertCad] = useState(false);

    function alertarSucesso(){setAlertCad(true)}

    function fecharSucesso(){setAlertCad(false)}

    function enviar_post(){
        let nome = form.nome_cliente;
        
        axios.get(`ControllerPedido.php?cadastrar&nome_cliente=${nome}`).then(
            retorno => {
                id_dos_produtos.map(item => (
                    axios.get(`ControllerPedidoProduto.php?cadastrar&id_pedido=${retorno.data.id_pedido}&id_produto=${item}&qtd=1`)
                    .then(
                        retorna =>{
                            if (retorna) {
                                alertarSucesso();
                                setTimeout(()=>{
                                    fecharSucesso()
                                    dispatch(resetCart());
                                    setForm({...form, nome_cliente:'' });
                                }, 3000)
                            }
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
                <h6>{cart.cat}{cart.subcat && `: ${cart.subcat}`} - {cart.produto.nome_produto} </h6>
                    <small style={{cursor: "pointer"}} onClick={() => removeItemCart(index)}><i className="fas fa-trash"></i></small>
                </div>
                <div className="row">
                    <div className="col-6 col-lg-6 col-md-6 col-sm-6">
                        <form className="form-inline">
                            <div className="form-group">
                                <label for="inputPassword6">Qtd : &nbsp;
                                    <small><i className="fas fa-minus text-danger" onClick={()=>rmQtd(index)} type="button"></i></small> &nbsp;
                                        1
                                    &nbsp; <small><i className="fas fa-plus text-success" type="button"></i></small>
                                </label>
                            </div>
                        </form>
                    </div>
                    <div className="col-6 col-lg-6 col-md-6 col-sm-6">
                    <h6 className="float-right">R$ {parseFloat(cart.produto.preco)}  </h6>
                    </div>
                </div>
                </li>
                
            )}
            <li className="list-group-item item-orcamento">
                <div className="d-flex w-100 justify-content-between">
                    <h6>Subtotal: </h6>
                    <h6>R$ {total.toFixed(2)}</h6> 
                </div>
            </li>
                <Alert color="success" className="text-center mb-0 mt-3" isOpen={alertCad} fade={false}>
                    <i className="fas fa-check"></i> Orçamento cadastrado!
                </Alert>
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