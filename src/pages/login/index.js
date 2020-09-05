import React,  {useState} from 'react';
import logo from '../../img/LogoVBranco.png';
import './login.css';
import { Link, useHistory } from 'react-router-dom';
import axios from '../../server/axios';


export default function Login (){

    const history = useHistory();

    const [login, setLogin] = useState({
        email: '',
        password: '',
    })

    function loginChange(e){
        setLogin({...login, [e.target.name]: e.target.value});
    }

    function onSubmit(e){
        e.preventDefault();
        try {
            axios.post('/user/login', login).then(
                response => {
                console.log(response)
                localStorage.setItem('name', response.data.name)
            })
            history.push('/home')
            setLogin({
                email: '',
                password: ''
            })
        } catch (error) {
            alert('Erro no login, tente novamente');
        }
    }
    const [type, setType] = useState({
        type: "password",
        label : "Exibir"
    });
    function mudarSenha(e) {
        if (type.type === "password") {
            setType({type: "text", label: "Ocultar" })
        } else {
            setType({type: "password", label: "Exibir" })
        }
    }
console.log(login)
    return(
<div>
<div className="container-fluid register">
                <div className="row">
                    <div className="col-lg-5 col-md-5 col-sm-12 col-12 register-left">
                        <img src={logo} width="140" alt=""/>
                        <h3>Bem-Vindo!</h3>
                        <p>Seja bem-vindo ao sistema premium de atendimento da agência 2D Media! <br />
                        Efetive o login para continuar.</p>
                    </div>
                    <div className="col-lg-7 col-md-7 col-sm-12 col-12 register-right">
                                <h3 className="register-heading">Informe seu Login</h3>
                                <div className="register-form">
                                    <center>
                                    <div className="col-md-7">
                                    <div className="input-formula mb-5">
                                        <input required onChange={loginChange} value={login.email} type="email" name="email" id="email" className="input-float" placeholder="A" />
                                        <label for="email" id="label" className="label-float">
                                            Email
                                        </label>
                                    </div>
                                    <div className="input-formula mb-1">
                                        <input required onChange={loginChange} value={login.password} type={type.type} name="password" id="password" className="input-float" placeholder="A" />
                                        <label for="password" id="label" className="label-float">
                                            Senha
                                        </label>
                                    </div>
                                    <button className="btn btn-link float-right mt-0 text-purple" onClick={mudarSenha} > <small> {type.label} senha </small></button>
                                    <button className="glossy_button mb-3" onClick={onSubmit}>Entrar</button> <br />
                                    </div>
                                    </center>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        
    );
}