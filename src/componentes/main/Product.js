import React from 'react';
// import { ListGroupItem, Row, Col} from 'reactstrap';


export default function Product({ product, addItemCart, categoria }){

return(
        <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-3">
        <div className="card" style={{ maxWidth: "16rem" }} onClick={()=> addItemCart(product, categoria)}>
            <img src="https://img.elo7.com.br/product/zoom/2E2D7F4/tag-etiqueta-de-lingerie-moda-intima-personalizada-5x9cm-cartao.jpg"
            className="card-img-top img-fluid" height="150" alt=""/>
            <div className="card-body">
            <div className="produto text-uppercase"> {product.nome_produto} </div>
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
