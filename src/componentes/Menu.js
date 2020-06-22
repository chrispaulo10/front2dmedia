import React, { useState } from 'react';
import '../bootstrap.css';
import { Collapse, ListGroup, ListGroupItem, Row, Col,Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Product from './Product';
import { useSelector } from 'react-redux';
function Menu() {
    
    const [collapse, setCollapse] = useState(false);

    const [status, setStatus] = useState('fas fa-angle-right');

    const onEntered = () => setStatus('fas fa-angle-down');
    
    const onExited = () => setStatus('fas fa-angle-right');

    const [modal, setModal] = useState(false);

    const openProducts = () => setCollapse(!collapse);

    const openModalExtras = () => setModal(!modal);

    const products = useSelector(state => {
        return state;
    })

    return(
        <div>
       <div className="mt-5 mb-2">
            </div>
            <div onClick={openProducts} className="category mb-3">
                PIZZAS
                <span className="float-right"> <i className={status}></i> </span>
            </div>
            {/* PRODUCTS */}
            <Collapse isOpen={collapse}
                    onEntered={onEntered}
                    onExited={onExited}>
            <ListGroup>
                {products.map((product, index) => <Product key={index} product={product} /> )}
            </ListGroup>
            </Collapse>
            {/* MODAL EXTRAS */}
                <Modal isOpen={modal} toggle={openModalExtras}>
                <ModalHeader toggle={openModalExtras}>Extras</ModalHeader>
                <ModalBody>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={openModalExtras}>Do Something</Button>{' '}
                <Button color="secondary" onClick={openModalExtras}>Cancel</Button>
                </ModalFooter>
                </Modal>
            {/* FIM MODAL EXTRAS */}
        </div>
    );    
}

export default Menu;