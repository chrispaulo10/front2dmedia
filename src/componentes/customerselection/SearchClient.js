import React,{useState} from 'react';
import axios from '../../server/axios';
import {useDispatch} from 'react-redux';
import FinishRequestPending from '../requestsPending/FinishRequestPending';
import { showModal2 } from '../../store/modal2';

export default function SearchClient({valores}){

    const [all,setAll] = useState([])

    const [all2,setAll2] = useState([])

    const [pesquisa, setPesquisa] = useState({
        nome_cliente : '',
        telefone_cliente: '',
    });

    const [dados,setDados] = useState({
        id: '',
        nome : '',
        telefone  : '',
    });

    const pesquisando = event =>{
        setPesquisa({...pesquisa, [event.target.name] : event.target.value});
        axios.get(`ControllerCliente.php?consultar_nome&nome=${pesquisa.nome_cliente}`)
        .then(
            retornando => {
                retornando.data.error ? setAll([]) : 
                setAll(retornando.data);
            }
        )
    }

    const pesquisandoWpp = event =>{
        setPesquisa({...pesquisa, telefone_cliente : event.target.value});
        axios.get(`ControllerCliente.php?consultar_whatsapp&whatsapp=${pesquisa.telefone_cliente}`)
        .then(
            retornando => {
                retornando.data.error ? setAll2([]) : 
                setAll2(retornando.data);
            }
        )
    }


    const dispatch = useDispatch()

    const escolherCliente = (id,nome,numero) => {
        setDados({...dados, id:id,nome:nome,telefone:numero});
        dispatch(showModal2());
    }
    
    return(
        <div>
        {dados.id !== '' && <FinishRequestPending dados={dados} valor={valores} />}
        <form>
        <div className="row mb-3">
            <div className="col">
                <div className="input-group mb-3">
                    <input type="text" className="form-control" name="nome_cliente"
                    value={pesquisa.nome_cliente} onChange={pesquisando}
                    placeholder="Nome do cliente" />
                    <div className="input-group-append">
                        <button className="btn btn-purple" type="button"><i className="fas fa-search"></i> </button>
                    </div>
                </div>                    
            </div>
            <div className="col">
                <div className="input-group mb-3">
                    <input type="text" className="form-control" value={pesquisa.telefone_cliente} onChange={pesquisandoWpp} placeholder="Telefone do cliente" />
                    <div className="input-group-append">
                        <button className="btn btn-purple" type="button"><i className="fas fa-search"></i></button>
                    </div>
                </div>                    
            </div>
        </div>
        </form>

        {pesquisa.nome_cliente.length === 0 ? ("") : (
        <div> 
        <h6>Resultados da pesquisa do Nome</h6>
            <div className="table-responsive">
                <table className="table table-striped  text-center">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Número</th>
                    <th>Rua</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    {all.map((item,index) => (
                        <tr key={index}>
                            <td> {item.id_cliente} </td>
                            <td> {item.nome} </td>
                            <td> {item.fone} </td>
                            <td> {item.rua} </td>
                            <td>
                                <button className="btn btn-info btn-sm"
                                onClick={()=>escolherCliente(item.id_cliente,item.nome,item.fone)}>
                                <i className="fas fa-user-check"></i> </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>        
        )}

{pesquisa.telefone_cliente.length === 0 ? ("") : (
        <div> 
        <h6>Resultados da pesquisa de Telefone</h6>
            <div className="table-responsive">
                <table className="table table-striped  text-center">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Número</th>
                    <th>Rua</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    {all2.map((item,index) => (
                        <tr key={index}>
                            <td> {item.id_cliente} </td>
                            <td> {item.nome} </td>
                            <td> {item.fone} </td>
                            <td> {item.rua} </td>
                            <td>
                                <button className="btn btn-info btn-sm"
                                onClick={()=>escolherCliente(item.id_cliente,item.nome,item.fone)}>
                                <i className="fas fa-user-check"></i> </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>        
        )}

        

        </div>
    );
}