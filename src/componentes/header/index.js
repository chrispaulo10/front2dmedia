import React, { useState } from 'react';
import {
  Collapse,
  UncontrolledCollapse,
  Container} from 'reactstrap';
import logo from '../../img/LogoHBranco.png';
import '../../css/bootstrap.css';
import YouOrderMobile from '../../componentes/main/YourOrderMobile';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

function Headers(){

    const [isOpen, setIsOpen] = useState(false);
    const openItens = () => setIsOpen(!isOpen);

    const soma = useSelector((state) => state.cart.length);

    return(
        <div className="mb-5">
        <nav className="navbar fixed-top navbar-expand-md navbar-dark bg-red">
        <Container>
            <a className="navbar-brand" href="index.js">
              <img src={logo} width="110" />
            </a>
          {/* BUTTON SHOPPING */}
          <button className="navbar-toggler text-light" type="button" id="cart">
            <i className="fas fa-shopping-cart"></i> {soma}
          </button>
        
        {/* BUTTON TOGGLER */}
          <button className="navbar-toggler text-light" type="button" onClick={openItens}>
          <i className="fas fa-bars"></i>
          </button>
          <Collapse isOpen={isOpen} navbar>
            <ul className="navbar-nav">
              <li className="nav-item link active">
                <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item link">
                <Link className="nav-link" to="/pending">Orçamentos pendentes</Link>
              </li>
              <li className="nav-item link">
                <Link className="nav-link" to="/login">Clientes</Link>
              </li>
            </ul>
                </Collapse>
            </Container>
        </nav>  
                    <Container className="list-cart">
                      <UncontrolledCollapse toggler="#cart">
                        <YouOrderMobile />
                      </UncontrolledCollapse>
                    </Container>
    </div>            
        );
    }


export default Headers;