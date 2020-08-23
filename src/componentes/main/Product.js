import React from 'react';
// import { ListGroupItem, Row, Col} from 'reactstrap';


export default function Product({ product, addItemCart, categoria }){

return(
        <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-3">
        <div className="card teste" style={{ maxWidth: "16rem" }} onClick={()=> addItemCart(product, categoria)}>
            <img src={product.img_produto ? `http://gestao.2dmedia.com.br/views/img/produtos/${product.img_produto}`
            : `http://gestao.2dmedia.com.br/views/img/produtos/caixa.png`}
            className="card-img-top img-fluid" height="150" alt=""/>
            <div className="card-body">
            <div className="produto text-uppercase"> {product.nome_produto} </div>
            <small className="text-center"> {product.descricao} </small>
            </div>
            <div className="card-footer">
                <div className="preco">    
                R$ {product.preco}
                </div>
            </div>
        </div>
        </div>
);
}
