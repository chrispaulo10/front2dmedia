import React from 'react';
import Headers from '../../componentes/header';
import { Container } from 'reactstrap';
import RequestApproved from '../../componentes/requestsApproved/index';

export default function Pending(){
    return(
        <div>
            <Headers />
            <Container>
                {/* <FiltersPending /> */}
                <RequestApproved />
            </Container>
        </div>
    );
}