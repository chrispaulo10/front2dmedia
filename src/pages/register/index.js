import React, {useState} from 'react';
import logo from '../../img/LogoHBranco.png';
import { Link } from 'react-router-dom';
import '../login/login.css';
import axios from '../../server/axios';

export default function Register(){
    
    const [form, setForm] = useState({
        name : '',
        email: '',
        password: '',
        _token: 'eNksC49OqirXC49CbacIIPXwPLo5oBcOWTdpyUHI',
    });

    function formChange(e){
        setForm({...form, [e.target.name]: e.target.value});
    }
    console.log(form)

    function onSubmit(e){
        e.preventDefault();
        axios.post('/user/store', form).then(
            response => {
            console.log(response)
        })
        setForm({
            name : '',
            _token: 'eNksC49OqirXC49CbacIIPXwPLo5oBcOWTdpyUHI',
            email: '',
            password: '',
        })
    }
    
    return(
<div>
<div className="container-fluid register">
                <div className="row">
                    <div className="col-md-3 register-left">
                        <img src={logo} alt=""/>
                        <h3>Bem Vindo !</h3>
                        <p className="text-justify">Acompanhe seu pedido entrando com email e senha! <br /> Em caso de dúvida contate a empresa! </p>
                    </div>
                    <div className="col-md-9 register-right">
                        <ul className="nav nav-tabs nav-justified" id="myTab" role="tablist">
                            <li className="nav-item">
                                <Link to="/login" className="nav-link" data-toggle="tab" role="tab" aria-controls="home" aria-selected="true">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/register" className="nav-link active"  data-toggle="tab"  role="tab" aria-controls="profile" aria-selected="false">Cadastro</Link>
                            </li>
                        </ul>
                            <h3 className="register-heading">Adicionar novo cliente</h3>
                            <div className="register-form">
<form>
<div id="data">
<h5> <i className="fas fa-user"></i> &nbsp; Dados pessoais </h5>
{/* NOME E NÚMERO  */}
<div className="row">
    <div className="col-lg-6">
        <div className="input-formula">
            <input onChange={formChange} value={form.name} required type="text" name="name" id="name" className="input-float" placeholder="A" />
            <label for="name" id="label" className="label-float">
                Name
            </label>
        </div>
    </div>
    <div className="col-lg-6">
        <div className="input-formula">
            <input value={form.phone} required type="text" name="phone" id="phone" className="input-float" placeholder="A" />
            <label for="phone" id="label" className="label-float">
                Whatsapp
            </label>
        </div>
    </div>
</div>
{/* EMAIL E SENHA */}
<div className="row">
    <div className="col-lg-6">
        <div className="input-formula">
            <input onChange={formChange} value={form.email} required type="text" name="email" id="email" className="input-float" placeholder="A" />
            <label for="email" id="label" className="label-float">
                Email
            </label>
        </div>
    </div>
    <div className="col-lg-6">
        <div className="input-formula">
            <input onChange={formChange} value={form.password} required type="text" name="password" id="password" className="input-float" placeholder="A" />
            <label for="password" id="label" className="label-float">
                Senha
            </label>
        </div>
    </div>
</div>
</div>
    <center>
    <div className="col-lg-5">
    <button className="glossy_button mb-3" onClick={onSubmit}>Cadastrar</button>
    <br />
    <Link className="link-back" to="/"> Voltar </Link>
    </div>
    </center>
</form>
                            </div>
                            </div>
                    </div>
                </div>
            </div>
    );
}