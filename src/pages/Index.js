import React from 'react';
import Headers from '../componentes/Header/Headers';
import Menu from '../componentes/Menu';
import YourOrder from '../componentes/YourOrder';
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
