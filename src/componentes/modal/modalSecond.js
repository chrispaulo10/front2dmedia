import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const  ModalSecond= props => {

const {open, toggle , size, header, body, footer} = props;

return (
    <div>
    <Modal isOpen={open} toggle={toggle} size={size}>
        <ModalHeader toggle={toggle}>
        {header}
        </ModalHeader>
        <ModalBody>
        {body}
        </ModalBody>
        <ModalFooter>
        {footer}
        </ModalFooter>
    </Modal>
    </div>
);
}

export default ModalSecond;