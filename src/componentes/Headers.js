
import React, { useState } from 'react';
import {
  Collapse,
  UncontrolledCollapse,
  Container} from 'reactstrap';
import logo from '../img/logoPonto.png';
import '../bootstrap.css';
import YouOrderMobile from './YourOrderMobile';
function Headers(){

    const [isOpen, setIsOpen] = useState(false);
    const openItens = () => setIsOpen(!isOpen);

    return(
        <div className="mb-5">
        <nav className="navbar fixed-top navbar-expand-md navbar-dark bg-red">
        <Container>
            <a className="navbar-brand" href="#">
              <img src={logo} width="110"/>
            </a>
          {/* BUTTON SHOPPING */}
          <button className="navbar-toggler text-light" type="button" id="cart">
            <i className="fas fa-shopping-cart"></i> R$ 40,00
          </button>
        
        {/* BUTTON TOGGLER */}
          <button className="navbar-toggler text-light" type="button" onClick={openItens}>
          <i className="fas fa-bars"></i>
          </button>
          <Collapse isOpen={isOpen} navbar>
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Pricing</a>
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