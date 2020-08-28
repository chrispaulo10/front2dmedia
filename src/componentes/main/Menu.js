import React, {useEffect, useState} from 'react';
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

    function addItemCart(product, categoriaa){
        let passe = {
            produto : product,
            quantidade : 1,
            cat : categoriaa,

        }
        dispatch(addItem(passe))
    }    

    return(
        <div>
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
                <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-3">
                <div className="card teste" style={{ maxWidth: "16rem" }} onClick={()=> addItemCart(item, item.nome_categoria)}>
                    <img src={item.img_produto ? `http://gestao.2dmedia.com.br/views/img/produtos/${item.img_produto}`
            : `http://gestao.2dmedia.com.br/views/img/produtos/caixa.png`}
                    className="card-img-top img-fluid" height="150" alt=""/>
                    <div className="card-body">
                    <div className="produto text-uppercase"> {item.nome_produto} </div>
                    <small className="text-center"> {item.descricao} </small>
                    </div>
                    <div className="card-footer">
                        <div className="preco">    
                            R$ {item.preco}
                        </div>
                    </div>
                </div>
                </div>
                )}
            </div>
        </div>           
        : (
            all.map((item) => (
                <Accordion key={item.id_categoria} category={item.nome_categoria} 
                content={
                    <div className="row mt-3 mb-2 text-center">
                        {item.produtos.map(product => <Product key={product.id_produto} categoria={item.nome_categoria} product={product}
                        addItemCart={addItemCart} /> )}
                    </div>
                } />)
            )
        )}


        </div>
    );    
}