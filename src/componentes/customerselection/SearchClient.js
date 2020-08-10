import React,{useState} from 'react';
import axios from '../../server/axios';

export default function SearchClient(){

    const [all,setAll] = useState([])

    const [pesquisa, setPesquisa] = useState({
        nome_cliente : '',
        telefone_cliente: '',
    });

    const pesquisando = event =>{
        setPesquisa({...pesquisa, [event.target.name] : event.target.value});
        axios.get(`ControllerCliente.php?consultar_nome&nome=${pesquisa.nome_cliente}`)
        .then(
            retornando => {
                setAll(retornando.data);
            }
        )
    }

    return(
        <div>
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
                    <input type="text" className="form-control" placeholder="Telefone do cliente" />
                    <div className="input-group-append">
                        <button className="btn btn-purple" type="button"><i className="fas fa-search"></i></button>
                    </div>
                </div>                    
            </div>
        </div>
        </form>
        {all.length === 0 ? ("") : (
        <div> 
        <h6>Resultados da pesquisa</h6>
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
                            <td> {item.cnpj_cpf} </td>
                            <td>
                                <button id={item.id_cliente} className="btn btn-info btn-sm"> <i className="fas fa-check"></i> </button>
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