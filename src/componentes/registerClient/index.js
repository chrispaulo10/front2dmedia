import React, {useState} from 'react';

export default function RegisterClient(){
    

    const [form, setForm] = useState({
        name : '',
        phone : '',
        zip : '',
        city : '',
        neighborhood : '',
        number : '',
        street : '',
        complement : '',
    });

    function formChange(e){
        setForm({...form, [e.target.name]: e.target.value});
    }



    return(
        <div>
        <form>
            {/* <!-- CEP E ESTADO --> */}
            <div className="row">
                    <div className="col-lg-8">
                        <div className="input-formula">
                            <input onChange={formChange} value={form.name} required type="text" name="name" id="name" className="input-float" placeholder="A" />
                            <label for="name" id="label" className="label-float">
                                Nome
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="input-formula">
                            <input onChange={formChange} value={form.phone} type="text" name="phone" id="phone" required className="input-float" placeholder="A" />
                            <label for="phone" id="label" className="label-float">
                                Whatsapp
                            </label>
                        </div>
                    </div>
                </div>            
            {/* <!-- CEP E ESTADO --> */}
                <div className="row">
                    <div className="col-lg-4">
                        <div className="input-formula">
                            <input onChange={formChange} value={form.zip} required type="text" name="zip" id="zip" className="input-float" placeholder="A" />
                            <label for="zip" id="label" className="label-float">
                                CEP
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="input-formula">
                            <input onChange={formChange} value={form.city} type="text" name="city" id="city" required className="input-float" placeholder="A" />
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
                            <input onChange={formChange} value={form.neighborhood} type="text" name="neighborhood" id="neighborhood" required className="input-float"
                                placeholder="A" />
                            <label for="neighborhood" id="label" className="label-float">
                                Bairro
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="input-formula">
                            <input onChange={formChange} value={form.number} type="text" name="number" id="number" className="input-float" placeholder="A" />
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
                            <input onChange={formChange} value={form.street} type="text" name="street" id="street" className="input-float" placeholder="A" />
                            <label for="street" id="label" className="label-float">
                                Rua
                            </label>
                        </div>
                    </div>
                </div>
                <div className="input-formula">
                    <input onChange={formChange} value={form.complement} type="text" name="complement" id="complement" className="input-float" placeholder="A" />
                    <label for="complement" id="label" className="label-float">
                        Complemento
                    </label>
                </div>
            </form>
        </div>
    );
}