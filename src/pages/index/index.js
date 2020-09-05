import React from 'react';
import Headers from '../../componentes/header';
import Menu from '../../componentes/main/Menu';
import YourOrder from '../../componentes/main/YourOrder';
import { Container, Row, Col } from 'reactstrap';

function Index() {

  return (
    <div>
    <Headers/>
    <Container>
      <Menu />
    </Container>
    {/* <a href="# " className="back-to-top"><i class="fas fa-chevron-up"></i></a> */}
    </div>
  );
}

export default Index;
