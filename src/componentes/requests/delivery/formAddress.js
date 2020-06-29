import React,{useState} from 'react';
import {ModalBody, ModalFooter, Button} from 'reactstrap';

export default function FormAddress() {

    return(
        <div>
            <ModalBody>
            {/* <!-- CEP E ESTADO --> */}
                <div className="row">
                    <div className="col-lg-4">
                        <div className="input-formula">
                            <input type="text" name="zip" id="zip" className="input-float" placeholder="A" />
                            <label for="zip" id="label" className="label-float">
                                CEP
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="input-formula">
                            <input type="text" name="city" id="city" className="input-float" placeholder="A" />
                            <label for="city" id="label" className="label-float">
                                Cidade
                            </label>
                        </div>
                    </div>
                </div>
                {/* <!-- FIM CEP E ESTADO --> */}
                {/* <!-- CIDADE E BAIRRO --> */}
                <div className="row">
                    <div className="col-lg-9">
                        <div className="input-formula">
                            <input type="text" name="neighborhood" id="neighborhood" className="input-float"
                                placeholder="A" />
                            <label for="neighborhood" id="label" className="label-float">
                                Bairro
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="input-formula">
                            <input type="text" name="number" id="number" className="input-float" placeholder="A" />
                            <label for="number" id="label" className="label-float">
                                Número
                            </label>
                        </div>
                    </div>
                </div>
                {/* <!-- FIM CIDADE E BAIRRO --> */}
                <div className="row">
                    <div className="col-lg-12">
                        <div className="input-formula">
                            <input type="text" name="street" id="street" className="input-float" placeholder="A" />
                            <label for="street" id="label" className="label-float">
                                Rua
                            </label>
                        </div>
                    </div>
                </div>
                <div className="input-formula">
                    <input type="text" name="complement" id="complement" className="input-float" placeholder="A" />
                    <label for="complement" id="label" className="label-float">
                        Complemento
                    </label>
                </div>
            </ModalBody>
            <ModalFooter>
            <Button color="danger">Confirmar</Button>{' '}
            </ModalFooter>
        </div>
    );
}