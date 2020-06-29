import React, { useState } from 'react';
import { ListGroupItem, Modal, ModalHeader } from 'reactstrap';
import FormAddress from './formAddress';
import ItemAddress from './itemAddress';
function Delivery() {

    const [modal,setModal] = useState(false);
    const toggle = () => setModal(!modal);
    
    return(
        <div>
        <h5>Onde devemos entregar?</h5>
        <ul className="list-group shadow-sm mb-5">
            <ItemAddress />
            <ListGroupItem tag="button" className="text-center" onClick={toggle} action>
                <i className="fas fa-plus"></i> &nbsp; 
                Adicionar novo endereço
            </ListGroupItem>
        </ul>
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Adicionar novo endereço</ModalHeader>
            <FormAddress />
        </Modal>
        </div>
    );
}

export default Delivery;