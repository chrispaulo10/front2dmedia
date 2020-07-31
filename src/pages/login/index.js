import React,  {useState, useEffect} from 'react';
import logo from '../../img/LogoHBranco.png';
import './login.css';
import { Link } from 'react-router-dom';
import axios from '../../server/axios';

export default function Login (){

    const [token,setToken] = useState();

    useEffect(() => {
        axios.get('').then(
            response => {
            setToken(response.data);
        })
    }, [])
    
    console.log(token)
    const [login, setLogin] = useState({
        email: '',
        password: '',
        _token: token,
    })

    function loginChange(e){
        setLogin({...login, [e.target.name]: e.target.value});
    }

    console.log(login)

    function onSubmit(e){
        e.preventDefault();
        axios.post('/user/login', login).then(
            response => {
            console.log(response)
        })
        setLogin({
            email: '',
            password: ''
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
                                <Link className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/register" className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Cadastro</Link>
                            </li>
                        </ul>
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
                                    <div className="input-formula mb-4">
                                        <input required onChange={loginChange} value={login.password} type="password" name="password" id="password" className="input-float" placeholder="A" />
                                        <label for="password" id="label" className="label-float">
                                            Senha
                                        </label>
                                    </div>
                                    <button className="glossy_button mb-3" onClick={onSubmit}>Entrar</button> <br />
                                    <Link className="link-back" to="/"> Voltar </Link>
                                    </div>
                                    </center>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        
    );
}