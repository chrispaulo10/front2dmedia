import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {useSelector, useDispatch} from 'react-redux';
import {openModal} from '../../store/extras'

function ModalTeste() {

    const state = useSelector(state => state.modal_open);
    const teste = state.map(teste => teste);
    console.log(teste);

  return (
    <div>
      <Modal toggle={false}>
        <ModalHeader toggle={false}>Modal title</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" >Do Something</Button>{' '}
          <Button color="secondary">Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalTeste;