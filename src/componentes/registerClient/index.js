import React, {useState, useEffect} from 'react';
import axios from '../../server/axios';
import { Alert } from 'reactstrap';
import InputMask from 'react-input-mask';

export default function RegisterClient(){

    const [alertCEP, setAlertCEP] = useState(false);
    
    const [alertGeral, setAlertGeral] = useState({
        success : false,
        warning: false,
        danger: false ,
    });

    const [cidades, setCidades] = useState([]);

    const [escolhaCidades, setEscolhaCidades] = useState();

    const [bairros, setBairros] = useState([]);

    useEffect(() => {
        axios.get('ControllerCidade.php?listar').then(retornaCidade => {
            retornaCidade.data.error ? setCidades([]) : setCidades(retornaCidade.data);
        })
    },[])

    function mudarCidade(e) {
        setEscolhaCidades(parseInt(e.target.value,10));
        // setForm({...form, cidade : Number(e.target.value)})
    }

    useEffect(()=>{
        axios.get(`ControllerBairros.php?listarPorCidade&id_cidade=${escolhaCidades}`).then(retornaBairro => {
            retornaBairro.data.error ? setBairros([]) :
            setBairros(retornaBairro.data);
        })
    },[escolhaCidades])

    const [form, setForm] = useState({
        nome : '',
        whatsapp : '',
        cpf : '',
        tipo_entrega : 3,
        cep : '',
        cidade : '',
        id_bairro : '',
        rua : '',
        numero : '',
        complemento : '',
        ponto_referencia: ''
    });

    console.log(form)

    function consultaCEP(e) {
        const options = {
            method: 'GET',
            mode: 'cors',
            cache: 'default',
        }
        if (form.tipo_entrega  === 2 ) {
            fetch(`https://viacep.com.br/ws/${form.cep}/json/`, options).then(
                retorno => {
                    retorno.json().then(
                        data => {
                            if(data.erro){
                                setForm({...form, cidade: '', bairro: '', rua: ''})
                                setAlertCEP(true);
                                setTimeout(()=> {setAlertCEP(false)} , 3000);
        
                            }else{
                                console.log(data)
                                setForm({...form, cidade: data.localidade, id_bairro: data.bairro, rua: data.logradouro})
                            }
                        }
                    )    
                }
                
            )
        }
    }
        
    function mudarEntrega(e) {
        setForm({...form, tipo_entrega : Number(e.target.value)});
    }

    function formChange(e){
        setForm({...form, [e.target.name]: e.target.value});
    }

    function enviarForm(e) {
        e.preventDefault();
        if (form.nome && form.whatsapp && form.tipo_entrega === 3) {
            axios.get(`ControllerCliente.php?cadastrar_api&nome=${form.nome}&cnpj_cpf=${form.cpf}&whatsapp=${form.whatsapp}&cep=${form.cep}&id_bairro=${form.id_bairro}&rua=${form.rua}&numero=${form.numero}&complemento=${form.complemento}&ponto_referencia=${form.ponto_referencia}&tipo_entrega=${form.tipo_entrega}`)
            .then(retornandoT => {
                if (retornandoT.data.error) {
                    setAlertGeral({...alertGeral, danger : true});
                    setTimeout(()=>{setAlertGeral({...alertGeral, danger : false});}, 2500)
                }else{
                    setAlertGeral({...alertGeral, success : true});
                    setTimeout(()=>{setAlertGeral({...alertGeral, success : false});}, 2500)
                    setForm({...form,
                        nome : '',
                        whatsapp : '',
                        cpf : '',
                        tipo_entrega : 3,
                        cep : '',
                        cidade : '',
                        id_bairro : '',
                        rua : '',
                        numero : '',
                        complemento : '',
                        ponto_referencia: ''
                        })
                }
                console.log(retornandoT.data)
            })
        }
        else if(form.nome && form.whatsapp && form.cep && form.tipo_entrega === 2){
            axios.get(`ControllerCliente.php?cadastrar_api&nome=${form.nome}&cnpj_cpf=${form.cpf}&whatsapp=${form.whatsapp}&cep=${form.cep}&id_bairro=${form.id_bairro}&rua=${form.rua}&numero=${form.numero}&complemento=${form.complemento}&ponto_referencia=${form.ponto_referencia}&tipo_entrega=${form.tipo_entrega}`)
            .then(retornandoT => {
                if (retornandoT.data.error) {
                    setAlertGeral({...alertGeral, danger : true});
                    setTimeout(()=>{setAlertGeral({...alertGeral, danger : false});}, 2500)
                    setForm({...form,
                        nome : '',
                        whatsapp : '',
                        cpf : '',
                        tipo_entrega : 3,
                        cep : '',
                        cidade : '',
                        id_bairro : '',
                        rua : '',
                        numero : '',
                        complemento : '',
                        ponto_referencia: ''
                        })
                }else{
                    setAlertGeral({...alertGeral, success : true});
                    setTimeout(()=>{setAlertGeral({...alertGeral, success : false});}, 2500)
                    setForm({...form,
                        nome : '',
                        whatsapp : '',
                        cpf : '',
                        tipo_entrega : 3,
                        cep : '',
                        cidade : '',
                        id_bairro : '',
                        rua : '',
                        numero : '',
                        complemento : '',
                        ponto_referencia: ''
                        })
                }
                console.log(retornandoT.data)
            })
        }

        else if(form.id_bairro && form.rua && form.numero && form.nome && form.whatsapp && form.tipo_entrega === 1){
            axios.get(`ControllerCliente.php?cadastrar_api&nome=${form.nome}&cnpj_cpf=${form.cpf}&whatsapp=${form.whatsapp}&cep=${form.cep}&id_bairro=${form.id_bairro}&rua=${form.rua}&numero=${form.numero}&complemento=${form.complemento}&ponto_referencia=${form.ponto_referencia}&tipo_entrega=${form.tipo_entrega}`)
            .then(retornandoT => {
                if (retornandoT.data.error) {
                    setAlertGeral({...alertGeral, danger : true});
                    setTimeout(()=>{setAlertGeral({...alertGeral, danger : false});}, 2500)
                }else{
                    setAlertGeral({...alertGeral, success : true});
                    setTimeout(()=>{setAlertGeral({...alertGeral, success : false});}, 2500)
                    setForm({...form,
                    nome : '',
                    whatsapp : '',
                    cpf : '',
                    tipo_entrega : 3,
                    cep : '',
                    cidade : '',
                    id_bairro : '',
                    rua : '',
                    numero : '',
                    complemento : '',
                    ponto_referencia: ''
                    })
                }
                console.log(retornandoT.data)
            })
        }
        else{
            setAlertGeral({...alertGeral, warning : true});
            setTimeout(()=>{setAlertGeral({...alertGeral, warning : false});}, 2500)
        }
    }

    function mascaraCEP(e){
        var cep = e.target;
        if(cep.value.length===5)
            cep.value=cep.value+"-";			
    }
    return(
        <div>
        <form>
            
                <div className="input-formula mt-3">
                    <input onChange={formChange} value={form.nome} type="text" name="nome" id="nome" className="input-float" placeholder="A" />
                    <label for="nome" id="label" className="label-float">
                        Nome
                    </label>
                </div>
            {/* <!-- CEP E ESTADO --> */}
                <div className="row">
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label for="whatsapp" className="mask-label">
                                Whatsapp
                            </label>
                            <InputMask mask="(99) 99999-9999" placeholder="(xx) xxxxx-xxxx" onChange={formChange} name="whatsapp" value={form.whatsapp} className="form-control mask-input">
                            </InputMask>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="input-formula">
                            <input onChange={formChange} maxlength="18" value={form.cpf} type="text" name="cpf" id="cpf" className="input-float" placeholder="A" />
                            <label for="cpf" id="label" className="label-float">
                                CPF/CNPJ
                            </label>
                        </div>
                    </div>
                </div>

                <hr />

                <div className="form-inline">
                        <label for="tipo_entrega">
                            <h6 className="text-purple text-uppercase">  Tipo de Entrega :  </h6> &nbsp; &nbsp;
                        </label>
                        <select id="tipo_entrega" onChange={mudarEntrega} value={form.tipo_entrega} className="custom-select custom-select-sm mb-2">
                            <option value='1'>Delivery</option>
                            <option value='2'>Correios</option>
                            <option value='3'>Sem entrega</option>
                        </select>
                </div>        
            {form.tipo_entrega === 3 ? ("") : 
                <div>
                    {/* <!-- CEP E ESTADO --> */}
                    <div className="row">
                            <div className="col-lg-4">
                                <div className="input-formula">
                                    <input onChange={formChange} onKeyUp={mascaraCEP} onBlur={consultaCEP} value={form.cep} maxLength="9" type="text" name="cep" id="cep" className="input-float" placeholder="A" />
                                    <label for="cep" id="label" className="label-float">
                                        CEP
                                    </label>
                                </div>
                                <Alert color="warning" className="text-center mb-0 mt-3" isOpen={alertCEP} fade={false}>
                                    <i className="fas fa-exclamation-triangle"></i> CEP INVÁLIDO!
                                </Alert>
                            </div>
                            <div className="col-lg-8">
                                <div className="input-formula">
                                    {form.tipo_entrega === 1 &&
                                        <select className="input-float" onChange={mudarCidade}>
                                            {cidades.map(item => 
                                                <option key={item.id_cidade} value={item.id_cidade}> {item.nome} </option>
                                            )}
                                        </select>                            
                                    }
                                    {form.tipo_entrega === 2 &&
                                        <input onChange={formChange} value={form.cidade} type="text" name="cidade" id="cidade" className="input-float" placeholder="A" />
                                    }
                                    <label for="cidade" id="label" className="label-float">
                                        Cidade
                                    </label>
                                </div>
                            </div>
                        </div>
                        {/* <!-- FIM CEP E ESTADO --> */}
                        {/* <!-- CIDADE E BAIRRO --> */}
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="input-formula">
                                {form.tipo_entrega === 1 &&
                                    <select className="input-float" onChange={formChange} name="id_bairro" >
                                    {bairros.length === 0 ? <option value="0"> Selecione a cidade </option> : 
                                        bairros.map(item => 
                                            <option key={item.id_bairro_delivery} value={item.id_bairro_delivery}> {item.nome_bairro} </option>
                                        )
                                    }
                                    </select>                            
                                }
                                {form.tipo_entrega === 2 &&
                                    <input onChange={formChange} value={form.id_bairro} type="text" name="bairro" id="bairro" className="input-float" placeholder="A" />
                                }
                                    <label for="bairro" id="label" className="label-float">
                                        Bairro
                                    </label>
                                </div>
                            </div>
                        </div>                
                        <div className="row">
                            <div className="col-lg-10">
                                <div className="input-formula">
                                    <input onChange={formChange} value={form.rua} type="text" name="rua" id="rua" className="input-float"
                                        placeholder="A" />
                                    <label for="rua" id="label" className="label-float">
                                        Rua
                                    </label>
                                </div>
                            </div>
                            <div className="col-lg-2">
                                <div className="input-formula">
                                    <input onChange={formChange} value={form.numero} type="text" name="numero" id="numero" className="input-float" placeholder="A" />
                                    <label for="numero" id="label" className="label-float">
                                        Número
                                    </label>
                                </div>
                            </div>
                        </div>

                    {/* <!-- COMPLEMENToO E PONTO  --> */}
                    <div className="row">
                            <div className="col-lg-4">
                                <div className="input-formula">
                                    <input onChange={formChange} value={form.complemento} type="text" name="complemento" id="complemento" className="input-float" placeholder="A" />
                                    <label for="complemento" id="label" className="label-float">
                                        Complemento
                                    </label>
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <div className="input-formula">
                                    <input onChange={formChange} value={form.ponto_referencia} type="text" name="ponto_referencia" id="ponto_referencia" className="input-float" placeholder="A" />
                                    <label for="ponto_referencia" id="label" className="label-float">
                                        Ponto de referência 
                                    </label>
                                </div>
                            </div>
                        </div>
                </div>
            }
            <Alert color="success" className="text-center mb-0 mt-3" isOpen={alertGeral.success} fade={false}>
                <i className="fas fa-check"></i> CLIENTE CADASTRADO!
            </Alert>            
            <Alert color="warning" className="text-center mb-0 mt-3" isOpen={alertGeral.warning} fade={false}>
                <i className="fas fa-exclamation-triangle"></i> PREENCHA TODAS AS INFORMAÇÕES!
            </Alert>
            <Alert color="danger" className="text-center mb-0 mt-3" isOpen={alertGeral.danger} fade={false}>
                <i className="fas fa-times"></i> ERRO AO CADASTRAR CLIENTE!
            </Alert>                         
            <button onClick={enviarForm} className="btn btn-success mt-3 float-right"> <i className="fas fa-plus"></i>  Adicionar cliente</button>

            </form>
        </div>
    );
}