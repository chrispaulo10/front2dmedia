import React from 'react';

export default function SearchClient(){
    return(
        <div>
        <form>
        <div className="row mb-3">
            <div className="col">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Nome do cliente" />
                    <div class="input-group-append">
                        <button class="btn btn-purple" type="button"><i className="fas fa-search"></i> </button>
                    </div>
                </div>                    
            </div>
            <div className="col">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Telefone do cliente" />
                    <div class="input-group-append">
                        <button class="btn btn-purple" type="button"><i className="fas fa-search"></i></button>
                    </div>
                </div>                    
            </div>
        </div>
        </form>
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
                    <tr>
                    <th>1</th>
                    <td>Christian Paulo</td>
                    <td>85988759706</td>
                    <td>Rua Coronel Antônio Botelho de Sousa</td>
                    <td><button className="btn btn-info btn-sm"> <i className="fas fa-check"></i> </button></td>
                    </tr>
                    <tr>
                    <th>2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    <td><button className="btn btn-info btn-sm"> <i className="fas fa-check"></i> </button></td>
                    </tr>
                    <tr>
                    <th>3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                    <td><button className="btn btn-info btn-sm"> <i className="fas fa-check"></i> </button></td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>
    );
}