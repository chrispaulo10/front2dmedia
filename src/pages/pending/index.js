import React from 'react';
import Headers from '../../componentes/header';
import { Container } from 'reactstrap';
import RequestPending from '../../componentes/requestsPending/RequestPending';

export default function Pending(){
    return(
        <div>
            <Headers />
            <Container>
                {/* <FiltersPending /> */}
                <RequestPending />
            </Container>
        </div>
    );
}