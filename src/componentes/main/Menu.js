import React, {useEffect, useState} from 'react';
import {Alert} from 'reactstrap';
import Accordion from './Accordion';
import Product from './Product';
import {addItem} from '../../store/cart';
import {useDispatch } from 'react-redux';
import axios from '../../server/axios';


export default function Menu() {

    const [all, setAll] = useState([]);
    
    useEffect(() => {
        axios.get('ControllerCategoria.php?consultar_categoria_produtos&id_proprietario=1').then(
            response => {
            response.data.error ? setAll([]) : setAll(response.data);
        })
    }, [])


    const [pesquisa,setPesquisa] = useState([]);
    const [input, setInput] = useState([]);
    const [cart, setCart] = useState([]);

    const buscaNome = event => {
        let nome = event.target.value;
        setInput(event.target.value);
        axios.get(`ControllerProduto.php?consultarPorNome&nome=${nome}`).then(
            retorna =>{
                retorna.data.error ? setPesquisa([]) :
                setPesquisa(retorna.data)
            }
        )
    }

    const dispatch = useDispatch();

    function addItemCart(product, categoriaa, subcat){
        var prod = {
            produto : product,
            cat : categoriaa,
            subcat : subcat,
        }
        setCart([...cart, {prod , quantidade : 1}]);
        console.log(cart)
        // dispatch(addItem(passe))
    }


    // ==============PARTE DO CARRINHO================
    

    function addQtd(index){
        setCart(cart.map((item, idx)=>{
            if (index === idx) {
                item.quantidade += 1;
            }
            return item;
        }))
        
    }

    function rmQtd(index){
        setCart(cart.map((item, idx)=>{
            if (index === idx && item.quantidade > 1 ) {
                item.quantidade -= 1;
            }
            return item;
        }))
    }


    const [form, setForm] = useState({
        desconto : 0,
        nome_cliente : '',
    })

    let concatenar_preco = cart.map(teste => parseFloat(teste.prod.produto.preco) * teste.quantidade );

    let id_dos_produtos = cart.map(pegar_id => pegar_id);

    // let quantidade_produtos = cart.map(pegar_quantid => pegar_quantid.prod.produto.id_produto);

    var total = concatenar_preco.reduce((total, numero) => total + numero, 0);


    function nomeCliente(event){
        setForm({...form, [event.target.name]: event.target.value });
    }

    function removeItemCart(idx){
        const newCart = Object.assign([], cart)
        newCart.splice(idx, 1)
        setCart(newCart)

        // dispatch(removeItem(id));
    }
    
    const [alertCad, setAlertCad] = useState(false);

    function alertarSucesso(){setAlertCad(true)}

    function fecharSucesso(){setAlertCad(false)}

    function resetCart() {
        setCart([]);
    }

    function enviar_post(){
        let nome = form.nome_cliente;
        
        axios.get(`ControllerPedido.php?cadastrar&nome_cliente=${nome}`).then(
            retorno => {
                id_dos_produtos.map(item => (
                    axios.get(`ControllerPedidoProduto.php?cadastrar&id_pedido=${retorno.data.id_pedido}&id_produto=${item.prod.produto.id_produto}&qtd=${item.quantidade}`)
                    .then(
                        retorna =>{
                            if (retorna) {
                                alertarSucesso();
                                setTimeout(()=>{
                                    fecharSucesso()
                                    resetCart();
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
<div className="row">
    <div className="col-lg-8">
        <div className="mt-5 mb-2">
        <div className="input-group mb-3 mt-4">
                <input type="text" className="form-control" placeholder="Digite o que você precisa"
                onChange={buscaNome}/>
                <div className="input-group-append">
                    <button className="btn btn-purple" type="button" id="button-addon2">
                        <i className="fas fa-search"></i>
                    </button>
                </div>
                </div>
        </div>
        {input.length > 0 ?
        <div> 
            <h5> Resultados da pesquisa </h5>
            <div className="row mt-3 mb-2 text-center">
                {pesquisa.map(item =>
                <Product key={item.id_produto} categoria={item.nome_categoria} product={item}
                addItemCart={addItemCart} /> )}
            </div>
        </div>           
        : (
            all.map((item) => (
                <Accordion key={item.id_categoria} category={item.nome_categoria} 
                content={
                <div>
                    
                            {item.subcategorias && item.subcategorias.map(subs =>
                                <div className="row mt-3">
                                    <div className="col-lg-8 col-md-8">  
                                        <div className="list-group shadow-sm">
                                        <div className="subcategorias list-group-item text-uppercase" key={subs.id_subcategoria}> {subs.nome_subcategoria} </div>           
                                        {subs.produtos && subs.produtos.map(productSubs => 
                                            <div className="list-group-item list-group-item-action text-purple" onClick={() => addItemCart(productSubs, item.nome_categoria, subs.nome_subcategoria)}
                                            style={{fontSize:16, cursor:"pointer"}}> 
                                                <strong>{productSubs.nome_produto} </strong> - R$<strong>{productSubs.preco} </strong>
                                                {!subs.descricao_subcategoria &&
                                                    <div>
                                                        <small className="text-dark">{productSubs.descricao}</small>
                                                    </div>
                                                }
                                            </div>    
                                        )}
                                        </div> 
                                    </div>
                                    <div className="col-lg-4 col-md-4 text-center">
                                        <img width="100%" height="170" className="shadow-sm" style={{borderRadius: 3}} src={`http://gestao.2dmedia.com.br/views/img/subcategorias/${subs.img}`} alt="" />
                                            {subs.descricao_subcategoria && 
                                                <div className="card shadow-sm mt-2 mb-2" style={{padding: 8}}> 
                                                    <small>
                                                        {subs.descricao_subcategoria}
                                                    </small>
                                                    
                                                </div>
                                            }
                                    </div>
                                </div>
                            ) }
                            {item.produtos &&
                            <div className="row mt-3 mb-2 text-center">
                                {item.produtos.map(product => <Product key={product.id_produto} categoria={item.nome_categoria} product={product}
                                addItemCart={addItemCart} /> )}
                            </div>
                            }
                    
                </div>
                } />)
            )
        )}
        </div>
                    <div className="col-lg-4"> 
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
                                                <h6>{cart.prod.cat}{cart.prod.subcat && `: ${cart.prod.subcat}`} - {cart.prod.produto.nome_produto} </h6>
                                                    <small style={{cursor: "pointer"}} onClick={() => removeItemCart(index)}><i className="fas fa-trash"></i></small>
                                            </div>
                                        <div className="row">   
                                            <div className="col-6 col-lg-6 col-md-6 col-sm-6">
                                                <form className="form-inline">
                                                    <div className="form-group">
                                                        <label for="inputPassword6">Qtd : &nbsp;
                                                            <small><i className="fas fa-minus-circle text-danger" onClick={()=>rmQtd(index)} type="button"></i></small> &nbsp;
                                                                {cart.quantidade}
                                                            &nbsp; <small><i className="fas fa-plus-circle text-success" onClick={()=>addQtd(index)} type="button"></i></small>
                                                        </label>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="col-6 col-lg-6 col-md-6 col-sm-6">
                                            <h6 className="float-right">R$ {(parseFloat(cart.prod.produto.preco) * cart.quantidade).toFixed(2)}  </h6>
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
    </div>
    </div>
    );    
}