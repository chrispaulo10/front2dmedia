import React,  {useState} from 'react';
import logo from '../../img/LogoVBranco.png';
import './login.css';
import { Link, useHistory } from 'react-router-dom';
import axios from '../../server/axios';


export default function Login (){

    const history = useHistory();

    const [login, setLogin] = useState({
        funcionario_logar: true,
        login: '',
        senha: '',
    })

    function loginChange(e){
        setLogin({...login, [e.target.name]: e.target.value});
    }

    function onSubmit(e){
        e.preventDefault();
            axios.post(`https://jsonplaceholder.typicode.com/posts`, {numero : 1}).then(
                response => {
                console.log(response)
                // localStorage.setItem('name', response.data.name)
            }).catch(error =>{
                console.log(error)
            })
            // history.push('/home')
            // setLogin({
            //     login: '',
            //     senha: ''
            // })
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
                                        <input required onChange={loginChange} value={login.login} type="text" name="login" id="login" className="input-float" placeholder="A" />
                                        <label for="email" id="label" className="label-float">
                                            Login
                                        </label>
                                    </div>
                                    <div className="input-formula mb-1">
                                        <input required onChange={loginChange} value={login.senha} type={type.type} name="senha" id="senha" className="input-float" placeholder="A" />
                                        <label for="senha" id="label" className="label-float">
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