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
      <Row>
        <Col lg="8" md="12" sm="12" xs="12">
          <Menu />
        </Col>
        <Col lg="4">
          <YourOrder />
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default Index;
